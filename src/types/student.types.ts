import type { Course } from "./course.types";

export interface StudentDashboard{
    id:number;
    user:number;
    courses_list:number[];
    favourite_tutors:number[];
    student_active:boolean;
    student_homework_completed:string;
}

export interface StudentProfilePayload{
    user?:number;
    courses_list?:number[];
    favourite_tutors?:number[];
    student_active?:boolean;
    student_homework_completed?:string;
}

export interface Enrollment{
    id:number;
    course:Course;
    status:string;
    payment_amount:string;
    currency:string;
    payment_note:string;
    payment_proof:string;
    submitted_at:string;
    reviewed_at:string | null;
}

export interface Homework{
    id:number;
    title:string;
    document:string;
    due_date:string;
}