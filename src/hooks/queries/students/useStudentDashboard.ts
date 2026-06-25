import { useQuery } from "@tanstack/react-query";
import { studentService } from "@/services/students/student.service";

export const useStudentDashboard=()=>{
    return useQuery({
        queryKey:["student-dashboard"],
        queryFn:studentService.getDashboard,
    });
};