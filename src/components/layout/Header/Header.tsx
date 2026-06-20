"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal/LoginModal";

import { useAppSelector } from "@/store/hooks";

import { PiChalkboardTeacherLight } from "react-icons/pi";
import { IoSchoolSharp } from "react-icons/io5";

export default function Header(){
    const [isLoginOpen,setIsLoginOpen]=useState(false);
    const auth=useAppSelector((state)=>state.auth);
    return(
        <header className={styles.header}>
            <div className={styles.left}>
                {
                    auth.isAuthenticated?(
                        <button className={styles.login_btn}>
                            {auth.user?.first_name}
                        </button>
                    ):(
                        <button
                            className={styles.login_btn}
                            onClick={()=>setIsLoginOpen(true)}
                        >
                            Login
                        </button>
                    )
                }
                
                {
                    isLoginOpen && (
                        <LoginModal onClose={()=>setIsLoginOpen(false)}/>
                    )
                }

                <Link href="/tutors" className={styles.tutors_link}>
                    <PiChalkboardTeacherLight className={styles.tutor_icon}/>
                    Tutors
                </Link>

                <Link href="/courses" className={styles.courses_link}>
                    <IoSchoolSharp className={styles.courses_icon}/>
                    Courses
                </Link>

            </div>

            <div className={styles.right}>
                <Link href="/">
                    <h2 className={styles.Main_logo}>Learn <span>English</span></h2>
                </Link>
            </div>
        </header>
    )
}