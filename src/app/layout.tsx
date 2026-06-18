import Providers from "@/store/providers/Providers";
import {Toaster} from "react-hot-toast";
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