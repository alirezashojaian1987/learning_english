"use client";

import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import AuthInitializer from "@/components/auth/AuthInitializer";

export default function Providers({
    children,
}:{
    children:React.ReactNode;
}){
    return(
        <ReduxProvider>
            <AuthInitializer/>
            <QueryProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </QueryProvider>
        </ReduxProvider>
    );
}