import { useQuery } from "@tanstack/react-query";
import { tutorService } from "@/services/tutors/tutor.service";

export const useTutors=()=>{
    return useQuery({
        queryKey:["tutors"],
        queryFn:tutorService.getTutors,
    });
};