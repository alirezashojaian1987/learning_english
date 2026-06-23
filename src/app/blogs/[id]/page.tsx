interface Props{
    params:Promise<{id:string;}>;
}

export default async function BlogDetails({params,}:Props){
    const {id}=await params;

    return(
        <div>
            <h1>Blog Details</h1>
            <p>Blog ID:{id}</p>
        </div>
    );
}