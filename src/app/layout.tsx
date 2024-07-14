import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Coursera | Home",
    description: "This is a demo course selling website.",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="en">
        <body className={inter.className}>
            <AuthContextProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ToastContainer />
                    {children}
                </ThemeProvider>
            </AuthContextProvider>
        </body>
    </html>
}
