"use client";

import { useCourses } from "@/hooks/queries/useCourses";
import Image from "next/image";
import Link from "next/link";
import styles from "./PopularCourses.module.scss";

export default function PopularCourses(){
    const{
        data,
        isLoading,
        error,
    }=useCourses();

    if(isLoading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error occured loading courses</p>;
    }

    const popular_courses=data?.slice(0,4);

    return(
        <section className={styles.popularCourses}>
            <div className={styles.header}>
                <h2>Popular courses</h2>

                <p>
                    Explore our most popular English courses and
                    start improving your skills today.
                </p>
            </div>

            <div className={styles.grid}>
                {popular_courses?.map((course)=>(
                        <Link
                            href={`/courses/${course.id}`}
                            className={styles.card}
                            key={course.id}
                        >
                            {/* <div className={styles.imgWrapper}>
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className={styles.image}
                                />

                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className={styles.image}
                                />
                            </div> */}

                            <div className={styles.coursePlaceholder}>
                                📚
                            </div>

                            <div className={styles.cardContent}>

                                <h3>{course.title}</h3>
                                
                                <span className={styles.language}>
                                    {course.language}
                                </span>

                                <div className={styles.footer}>
                                    <span className={styles.price}>
                                        ${course.price_per_dollar}
                                    </span>

                                    <span className={styles.view}>
                                        View Course →
                                    </span>
                                </div>
                            </div>
                        </Link>
                ))}
            </div>
        </section>
    );
}