import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/theme-provider";
import { getCookies } from "@/server/action";

export const metadata: Metadata = {
    title: "Coursera | Home",
    description: "This is a demo course selling website.",
};

export default async function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const { access_token } = await getCookies(['access_token']);
    console.log(access_token);

    return <html lang="en">
        <body>
            {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
            <ToastContainer />
            {children}
            {/* </ThemeProvider> */}
        </body>
    </html>
}
