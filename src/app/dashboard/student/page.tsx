"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { BookOpen, ClipboardList, CreditCard, FileText, Loader2, LogOut, Settings, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { appToast } from "@/lib/toast";
import { authService } from "@/services/auth/auth.service";
import { studentService } from "@/services/students/student.service";
import { useStudentDashboard } from "@/hooks/queries/students/useStudentDashboard";
import { useStudentEnrollments } from "@/hooks/queries/students/useStudentEnrollments";
import { useStudentHomeworks } from "@/hooks/queries/students/useStudentHomeworks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutUser } from "@/store/slices/authSlice";
import type { StudentProfilePayload } from "@/types/student.types";
import styles from "./StudentDashboard.module.scss";

type ActivePanel="courses" | "payments" | "homeworks";

type ProfileFormValues={
    student_active:boolean;
    student_homework_completed:boolean;
    courses_list:string;
    favourite_tutors:string;
};

// const parseNumberList=(value:string)=>value
//     .split(",")
//     .map((item)=>Number(item.trim()))
//     .filter((item)=>Number.isFinite(item));

const formatDate=(value:string | null)=>{
    if(!value) return "Not reviewed yet";
    return new Intl.DateTimeFormat("en",{dateStyle:"medium"}).format(new Date(value));
};

export default function StudentDashboardPage(){
    const router=useRouter();
    const dispatch=useAppDispatch();
    const queryClient=useQueryClient();
    const user=useAppSelector((state)=>state.auth.user);
    const [activePanel,setActivePanel]=useState<ActivePanel>("courses");
    const [settingsOpen,setSettingsOpen]=useState(false);

    const {data:dashboard,isLoading:dashboardLoading,error:dashboardError}=useStudentDashboard();
    const {data:enrollments,isLoading:enrollmentsLoading,error:enrollmentsError}=useStudentEnrollments();
    const {data:homeworks,isLoading:homeworksLoading,error:homeworksError}=useStudentHomeworks();

    const studentName=useMemo(()=>{
        const fullName=`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();
        return fullName || user?.email || "Student";
    },[user]);

    const form=useForm<ProfileFormValues>({
        values:{
            student_active:dashboard?.student_active ?? true,
            student_homework_completed:dashboard?.student_homework_completed ?? false,
            courses_list:dashboard?.courses_list?.join(", ") ?? "",
            favourite_tutors:dashboard?.favourite_tutors?.join(", ") ?? "",
        },
    });

    const updateProfileMutation=useMutation({
        mutationFn:(payload:StudentProfilePayload)=>studentService.updateProfile(payload),
        onSuccess:()=>{
            appToast.success("Profile updated successfully.");
            queryClient.invalidateQueries({queryKey:["student-dashboard"]});
            setSettingsOpen(false);
        },
        onError:()=>appToast.error("Could not update profile. Please try again."),
    });

    const handleLogout=async()=>{
        try{
            await authService.logout();
            dispatch(logoutUser());
            appToast.success("Logged out successfully.");
            router.push("/");
        }
        catch{
            appToast.error("Logout failed. Please try again.");
        }
    };

    const onUpdateProfile=(data:ProfileFormValues)=>{
        updateProfileMutation.mutate({
            // user:dashboard?.user,
            student_active:data.student_active,
            student_homework_completed:data.student_homework_completed,
            
        });
    };

    const panels=[
        {id:"courses" as const,label:"My courses",icon:BookOpen},
        {id:"payments" as const,label:"Payments",icon:CreditCard},
        {id:"homeworks" as const,label:"Homeworks",icon:ClipboardList},
    ];

    return(
        <MainLayout>
            <main className={styles.dashboardPage}>
                <aside className={styles.sidebar}>
                    <div className={styles.profileTop}>
                        <div className={styles.avatar}><UserRound size={26}/></div>
                        
                        <div>
                            <span>Welcome back</span>
                            <h2>{studentName}</h2>
                        </div>
                    </div>

                    <div className={styles.iconActions}>
                        <button className={styles.settings_btn} type="button" onClick={()=>setSettingsOpen(true)} aria-label="Open profile settings"><Settings size={20}/></button>
                        <button className={styles.logout_btn} type="button" onClick={handleLogout} aria-label="Logout"><LogOut size={20}/></button>
                    </div>

                    <hr/>

                    <nav className={styles.navLinks}>
                        {panels.map(({id,label,icon:Icon})=>(
                            <button key={id} type="button" className={activePanel===id ? styles.activeLink : ""} onClick={()=>setActivePanel(id)}>
                                <Icon size={20}/>
                                {label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <section className={styles.content}>
                    <div className={styles.headerCard}>
                        <div>
                            <span>Student dashboard</span>
                            <h1>{activePanel==="courses" ? "My courses" : activePanel==="payments" ? "Payments & enrollment status" : "Homeworks"}</h1>
                            <p>Manage your courses, enrollment approvals, payment records, and assignments from one place.</p>
                        </div>

                        {/* <div className={styles.statusPill}>
                            .homeworkCard
                            <CheckCircle2 size={18}/>
                            {dashboard ? (dashboard.student_active ? "Active student" : "Inactive student") : "Loading status"}
                        </div> */}
                    </div>

                    {dashboardLoading && <p className={styles.state}><Loader2 className={styles.spin}/> Loading dashboard...</p>}
                    {dashboardError && <p className={styles.error}>Failed to load student dashboard data.</p>}

                    {activePanel==="courses" && (
                        <div className={styles.cardGrid}>
                            {enrollmentsLoading && <p className={styles.state}>Loading enrolled courses...</p>}
                            {enrollmentsError && <p className={styles.error}>Failed to load enrollments.</p>}

                            {!enrollmentsLoading && enrollments?.length===0 && <p className={styles.state}>You do not have any course enrollments yet.</p>}
                            {enrollments?.map((enrollment)=>(
                                <article className={styles.courseCard} key={enrollment.id}>
                                    <span 
                                        className={`${styles.status} ${enrollment.status==="Pending" ? styles.pending : enrollment.status==="Success" ? styles.success : styles.rejected}`}>
                                        {enrollment.status}
                                    </span>

                                    <h2>{enrollment.course.title}</h2>

                                    <p>{enrollment.course.description || enrollment.course.detail}</p>

                                    <div className={styles.meta}><span>{enrollment.course.language}</span><span>{enrollment.course.level}</span></div>
                                </article>
                            ))}
                        </div>
                    )}

                    {activePanel==="payments" && (
                        <div className={styles.tableCard}>
                            {enrollmentsLoading && <p className={styles.state}>Loading payments...</p>}
                            {enrollmentsError && <p className={styles.error}>Failed to load payment details.</p>}
                            {!enrollmentsLoading && enrollments?.length===0 && <p className={styles.state}>No payment or enrollment records are available yet.</p>}

                            {enrollments?.map((enrollment)=>(
                                <div className={styles.paymentRow} key={enrollment.id}>
                                    <div>
                                        <strong>{enrollment.course.title}</strong><span>{enrollment.payment_note || "No payment note"}</span>
                                    </div>

                                    <div>{enrollment.payment_amount} {enrollment.currency}</div>

                                    <span className={styles.status}>{enrollment.status}</span>

                                    <small>Submitted: {formatDate(enrollment.submitted_at)} · Reviewed: {formatDate(enrollment.reviewed_at)}</small>
                                </div>
                            ))}
                        </div>
                    )}

                    {activePanel==="homeworks" && (
                        <div className={styles.cardGrid}>
                            {homeworksLoading && <p className={styles.state}>Loading homeworks...</p>}
                            {homeworksError && <p className={styles.error}>Failed to load homeworks.</p>}
                            {!homeworksLoading && homeworks?.length===0 && <p className={styles.state}>No homework has been assigned yet.</p>}
                            
                            {homeworks?.map((homework)=>(
                                <article className={styles.homeworkCard} key={homework.id}>
                                    <FileText size={24}/>
                                    <h2>{homework.title}</h2>
                                    <p>Due date: {formatDate(homework.due_date)}</p>
                                    {homework.document && <a href={homework.document} target="_blank" rel="noreferrer">Open document</a>}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {settingsOpen && (
                    <div className={styles.modalOverlay}>
                        <form className={styles.settingsModal} onSubmit={form.handleSubmit(onUpdateProfile)}>
                            <button className={styles.closeButton} type="button" onClick={()=>setSettingsOpen(false)} aria-label="Close settings"><X size={20}/></button>

                            <span>Profile settings</span>
                            <h2>Edit student profile</h2>

                            <div className={styles.checkbox_field}>
                                <label htmlFor="student_active">Student is active</label>
                                <input
                                    id="student_active"
                                    type="checkbox" 
                                    {...form.register("student_active")}
                                />
                            </div>

                            <div className={styles.checkbox_field}>
                                <label htmlFor="hw_completed">Homeworks completed</label>
                                <input
                                    id="hw_completed"
                                    type="checkbox" 
                                    {...form.register("student_homework_completed")}
                                />
                            </div>


                            {/* <label>Course ids</label>
                            <input placeholder="1, 2, 3" {...form.register("courses_list")}/>
                            
                            <label>Favourite tutor ids</label>
                            <input placeholder="4, 7" {...form.register("favourite_tutors")}/> */}

                            <button type="submit" disabled={updateProfileMutation.isPending}>{updateProfileMutation.isPending ? "Saving..." : "Save changes"}</button>
                        </form>
                    </div>
                )}
            </main>
        </MainLayout>
    );
}