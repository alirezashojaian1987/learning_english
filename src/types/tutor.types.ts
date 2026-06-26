export interface TutorUser{
    id:number;
    email:string;
    first_name:string;
    last_name:string;
}

export interface TutorLanguage {
    language:string;
    level:string;
}

export interface TutorCertificate {
    id?:number;
    title:string;
    issued_by:string;
    issue_date:string;
    certificate_image?:string | null;
    tutor?:number;
}

export interface TutorEducation {
    id?:number;
    degree:string;
    institution_name:string;
    country:string;
    city:string;
    field:string;
    start_date:string;
    end_date:string;
    tutor?:number;
}

export interface TutorExperience {
    id?:number;
    title:string;
    organization:string;
    country:string;
    city:string;
    start_date:string;
    end_date:string;
    description:string;
    tutor?:number;
}

export interface TutorCourse {
    id?:number;
    course_title:string;
    duration_minutes:number;
    course_type:"online" | "offline" | string;
    price_per_hour:string;
    lesson_package:string;
    language:string;
    days_available:string[];
    time_slots:string[];
    start_date:string;
    description:string;
    tutor?:number;
}

export interface Tutor {
    id:number;
    user:TutorUser;
    profile_picture:string | null;
    country:string;
    subjects:string[];
    phone_number:string;
    bio:string;
    teaching_style:string;
    expectation:string;
    description:string;
    intro_video_url:string;
    intro_video_file:string | null;
    languages_spoken:TutorLanguage[];
    certificates:TutorCertificate[];
    educations:TutorEducation[];
    experiences:TutorExperience[];
    courses:TutorCourse[];
    is_approved?:boolean;
}

export interface TutorDashboard {
    tutor:Tutor | null;
    courses:TutorCourse[];
    enrollments:unknown[];
    reviews?:unknown[];
}

export type TutorProfilePayload=Omit<Tutor,"id" | "user" | "is_approved"> & {
    first_name:string;
    last_name:string;
};