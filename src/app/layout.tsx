import Providers from "@/store/providers/Providers";

export default function RootLayout({
  children,
}:{
  children:React.ReactNode;
}){
  return(
    <html lang="fa">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}