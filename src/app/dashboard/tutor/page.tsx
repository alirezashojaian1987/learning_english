"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { BookOpen, FileBadge, GraduationCap, LayoutDashboard, Loader2, LogOut, MessageSquare, Plus, Settings, Trash2, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { appToast } from "@/lib/toast";
import { authService } from "@/services/auth/auth.service";
import { tutorService } from "@/services/tutors/tutor.service";
import { useTutorDashboard } from "@/hooks/queries/tutors/useTutorDashboard";
import { useTutorCourses } from "@/hooks/queries/tutors/useTutorCourses";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutUser } from "@/store/slices/authSlice";
import type { TutorCourse, TutorProfilePayload } from "@/types/tutor.types";
import styles from "./TutorDashboard.module.scss";

// import { AxiosError } from "axios";

type ActivePanel="overview" | "courses" | "credentials" | "reviews";
type CourseFormValues=Omit<TutorCourse,"id" | "tutor" | "days_available" | "time_slots"> & {days_available:string; time_slots:string};
type ProfileFormValues={
    phone_number:string;
    country:string;
    subjects:string;
    languages_spoken:string;
    bio:string;
    teaching_style:string;
    expectation:string;
    description:string;
    intro_video_url:string;
};

const emptyCourse:CourseFormValues={course_title:"",
    duration_minutes:60,
    course_type:"online",
    price_per_hour:"10.00",
    lesson_package:"Single lesson",
    language:"English",
    days_available:"Monday",
    time_slots:"10:00 - 11:00",
    start_date:new Date().toISOString().slice(0,10),
    description:""
};

const splitList=(value:string)=>value.split(",").map((item)=>item.trim()).filter(Boolean);

