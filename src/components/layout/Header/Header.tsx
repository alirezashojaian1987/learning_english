"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { IoSchoolSharp } from "react-icons/io5";

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.right}>
                <Link href="/">
                    <h2 className={styles.Main_logo}>Learn <span>English</span></h2>
                </Link>
            </div>

            <div className={styles.left}>
                <Link href="/tutors" className={styles.tutors_link}>
                    <PiChalkboardTeacherLight className={styles.tutor_icon}/>
                    Tutors
                </Link>

                <Link href="/courses" className={styles.courses_link}>
                    <IoSchoolSharp className={styles.courses_icon}/>
                    Courses
                </Link>

                <button className={styles.login_btn}>Login</button>
            </div>
        </header>
    )
}