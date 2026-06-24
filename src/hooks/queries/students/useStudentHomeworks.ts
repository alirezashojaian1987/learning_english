import { useQuery } from "@tanstack/react-query";
import { studentService } from "@/services/students/student.service";

export const useStudentHomeworks=()=>{
    return useQuery({
        queryKey:["student-homeworks"],
        queryFn:studentService.getHomeworks,
    });
};