"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "@/store/hooks";
import styles from "./DashboardRedirect.module.scss";

export default function DashboardRedirectPage(){
    const router=useRouter();
    const user=useAppSelector((state)=>state.auth.user);

    useEffect(()=>{
        if(!user) return;
        router.replace(user.is_teacher ? "/dashboard/tutor" : "/dashboard/student");
    },[router,user]);

    return(
        <ProtectedRoute>
            <main className={styles.redirectState}>
                <Loader2 className={styles.spin}/>
                Opening your dashboard...
            </main>
        </ProtectedRoute>
    );
}