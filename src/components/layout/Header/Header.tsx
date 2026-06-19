"use client";

import Link from "next/link";

export default function Header(){
    return(
        <header>
            <nav>
                <Link href="/">
                    <h2>Learn English</h2>
                </Link>

                <Link href="/courses">
                    <span>Courses</span>
                </Link>

                <Link href="/tutors">
                    <span>Tutors</span>
                </Link>

                <button>Login</button>
            </nav>
        </header>
    )
}