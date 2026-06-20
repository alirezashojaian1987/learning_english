import Providers from "@/store/providers/Providers";
import {Toaster} from "react-hot-toast";
import "./globals.scss";

export default function RootLayout({
  children,
}:{
  children:React.ReactNode;
}){
  return(
    <html lang="fa">
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}