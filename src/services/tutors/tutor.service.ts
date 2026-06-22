import { api } from "../api/api";
import { Tutor } from "@/types/tutor.types";

export const tutorService={
    getTutors:async():Promise<Tutor[]>=>{
        const response=await api.get("/tutors/");
        return response.data;
    },
};