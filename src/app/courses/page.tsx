"use client";

import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { useCourses } from "@/hooks/queries/useCourses";
import styles from "./Courses.module.scss";

export default function CoursesPage(){
    const{data:courses,isLoading,error}=useCourses();

    return(
        <MainLayout>
            <main className={styles.coursesPage}>
                <section className={styles.hero}>
                    <span className={styles.badge}>English courses</span>
                    <h1>Choose the right English course for your goals.</h1>
                    <p>
                        Browse live and structured courses from our tutors, compare levels and prices,
                        and pick the course that matches your learning path.
                    </p>
                </section>

                {isLoading && <p className={styles.state}>Loading courses...</p>}
                {error && <p className={styles.error}>Failed to load courses. Please try again later.</p>}

                {!isLoading && !error && courses?.length===0 && (
                    <p className={styles.state}>No courses are available yet.</p>
                )}

                <section className={styles.grid}>
                    {courses?.map((course)=>(
                        <Link href={`/courses/${course.id}`} className={styles.card} key={course.id}>
                            <div className={styles.imageArea}>
                                {course.image ? (
                                    <img src={course.image} alt={course.title}/>
                                ):(
                                    <span>📚</span>
                                )}
                            </div>

                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span>{course.language}</span>
                                    <span>{course.level}</span>
                                </div>

                                <h2>{course.title}</h2>
                                <p>{course.description || course.detail}</p>

                                <div className={styles.footer}>
                                    <strong>${course.price_per_dollar}</strong>
                                    <span>View course →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
        </MainLayout>
    );
}