interface Props{
    params:Promise<{id:string;}>;
}

export default async function CourseDetails({params,}:Props){
    const {id}=await params;

    return(
        <div>
            <h1>Course Details</h1>
            <p>Course ID:{id}</p>
        </div>
    );
}