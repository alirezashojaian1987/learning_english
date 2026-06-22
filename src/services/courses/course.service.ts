import { api } from "../api/api";
import { Course } from "@/types/course.types";

export const courseService={
    getCourses:async():Promise<Course[]>=>{
        const response=await api.get("/courses/");
        return response.data;
    },
};