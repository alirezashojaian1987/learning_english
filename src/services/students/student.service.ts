import { api } from "../api/api";
import type { Enrollment, Homework, StudentDashboard, StudentProfilePayload } from "@/types/student.types";

export const studentService={
    getDashboard:async():Promise<StudentDashboard>=>{
        const response=await api.get("/students/me/dashboard/");
        return response.data;
    },

    updateProfile:async(data:StudentProfilePayload):Promise<StudentDashboard>=>{
        const response=await api.patch("/students/me/profile/",data);
        return response.data;
    },

    getEnrollments:async():Promise<Enrollment[]>=>{
        const response=await api.get("/enrollments");
        return response.data;
    },

    getHomeworks:async():Promise<Homework[]>=>{
        const response=await api.get("/homeworks/");
        return response.data;
    },
};