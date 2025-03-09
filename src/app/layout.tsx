import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
	title: "CourseHunt | Home",
	description: "This is a demo course selling website.",
};

export default async function RootLayout({ children }: Readonly<{
	children: React.ReactNode;
}>) {
	return <html lang="en">
		<body>
			{/* <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            > */}
			{children}
			<ToastContainer />
			{/* </ThemeProvider> */}
		</body>
	</html>
}
