import { api } from "../api/api";
import type { Tutor, TutorCertificate, TutorCourse, TutorDashboard, TutorEducation, TutorExperience, TutorProfilePayload } from "@/types/tutor.types";

export const tutorService={
    getTutors:async():Promise<Tutor[]>=>{
        const response=await api.get("/tutors/");
        return response.data;
    },

    getDashboard:async():Promise<TutorDashboard>=>{
        const response=await api.get("/tutors/me/dashboard/");
        return response.data;
    },

    createProfile:async(data:TutorProfilePayload):Promise<Tutor>=>{
        const response=await api.post("/create-tutor-profile/",data);
        return response.data;
    },

    getCourses:async():Promise<TutorCourse[]>=>{
        const response=await api.get("/tutor-courses/");
        return response.data;
    },

    createCourse:async(data:Omit<TutorCourse,"id" | "tutor">):Promise<TutorCourse>=>{
        const response=await api.post("/tutor-courses/",data);
        return response.data;
    },

    updateCourse:async(id:number,data:Partial<TutorCourse>):Promise<TutorCourse>=>{
        const response=await api.patch(`/tutor-courses/${id}/`,data);
        return response.data;
    },

    deleteCourse:async(id:number):Promise<void>=>{
        await api.delete(`/tutor-courses/${id}/`);
    },

    getCertificates:async():Promise<TutorCertificate[]>=>{
        const response=await api.get("/tutor-certificates/");
        return response.data;
    },
    
    getEducations:async():Promise<TutorEducation[]>=>{
        const response=await api.get("/tutor-educations/");
        return response.data;
    },

    getExperiences:async():Promise<TutorExperience[]>=>{
        const response=await api.get("/tutor-experiences/");
        return response.data;
    },
};