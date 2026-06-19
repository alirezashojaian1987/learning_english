interface Props{
    children:React.ReactNode;
};

export default function Container({
    children,
}:Props){
    return(
        <div
            style={{
                maxWidth:"1200px",
                margin:"0 auto",
                padding:"0 16px",
            }}
        >
            {children}
        </div>
    );
}