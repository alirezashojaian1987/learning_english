export interface Course {
    id:number;
    courseId:string;
    title:string;
    description:string;
    detail:string;

    price_per_hour:string;
    price_per_dollar:string;
    price_per_toman:string;

    language:string;
    level:string;

    capacity:number;
    active_students:number;

    length:number;
    course_duration:number;

    image:string;
    language_flag:string;

    tutor:{
        id:number;
        user:number;
        profile_picture:string | null;
    };
}