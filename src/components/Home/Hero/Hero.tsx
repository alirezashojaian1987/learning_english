import Link from "next/link";
import styles from "./Hero.module.scss";

export default function Hero(){
    return(
        <section className={styles.hero}>
            <div className={styles.content}>
                <span className={styles.badge}>🌍 Learn English Anywhere</span>
                <h1>
                    Learn English with
                    <span> Expert Tutors</span>
                </h1>

                <p>
                    Join live lessons, improve your speaking,
                    and learn at your own pace with interactive
                    courses designed for every level.
                </p>

                <div className={styles.actions}>
                    <Link href="/courses">Browse Courses</Link>
                    <Link href="/register">Start Learning</Link>
                </div>

                <div className={styles.stats}>
                    <div>
                        <strong>500+</strong>
                        <span>Courses</span>
                    </div>

                    <div>
                        <strong>100+</strong>
                        <span>Tutors</span>
                    </div>

                    <div>
                        <strong>5K+</strong>
                        <span>Students</span>
                    </div>
                </div>
            </div>

            <div className={styles.image}>
                Hero Image
            </div>
        </section>
    );
}