export default function TutorDashboardPage(){
    const router=useRouter();
    const dispatch=useAppDispatch();
    const queryClient=useQueryClient();
    const user=useAppSelector((state)=>state.auth.user);
    const [activePanel,setActivePanel]=useState<ActivePanel>("overview");
    const [profileOpen,setProfileOpen]=useState(false);
    const [courseOpen,setCourseOpen]=useState(false);

    const {data:dashboard,isLoading:dashboardLoading,error:dashboardError}=useTutorDashboard();
    const {data:courses,isLoading:coursesLoading,error:coursesError}=useTutorCourses();
    const tutor=dashboard?.tutor ?? null;
    // const approved=user?.tutor_approved ?? tutor?.is_approved ?? Boolean(tutor && !dashboardError);
    // const waitingForApproval=Boolean(tutor) && !approved;

    const hasTutorProfile = user?.has_tutor_profile ?? false;
    const tutorApproved =user?.tutor_approved ?? false;
    const waitingForApproval=hasTutorProfile && !tutorApproved;

    const tutorName=useMemo(()=>`${user?.first_name ?? tutor?.user.first_name ?? ""} ${user?.last_name ?? tutor?.user.last_name ?? ""}`.trim() || user?.email || "Tutor",[user,tutor]);

    const profileForm=useForm<ProfileFormValues>(
        {values:{
                phone_number:tutor?.phone_number ?? "",
                country:tutor?.country ?? "",
                subjects:tutor?.subjects?.join(", ") ?? "English",languages_spoken:tutor?.languages_spoken?.map((item)=>
                    `${item.language}:${item.level}`).join(", ") ?? "English:Advanced",
                bio:tutor?.bio ?? "",
                teaching_style:tutor?.teaching_style ?? "",
                expectation:tutor?.expectation ?? "",
                description:tutor?.description ?? "",
                intro_video_url:tutor?.intro_video_url ?? ""
            }
        });

    const courseForm=useForm<CourseFormValues>({defaultValues:emptyCourse});

    const createProfileMutation=useMutation({
        mutationFn:(data:ProfileFormValues)=>{
            const payload:TutorProfilePayload={
                first_name:user?.first_name ?? "",
                last_name:user?.last_name ?? "",
                phone_number:data.phone_number,
                country:data.country,
                subjects:splitList(data.subjects),
                languages_spoken:splitList(data.languages_spoken).map((item)=>{
                    const [language,level="Intermediate"]=
                        item.split(":").map((part)=>part.trim()); 

                    return{
                        language,
                        level
                    };
                }),
                // profile_picture:"",
                certificates:[],
                educations:[],
                bio:data.bio,
                teaching_style:data.teaching_style,
                expectation:data.expectation,
                description:data.description,
                experiences:[],
                intro_video_url:data.intro_video_url || undefined,
                // intro_video_file:"",
                courses:[]
            };

            return tutorService.createProfile(payload);
        },

        onSuccess:()=>{
            appToast.success("Tutor profile submitted. Please wait for admin approval.");
            queryClient.invalidateQueries({queryKey:["tutor-dashboard"]}); 
            setProfileOpen(false);
        },

        onError:()=>appToast.error("Could not submit the profile."),
    });

    const createCourseMutation=useMutation({
        mutationFn:(data:CourseFormValues)=>tutorService.createCourse({...data,duration_minutes:Number(data.duration_minutes),days_available:splitList(data.days_available),time_slots:splitList(data.time_slots)}),

        onSuccess:()=>{
            appToast.success("Course created successfully.");
            queryClient.invalidateQueries({queryKey:["tutor-courses"]});
            setCourseOpen(false);
            courseForm.reset(emptyCourse);
        },

        onError:()=>appToast.error("Could not create course."),
    });

    const deleteCourseMutation=useMutation({mutationFn:tutorService.deleteCourse,
        onSuccess:()=>{
            appToast.success("Course deleted.");
            queryClient.invalidateQueries({queryKey:["tutor-courses"]});
        },
        
        onError:()=>appToast.error("Could not delete course.")});

    const handleLogout=async()=>{
        await authService.logout();
        dispatch(logoutUser());
        appToast.success("Logged out successfully.");
        router.push("/");
    };

    const nav=[
        {
            id:"overview" as const,
            label:"Dashboard",
            icon:LayoutDashboard
        },
        
        {
            id:"courses" as const,
            label:"Course management",
            icon:BookOpen
        },
        
        {
            id:"credentials" as const,
            label:"Credentials",
            icon:GraduationCap
        },
        
        {
            id:"reviews" as const,
            label:"Reviews",
            icon:MessageSquare
        },
    ];

    if(dashboardLoading){
        return(
            <MainLayout>
                <main className={styles.dashboardPage}>
                    <p className={styles.state}>
                        <Loader2 className={styles.spin}/> 
                        Checking tutor approval status...
                    </p>
                </main>
            </MainLayout>
        )
    }

    if(!tutor || waitingForApproval){
        return(
            <MainLayout>
                <main className={styles.dashboardPage}>
                    <section className={styles.approvalCard}>
                        <span className={`${styles.status} ${waitingForApproval ? styles.pending : ""}`}>
                            {waitingForApproval ? "Waiting for admin approval" : "Tutor profile required"}
                        </span>
                        
                        <h1>
                            {waitingForApproval ? "Your tutor dashboard is locked for now." : "Complete your tutor profile."}
                        </h1>

                        <p>
                            {waitingForApproval ? "Your profile was submitted successfully. The admin must approve your tutor account before dashboard options become available."
                            :
                            "New tutor accounts must submit the required profile details first. After submission, the admin can approve your account in the Django admin panel."}
                        </p>
                        
                        {!waitingForApproval && 
                            <button
                                className={styles.textButton}
                                type="button"
                                onClick={()=>setProfileOpen(true)}
                            >
                               Create tutor profile
                            </button>
                        }
                        
                        <button
                            className={styles.dangerButton}
                            type="button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </section>
                    
                    {profileOpen && 
                        <ProfileModal
                            form={profileForm}
                            onClose={()=>setProfileOpen(false)}
                            onSubmit={createProfileMutation.mutate}
                            pending={createProfileMutation.isPending}
                        />
                    }
                </main>
            </MainLayout>
        )
    }

    return <MainLayout>
            <main className={styles.dashboardPage}>
                <aside className={styles.sidebar}>
                    <div className={styles.profileTop}>
                        <div className={styles.avatar}>
                            <UserRound size={26}/>
                        </div>

                        <div>
                            <span>Welcome back</span>
                            <h2>{tutorName}</h2>
                        </div>
                    </div>

                    <div className={styles.iconActions}>
                        <button className={styles.settings_btn} type="button" onClick={()=>setProfileOpen(true)}>
                            <Settings size={20}/>
                        </button>
                        
                        <button className={styles.logout_btn} type="button" onClick={handleLogout}>
                            <LogOut size={20}/>
                        </button>
                    </div>
                    
                    <hr/>
                    
                    <nav className={styles.navLinks}>
                        {nav.map(({id,label,icon:Icon})=>
                            <button key={id} type="button" className={activePanel===id ? styles.activeLink : ""} onClick={()=>setActivePanel(id)}>
                                <Icon size={20}/>{label}
                            </button>
                        )}
                        </nav>
                </aside>
                
                <section className={styles.content}>
                    <div className={styles.headerCard}>
                        <div>
                            <span>Tutor dashboard</span>
                            <h1>{nav.find((item)=>item.id===activePanel)?.label}</h1>
                            <p>Manage profile approval details, courses, credentials, student activity, and reviews from one tutor workspace.</p>
                        </div>
                        
                        <span className={styles.status}>Approved</span>
                    </div>
                    
                    {dashboardError && 
                        <p className={styles.error}> Failed to load tutor dashboard.</p>
                    }
                    
                    {activePanel==="overview" && <>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <span>Students</span>
                                <strong>
                                    {dashboard?.enrollments?.length ?? 0}
                                </strong>
                            </div>
                            
                            <div className={styles.statCard}>
                                <span>Satisfaction</span>
                                <strong>100%</strong>
                            </div>
                            
                            <div className={styles.statCard}>
                                <span>Active courses</span>
                                <strong>{courses?.length ?? dashboard?.courses?.length ?? 0}</strong>
                            </div>
                            
                            <div className={styles.statCard}>
                                <span>Reviews</span>
                                <strong>{dashboard?.reviews?.length ?? 0}</strong>
                            </div>
                        </div>

                        <article className={styles.courseCard}>
                            <h2>{tutor.bio || "Add your teaching bio"}</h2>
                            <p>{tutor.description || "Use profile settings to complete your public tutor description."}</p>

                            <div className={styles.meta}>
                                {tutor.subjects?.map((subject)=>
                                    <span key={subject}>{subject}</span>
                                )}
                            </div>
                        </article>
                    </>
                    }
                    
                    {activePanel==="courses" && 
                        <div className={styles.tableCard}>
                            <button className={styles.textButton} type="button" onClick={()=>setCourseOpen(true)}>
                                <Plus size={16}/> Add course
                            </button>

                            {coursesLoading && 
                                <p className={styles.state}>Loading courses...</p>
                            }
                            
                            {coursesError && 
                                <p className={styles.error}>Failed to load courses.</p>
                            }
                            
                            {courses?.map((course)=>
                                <div className={styles.paymentRow} key={course.id}>
                                    <div>
                                        <strong>{course.course_title}</strong>
                                        <span>{course.description}</span>
                                    </div>
                                    
                                    <div>{course.price_per_hour}/hour</div>
                                    
                                    <span className={styles.status}>{course.course_type}</span>
                                    
                                    <button
                                        className={styles.dangerButton}
                                        type="button"
                                        onClick={()=>course.id && deleteCourseMutation.mutate(course.id)}
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            )}
                        </div>
                    }
                    
                    {activePanel==="credentials" && 
                        <div className={styles.cardGrid}>
                            <CredentialCard title="Certificates" items={tutor.certificates?.map((item)=>`${item.title} · ${item.issued_by}`)}/>
                            <CredentialCard title="Educations" items={tutor.educations?.map((item)=>`${item.degree} · ${item.institution_name}`)}/>
                            <CredentialCard title="Experiences" items={tutor.experiences?.map((item)=>`${item.title} · ${item.organization || item.city}`)}/>
                        </div>
                    }
                    
                    {activePanel==="reviews" && 
                        <div className={styles.tableCard}>
                            <p className={styles.state}>Review management will list student feedback here when the backend returns reviews.</p>
                        </div>
                    }
                    
                </section>
                
                {profileOpen && 
                    <ProfileModal 
                        form={profileForm}
                        onClose={()=>setProfileOpen(false)}
                        onSubmit={createProfileMutation.mutate}
                        pending={createProfileMutation.isPending}
                    />    
                } 
                
                {courseOpen && 
                    <CourseModal
                        form={courseForm}
                        onClose={()=>setCourseOpen(false)}
                        onSubmit={createCourseMutation.mutate}
                        pending={createCourseMutation.isPending}
                    />
                }
            </main>
        </MainLayout>;
}

