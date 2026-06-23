import Providers from "@/store/providers/Providers";
import {Toaster} from "react-hot-toast";
import "./globals.scss";

export default function RootLayout({
  children,
}:{
  children:React.ReactNode;
}){
  return(
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          gutter={14}
          toastOptions={{
            duration:2000,
            className:"appToast",
            success:{
              className:"appToast appToastSuccess",
              iconTheme:{primary:"#21B487",secondary:"#ffffff"},
            },
            error:{
              className:"appToast appToastError",
              iconTheme:{primary:"#dc2626",secondary:"#ffffff"},
            },
            loading:{
              className:"appToast appToastLoading",
              iconTheme:{primary:"#2563eb",secondary:"#ffffff"},
            },
          }}
        />
      </body>
    </html>
  );
}