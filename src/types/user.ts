export interface User{
    id:number;
    email:string;
    first_name:string;
    last_name:string;
    is_teacher:boolean;
    profile_pic:string | null;
    has_tutor_profile:boolean;
    tutor_id:number | null;
    tutor_approved:boolean | null;
}