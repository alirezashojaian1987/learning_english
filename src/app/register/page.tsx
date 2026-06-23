"use client";
import Link from "next/link";
import { AxiosError } from "axios";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appToast } from "@/lib/toast";
import { authService } from "@/services/auth/auth.service";
import { RegisterFormData,RegisterPayload,registerSchema } from "@/lib/validations/register.schema";
import styles from "./Register.module.scss";

type ApiErrorData=Record<string,string | string[]> & {
    detail?:string;
    message:string;
};

const getRegisterErrorMessage=(error:unknown)=>{
    if(error instanceof AxiosError){
        const data=error.response?.data as ApiErrorData | undefined;

        if(data?.detail) return data.detail;
        if(data?.message) return data.message;

        if(data){
            const firstError=Object.values(data)[0];
            if(Array.isArray(firstError)) return firstError[0];
            if(typeof firstError==="string") return firstError;
        }
    }

    return "Registeration failed! Please try again.";
};

export default function RegisterPage(){
    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
        watch,
        setValue,
    }=useForm<RegisterFormData>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            confirmPassword:"",
            is_teacher:false,
        },
    });

    const isTeacher=watch("is_teacher");

    const onSubmit=async(data:RegisterFormData)=>{
        const payload:RegisterPayload={
            email:data.email,
            password:data.password,
            first_name:data.first_name,
            last_name:data.last_name,
            is_teacher:data.is_teacher,
        };

        try{
            await authService.register(payload);
            appToast.success("Account created successfully! You can login now.");
        }
        catch(error){
            appToast.error(getRegisterErrorMessage(error));
        }
    };

    return(
        <main className={styles.registerPage}>
            <section className={styles.card}>
                <div className={styles.intro}>
                    <Link href="/" className={styles.logo}>
                        Learn <span>English</span>
                    </Link>
                    <p className={styles.eyebrow}>Create your account</p>
                    <h1>Start your English learning journey today.</h1>
                    <p className={styles.description}>
                        Register as a student to join courses, or as a tutor to build your teaching profile after signup.
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={styles.roleGroup}>
                        <label className={!isTeacher ? styles.activeRole : ""}>
                            <input
                                type="radio"
                                value="student"
                                checked={!isTeacher}
                                onChange={()=>setValue("is_teacher",false,{shouldValidate:true})}
                            />
                            <span>Student</span>
                        </label>

                        <label className={isTeacher ? styles.activeRole : ""}>
                            <input
                                type="radio"
                                value="teacher"
                                checked={isTeacher}
                                onChange={()=>setValue("is_teacher",true,{shouldValidate:true})}
                            />
                            <span>Tutor</span>
                        </label>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="first_name">First name</label>
                            <input
                                id="first_name"
                                type="text"
                                placeholder="Enter your first name"
                                {...register("first_name")}
                            />
                            {errors.first_name && <p>{errors.first_name.message}</p>}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="last_name">Last name</label>
                            <input
                                id="last_name"
                                type="text"
                                placeholder="Enter your last name"
                                {...register("last_name")}
                            />
                            {errors.last_name && <p>{errors.last_name.message}</p>}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your Email: user@example.com"
                            {...register("email")}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password")}
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </button>

                    <p className={styles.loginText}>
                        Already have an account? <Link href="/">Login</Link>
                    </p>
                </form>
            </section>
        </main>
    );
}