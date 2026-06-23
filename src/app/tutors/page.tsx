"use client";

import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { useTutors } from "@/hooks/queries/useTutors";
import styles from "./Tutors.module.scss";

const getLanguageList=(languages:Record<string,string>)=>{
    const values=Object.values(languages || {});
    return values.length ? values.join(", ") : "English";
};

export default function TutorsPage(){
    const { data:tutors, isLoading, error }=useTutors();

    return(
        <MainLayout>
            <main className={styles.tutorsPage}>
                <section className={styles.hero}>
                    <span className={styles.badge}>Expert tutors</span>
                    <h1>Find a tutor who matches your learning style.</h1>
                    <p>
                        Explore approved English tutors, learn about their teaching style,
                        and choose the right person to guide your progress.
                    </p>
                </section>

                {isLoading && <p className={styles.state}>Loading tutors...</p>}
                {error && <p className={styles.error}>Failed to load tutors. Please try again later.</p>}

                {!isLoading && !error && tutors?.length===0 && (
                    <p className={styles.state}>No tutors are available yet.</p>
                )}

                <section className={styles.grid}>
                    {tutors?.map((tutor)=>(
                        <Link href={`/tutors/${tutor.id}`} className={styles.card} key={tutor.id}>
                            <div className={styles.avatar}>
                                {tutor.profile_picture ? (
                                    <img
                                        src={tutor.profile_picture}
                                        alt={`${tutor.user.first_name} ${tutor.user.last_name}`}
                                    />
                                ):(
                                    <span>👩‍🏫</span>
                                )}
                            </div>

                            <div className={styles.content}>
                                <span className={styles.country}>🌍 {tutor.country || "Online"}</span>
                                <h2>{tutor.user.first_name} {tutor.user.last_name}</h2>
                                <p>{tutor.bio || tutor.description || "Professional English tutor."}</p>

                                <div className={styles.details}>
                                    <span>{getLanguageList(tutor.languages_spoken)}</span>
                                    <span>{tutor.teaching_style || "Personalized lessons"}</span>
                                </div>

                                <strong>View profile →</strong>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
        </MainLayout>
    );
}