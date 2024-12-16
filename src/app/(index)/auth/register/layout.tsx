import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ChromeIcon, GithubIcon } from "lucide-react"
import React from "react";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
    return <main className="flex items-center justify-center w-screen h-screen">
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardDescription>
                    <span className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign up to your account
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex flex-col w-full gap-4">
                <div className="grid grid-cols-3 items-center text-gray-500 w-full">
                    <hr className="border-gray-500" />
                    <p className="text-center text-sm">OR</p>
                    <hr className="border-gray-500" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Button variant="outline" className="w-full">
                        <GithubIcon className="mr-2 h-4 w-4" />
                        Sign up with GitHub
                    </Button>
                    <Button variant="outline" className="w-full">
                        <ChromeIcon className="mr-2 h-4 w-4" />
                        Sign up with Google
                    </Button>
                </div>
                <div className="text-sm flex justify-between items-center w-full">
                    <p>If you have an account...</p>
                    <Link href="/auth/login">
                        <span className='underline hover:cursor-pointer'>Login</span>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    </main>
};

export default RegisterLayout;