"use client";

import { useEffect } from "react";
import { authService } from "@/services/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { setLoading, setUser } from "@/store/slices/authSlice";

export default function AuthInitializer(){
    const dispatch=useAppDispatch();
    useEffect(()=>{
        const init=async()=>{
            try{
                const user=await authService.me();
                dispatch(setUser(user));
            }
            catch(error){
                console.log(error);
            }
            finally{
                dispatch(setLoading(false));
            }
        };
        init();
    }, [dispatch]);
    return null;
}