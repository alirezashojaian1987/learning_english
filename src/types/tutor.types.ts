export interface Tutor {
    id:number;

    user:{
        id:number;
        email:string;
        first_name:string;
        last_name:string;
    };

    profile_picture:string | null;

    country:string;
    bio:string;
    teaching_style:string;
    description:string;

    languages_spoken:Record<string,string>;

    certificates:unknown[];
    educations:unknown[];
    experiences:unknown[];
}