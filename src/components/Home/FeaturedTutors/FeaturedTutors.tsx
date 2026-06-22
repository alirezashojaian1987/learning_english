"use client";

import { useTutors } from "@/hooks/queries/useTutors";
import Link from "next/link";
import styles from "./FeaturedTutors.module.scss";

export default function FeaturedTutors() {
    const { data, isLoading, error } = useTutors();

    if (isLoading) return <p>Loading tutors...</p>;
    if (error) return <p>Failed to load tutors</p>;

    const tutors = data?.slice(0,4);

    return (
        <section className={styles.featuredTutors}>
            <div className={styles.header}>
                <h2>Featured Tutors</h2>
                <p>Learn from professional English tutors around the world</p>
            </div>

            <div className={styles.grid}>
                {tutors?.map((tutor) => (
                    <Link
                        href={`/tutors/${tutor.id}`}
                        key={tutor.id}
                        className={styles.card}
                    >
                        {/* <div className={styles.imageWrapper}>
                            {tutor.profile_picture ? (
                                <img
                                    src={tutor.profile_picture}
                                    alt={tutor.user.first_name}
                                />
                            ) : (
                                <div className={styles.placeholder}>
                                    👩‍🏫
                                </div>
                            )}
                        </div> */}

                        <div className={styles.placeholder}>
                            👩‍🏫
                        </div>

                        <div className={styles.content}>
                            <h3>
                                {tutor.user.first_name}{" "}
                                {tutor.user.last_name}
                            </h3>

                            <span className={styles.country}>
                                🌍 {tutor.country}
                            </span>

                            <p className={styles.bio}>
                                {tutor.bio.slice(0, 80)}...
                            </p>

                            <div className={styles.footer}>
                                <span className={styles.cta}>
                                    View Profile →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}