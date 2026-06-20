"use client";

import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header(){
    return(
        <header className={styles.header}>
            <nav>
                <div className={styles.right}>
                    <Link href="/">
                        <h2 className={styles.Main_logo}>Learn English</h2>
                    </Link>
                </div>

                <div className={styles.left}>
                    <Link href="/tutors" className={styles.tutors_link}>
                        <span>Tutors</span>
                    </Link>

                    <Link href="/courses" className={styles.courses_link}>
                        <span>Courses</span>
                    </Link>
                </div>

                <button className={styles.login_btn}>Login</button>
            </nav>
        </header>
    )
}