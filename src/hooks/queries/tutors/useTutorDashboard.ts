import { useQuery } from "@tanstack/react-query";
import { tutorService } from "@/services/tutors/tutor.service";

export const useTutorDashboard=()=>useQuery({
    queryKey:["tutor-dashboard"],
    queryFn:tutorService.getDashboard,
    retry:1,
});