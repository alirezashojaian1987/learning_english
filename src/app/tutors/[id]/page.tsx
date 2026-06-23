interface Props{
    params:Promise<{id:string;}>;
}

export default async function TutorDetails({params,}:Props){
    const {id}=await params;

    return(
        <div>
            <h1>Tutor Details</h1>
            <p>Tutor ID:{id}</p>
        </div>
    );
}