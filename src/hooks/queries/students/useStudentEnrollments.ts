import { useQuery } from "@tanstack/react-query";
import { studentService } from "@/services/students/student.service";

export const useStudentEnrollments=()=>{
    return useQuery({
        queryKey:["student-enrollments"],
        queryFn:studentService.getEnrollments,
    });
};