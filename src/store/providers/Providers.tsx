"use client";

import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

export default function Providers({
    children,
}:{
    children:React.ReactNode;
}){
    return(
        <ReduxProvider>
            <QueryProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>    
            </QueryProvider>
        </ReduxProvider>
    );
}