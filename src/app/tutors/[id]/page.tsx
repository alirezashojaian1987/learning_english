"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { useTutors } from "@/hooks/queries/useTutors";
import styles from "./tutor.module.scss";

export default function TutorDetails() {
  const params = useParams<{ id: string }>();
  const { data: tutors, isLoading, error } = useTutors();
  const tutor = useMemo(
    () => tutors?.find((item) => String(item.id) === String(params.id)),
    [tutors, params.id],
  );
  const fullName =
    `${tutor?.user.first_name ?? ""} ${tutor?.user.last_name ?? ""}`.trim() ||
    "English tutor";
  return (
    <MainLayout>
      <main className={styles.tutorPage}>
        {isLoading && <p className={styles.state}>Loading tutor...</p>}
        {error && <p className={styles.error}>Failed to load tutor.</p>}
        {!isLoading && !error && !tutor && (
          <p className={styles.state}>
            Tutor not found. <Link href="/tutors">Back to tutors</Link>
          </p>
        )}
        {tutor && (
          <>
            <section className={styles.hero}>
              <div className={styles.avatar}>
                {tutor.profile_picture ? (
                  <img src={tutor.profile_picture} alt={fullName} />
                ) : (
                  "👩‍🏫"
                )}
              </div>
              <div>
                <span>{tutor.country || "Online tutor"}</span>
                <h1>{fullName}</h1>
                <p>
                  {tutor.description ||
                    tutor.bio ||
                    "Professional English tutor ready to support your learning goals."}
                </p>
              </div>
            </section>
            <section className={styles.grid}>
              <article>
                <h2>Teaching style</h2>
                <p>
                  {tutor.teaching_style ||
                    "Personalized lessons with clear feedback."}
                </p>
              </article>
              <article>
                <h2>What to expect</h2>
                <p>
                  {tutor.expectation || "Friendly classes focused on progress."}
                </p>
              </article>
              <article>
                <h2>Subjects</h2>
                <p>{tutor.subjects?.join(", ") || "English"}</p>
              </article>
              <article>
                <h2>Languages</h2>
                <p>
                  {tutor.languages_spoken
                    ?.map((lang) => `${lang.language} (${lang.level})`)
                    .join(", ") || "English"}
                </p>
              </article>
            </section>
          </>
        )}
      </main>
    </MainLayout>
  );
}
