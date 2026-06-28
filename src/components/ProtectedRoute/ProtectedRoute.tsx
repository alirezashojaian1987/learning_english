"use client";

import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import styles from "./ProtectedRoute.module.scss";

type Role="student" | "tutor";

const getDashboardPath=(isTeacher?:boolean)=>isTeacher ? "/dashboard/tutor" : "/dashboard/student";

export default function ProtectedRoute({children,allowedRoles}:{children:ReactNode;allowedRoles?:Role[]}){
    const router=useRouter();
    const pathname=usePathname();
    const {user,isAuthenticated,loading}=useAppSelector((state)=>state.auth);
    const userRole:Role=user?.is_teacher ? "tutor" : "student";

    useEffect(()=>{
        if(loading) return;

        if(!isAuthenticated){
            router.replace(`/?login=1&next=${encodeURIComponent(pathname)}`);
            return;
        }

        if(allowedRoles && !allowedRoles.includes(userRole)){
            router.replace(getDashboardPath(user?.is_teacher));
        }
    },[allowedRoles,isAuthenticated,loading,pathname,router,user?.is_teacher,userRole]);

    if(loading || !isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))){
        return <div className={styles.guardState}><Loader2 className={styles.spin}/> Checking access...</div>;
    }

    return <>{children}</>;
}