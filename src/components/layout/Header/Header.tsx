"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal/LoginModal";

import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import {logout} from "@/store/slices/authSlice";
import { authService } from "@/services/auth/auth.service";

import { PiChalkboardTeacherLight } from "react-icons/pi";
import { IoSchoolSharp } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { appToast } from "@/lib/toast";

export default function Header(){
    const [isLoginOpen,setIsLoginOpen]=useState(false);
    const [isDropdown_open,setDropdown_open]=useState(false);

    const auth=useAppSelector((state)=>state.auth);
    const dispatch=useAppDispatch();

    const handleLogout=async () => {
        try{
            await authService.logout();
            dispatch(logout());
            appToast.success("Logged out successfully");

            setDropdown_open(false);
        }
        catch(error){
            console.log(error);
            appToast.error("Logout failed");
        }
    };

    return(
        <header className={styles.header}>
            <div className={styles.left}>
                
                {
                    auth.isAuthenticated?(
                        <div className={styles.userMenu}>
                            <button
                                className={styles.login_btn}
                                onClick={()=>setDropdown_open(!isDropdown_open)}
                            >
                                {auth.user?.first_name}
                            </button>

                            {
                                isDropdown_open && (
                                    <div className={styles.dropdown}>
                                        <Link href="/profile" className={styles.dropdown_item}> <LuSettings2/>Profile</Link>
                                        <button
                                            className={`${styles.dropdown_item} ${styles.logout_btn}`}
                                            onClick={handleLogout}
                                        >
                                            <TbLogout/>
                                            Logout
                                        </button>
                                    </div>
                                )
                            }
                        </div>
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