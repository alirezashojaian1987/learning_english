import { api } from "../api/api";

export const authService={
    register:async (data:unknown)=>{
        const response=await api.post("/register/",data);
        return response.data;
    },

    login:async(data:unknown)=>{
        const response=await api.post("/login/",data);
        return response.data;
    },

    me:async()=>{
        const response=await api.get("/me/");
        return response.data;
    },

    logout:async()=>{
        const response=await api.post("/logout/");
        return response.data;
    },
};