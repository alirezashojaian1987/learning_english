"use client";

import styles from "./LoginModal.module.scss";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema,LoginFormData } from "@/lib/validations/login.schema";
import { authService } from "@/services/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import Link from "next/link";

import { IoClose } from "react-icons/io5";

interface Props{
    onClose:()=>void;
}

export default function LoginModal({
    onClose,
}:Props){
    const dispatch=useAppDispatch();
    const{
        register,handleSubmit,formState:{errors,isSubmitting},
    }=useForm<LoginFormData>({resolver:zodResolver(loginSchema),});

    const onSubmit=async(
        data:LoginFormData
    )=>{
        try{
            await authService.login(data);
            const user=await authService.me();

            dispatch(setUser(user));
            toast.success("Login successful");
            console.log(user);
            onClose();
        }
        catch(error){
            toast.error("Login failed!");
            console.log(error);
        }
    };

    return(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button
                    className={styles.close_btn}
                    onClick={onClose}
                >
                    <IoClose/>
                </button>
                <h2>Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        placeholder="Email:"
                        {...register("email")}
                    />

                    <p className={styles.error}>{errors.email?.message?.toString()}</p>

                    <input
                        type="password"
                        placeholder="Password:"
                        {...register("password")}
                    />

                    <p className={styles.error}>{errors.password?.message?.toString()}</p>

                    <button type="submit" disabled={isSubmitting}>Login</button>
                </form>
                <div className={styles.register_div}>
                    <p>Don't have an account?</p>
                    <Link className={styles.registerLink} href="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}