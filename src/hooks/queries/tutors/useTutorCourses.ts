import { useQuery } from "@tanstack/react-query";
import { tutorService } from "@/services/tutors/tutor.service";

export const useTutorCourses=()=>useQuery({
    queryKey:["tutor-courses"],
    queryFn:tutorService.getCourses,
});