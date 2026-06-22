import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/courses/course.service";

export const useCourses=()=>{
    return useQuery({
        queryKey:["courses"],
        queryFn:courseService.getCourses,
    });
};