"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useAppDispatch,useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import {
    loginSchema,
    LoginFormData,
} from "@/lib/validations/login.schema";

import { authService } from "@/services/auth/auth.service";

export default function LoginPage(){
    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
    }=useForm<LoginFormData>({
        resolver:zodResolver(loginSchema),
    });

    const dispatch=useAppDispatch();
    const auth=useAppSelector((state)=>state.auth);

    const onSubmit=async(data:LoginFormData)=>{
        try{
            await authService.login(data);
            const user=await authService.me();
            dispatch(setUser(user));
            toast.success("ورود موفق");
        }
        catch(error){
            toast.error("خطا در ورود");
            console.log(error);
        }
    };

    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email:" {...register("email")}/>
                <p>{errors.email?.message}</p>

                <input type="text" placeholder="Password:" {...register("password")}/>
                <p>{errors.password?.message}</p>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                >
                    Login
                </button>

                <pre>{JSON.stringify(auth,null,2)}</pre>
            </form>
        </main>
    )
}