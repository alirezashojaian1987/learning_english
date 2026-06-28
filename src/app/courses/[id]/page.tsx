"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, CalendarDays, CheckCircle2, Clock, Loader2, Users } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { appToast } from "@/lib/toast";
import { studentService } from "@/services/students/student.service";
import { useCourses } from "@/hooks/queries/useCourses";
import { useStudentEnrollments } from "@/hooks/queries/students/useStudentEnrollments";
import { useAppSelector } from "@/store/hooks";
import styles from "./course.module.scss";

const normalizeStatus=(status?:string)=>status?.toLowerCase() ?? "";

export default function CourseDetails(){
    const params=useParams<{id:string}>();
    const router=useRouter();
    const queryClient=useQueryClient();
    const auth=useAppSelector((state)=>state.auth);
    const {data:courses,isLoading,error}=useCourses();
    const {data:enrollments}=useStudentEnrollments();
    const [paymentNote,setPaymentNote]=useState("Course enrollment request from website.");

    const course=useMemo(()=>courses?.find((item)=>String(item.id)===String(params.id)),[courses,params.id]);
    const enrollment=useMemo(()=>enrollments?.find((item)=>item.course.id===course?.id),[enrollments,course?.id]);
    const approved=normalizeStatus(enrollment?.status)==="success" || normalizeStatus(enrollment?.status)==="approved";

    const enrollMutation=useMutation({
        mutationFn:()=>studentService.createEnrollment({
            course:Number(course?.id),
            payment_amount:course?.price_per_dollar ?? "0.00",
            currency:"USD",
            payment_note:paymentNote,
            payment_proof:"",
        }),
        onSuccess:()=>{
            appToast.success("Enrollment request submitted. Please wait for admin approval.");
            queryClient.invalidateQueries({queryKey:["student-enrollments"]});
        },
        onError:()=>appToast.error("Could not submit enrollment request. Please try again."),
    });

    const handleEnroll=()=>{
        if(!auth.isAuthenticated){
            appToast.error("Please login as a student before enrolling.");
            return;
        }
        if(auth.user?.is_teacher){
            appToast.error("Tutor accounts cannot enroll in student courses.");
            return;
        }
        enrollMutation.mutate();
    };

    return(
        <MainLayout>
            <main className={styles.detailsPage}>
                <button className={styles.backButton} type="button" onClick={()=>router.back()}><ArrowLeft size={18}/> Back</button>

                {isLoading && <p className={styles.state}><Loader2 className={styles.spin}/> Loading course details...</p>}
                {error && <p className={styles.error}>Failed to load this course.</p>}
                {!isLoading && !error && !course && <p className={styles.state}>Course not found. <Link href="/courses">Browse all courses</Link></p>}

                {course && (
                    <>
                        <section className={styles.hero}>
                            <div className={styles.imageWrap}>{course.image ? <img src={course.image} alt={course.title}/> : <span>📚</span>}</div>
                            <div className={styles.heroContent}>
                                <span className={styles.badge}>{course.language} · Level {course.level}</span>
                                <h1>{course.title}</h1>
                                <p>{course.detail || course.description}</p>
                                {enrollment && <span className={`${styles.status} ${styles[normalizeStatus(enrollment.status)] ?? ""}`}>Enrollment: {enrollment.status}</span>}
                                <div className={styles.actions}>
                                    <button type="button" onClick={handleEnroll} disabled={enrollMutation.isPending || Boolean(enrollment && !approved)}>
                                        {enrollMutation.isPending ? "Submitting..." : enrollment ? (approved ? "Already approved" : "Waiting for admin") : "Enroll in course"}
                                    </button>
                                    <Link href="/dashboard/student">View dashboard</Link>
                                </div>
                                {!enrollment && <textarea value={paymentNote} onChange={(event)=>setPaymentNote(event.target.value)} aria-label="Payment note"/>}
                            </div>
                        </section>

                        <section className={styles.infoGrid}>
                            <article><Users/><strong>{course.active_students}/{course.capacity}</strong><span>Active students</span></article>
                            <article><Clock/><strong>{course.course_duration} min</strong><span>Class duration</span></article>
                            <article><BookOpen/><strong>{course.length} lessons</strong><span>Course length</span></article>
                            <article><CalendarDays/><strong>${course.price_per_dollar}</strong><span>Price</span></article>
                        </section>

                        <section className={styles.detailGrid}>
                            <article><CheckCircle2/><h2>Requirements</h2><p>{course.requirements || "No special requirements were added for this course."}</p></article>
                            <article><BookOpen/><h2>Materials</h2><p>{course.materials || "Tutor will share learning materials after approval."}</p></article>
                        </section>
                    </>
                )}
            </main>
        </MainLayout>
    )
}