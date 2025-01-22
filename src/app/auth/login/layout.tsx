import GithubLogin from '@/components/github-login';
import GoogleLogin from '@/components/google-login';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    return <main className="flex items-center justify-center w-screen h-screen">
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardDescription>
                    <span className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
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
                    <GithubLogin />
                    <GoogleLogin />
                </div>
                <div className="text-sm flex justify-between items-center w-full">
                    <p>If you {`don't`} have an account...</p>
                    <Link href="/auth/register">
                        <span className='underline hover:cursor-pointer'>Register</span>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    </main>
}

export default LoginLayout;