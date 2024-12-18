import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "CourseHunt | Home",
    description: "This is a demo course selling website.",
};

export default async function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="en">
        <body>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <ToastContainer />
                {children}
            </ThemeProvider>
        </body>
    </html>
}