function CredentialCard({title,items}:{title:string;items?:string[]}){
    return(
        <article className={styles.homeworkCard}>
            <FileBadge size={24}/>
            <h2>{title}</h2>
            
            {items?.length ? items.map((item)=>
                <p key={item}>{item}</p>
                ) : <p>No {title.toLowerCase()} added yet.</p>
            }
        </article>)
}

function ProfileModal(
    {form,onClose,onSubmit,pending}:
    {form:ReturnType<typeof useForm<ProfileFormValues>>;onClose:()=>void;onSubmit:(data:ProfileFormValues)=>void;pending:boolean}){
        return(
            <div className={styles.modalOverlay}>
                <form className={styles.settingsModal} 
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <button 
                        className={styles.closeButton}
                        type="button"
                        onClick={onClose}
                    >
                        <X size={20}/>
                    </button>
                    
                    <span>Create profile</span>
                    <h2>Tutor essential info</h2>
                    
                    <div className={styles.formGrid}>
                        {["phone_number","country","subjects","languages_spoken","intro_video_url"]
                            .map((name)=>
                            <label key={name}>
                                {name.replaceAll("_"," ")}
                                <input {...form.register(name as keyof ProfileFormValues)}/>
                            </label>)}
                            
                            <label className={styles.fullWidth}>Bio
                                <textarea {...form.register("bio")}/>
                            </label>
                            
                            <label className={styles.fullWidth}>Teaching style
                                <textarea {...form.register("teaching_style")}/>
                            </label>
                            
                            <label className={styles.fullWidth}>
                                Expectation
                                <textarea {...form.register("expectation")}/>
                            </label>
                            
                            <label className={styles.fullWidth}>
                                Description
                                <textarea {...form.register("description")}/>
                            </label>
                        </div>
                        
                        <button type="submit" disabled={pending}>
                            {pending ? "Submitting..." : "Submit for approval"}
                        </button>
                    </form>
                </div>)
}

function CourseModal({form,onClose,onSubmit,pending}:{form:ReturnType<typeof useForm<CourseFormValues>>;onClose:()=>void;onSubmit:(data:CourseFormValues)=>void;pending:boolean}){
    return(
        <div className={styles.modalOverlay}>
            <form className={styles.settingsModal} onSubmit={form.handleSubmit(onSubmit)}>
                <button className={styles.closeButton} type="button" onClick={onClose}>
                    <X size={20}/>
                </button>
                
                <span>Course management</span>
                
                <h2>Create course</h2>
                
                <div className={styles.formGrid}>
                    {Object.keys(emptyCourse).map((name)=> name==="description" ? 
                        <label className={styles.fullWidth} key={name}>
                            Description
                            <textarea {...form.register("description")}/>
                        </label> 
                        : 
                        <label key={name}>
                            {name.replaceAll("_"," ")}
                            <input type={name.includes("date") ? "date" : name==="duration_minutes" ? "number" : "text"} 
                            
                            {...form.register(name as keyof CourseFormValues)}/>
                        </label>
                    )}
                </div>
                
                <button type="submit" disabled={pending}>
                    {pending ? "Creating..." : "Create course"}
                </button>
            </form>
        </div>
    )
}