"use client";

import { useState } from "react";
import { authService } from "@/services/auth/auth.service";

export default function TestPage(){
    const[data,setData]=useState<any>(null);

    const handleLogin=async()=>{
        try{
            await authService.login({
                email:"alirezashojaian22@gmail.com",
                password:"ash1987",
            });

            const user=await authService.me();
            setData(user);
        }
        catch(error){
            console.log(error);
        }
    };

    return(
        <div>
            <button onClick={handleLogin}>
                Login + Get me
            </button>
            <pre>{JSON.stringify(data,null,2)}</pre>
        </div>
    );
}