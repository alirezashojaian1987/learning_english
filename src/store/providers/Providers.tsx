"use client";

import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";

export default function Providers({
    children,
}:{
    children:React.ReactNode;
}){
    return(
        <ReduxProvider>
            <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
    );
}