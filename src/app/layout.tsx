import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
    title: "CourseHunt | Home",
    description: "This is a demo course selling website.",
};

export default async function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="en">
        <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster />
            </ThemeProvider>
        </body>
    </html>
}
