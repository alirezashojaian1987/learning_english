import Header from "../Header/Header";
import Container from "../Container/Container";

interface Props{
    children: React.ReactNode;
}

export default function MainLayout({
    children,
}:Props){
    return(
        <>
            <Header/>
            <Container>
                {children}
            </Container>
        </>
    )
}