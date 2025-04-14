import { Button } from "./ui/button";
import { MountainIcon, UserIcon } from "lucide-react";
import { getUser, isAuthenticated } from "@/app/action";
import ModeToggle from "./mode-toggle";
import Link from "next/link";

const Navbar = async () => {
    const isAuth = await isAuthenticated();
    const user = await getUser();

    const config = {
        name: 'CourseHunt',
        navItems: [
            {
                label: 'Home',
                href: '/'
            },
            {
                label: 'Blogs',
                href: '/blogs'
            },
            {
                label: 'Courses',
                href: '/courses'
            },
        ],
        admin: {
            label: 'Admin',
            href: '/dashboard/admin'
        },
        user: {
            label: 'User',
            href: '/dashboard'
        },
        auth: {
            label: 'Sign in',
            href: '/auth/login'
        }
    }


    return <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-14 items-center">
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                    <MountainIcon className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                    <h1 className="text-lg font-bold">
                        {config.name}
                    </h1>
                </Link>
                <div className="hidden md:flex gap-4">
                    {
                        config.navItems.map((item, index) => (
                            <Link key={index} href={item.href} className="font-medium flex items-center text-sm transition-colors" prefetch={false}>
                                {item.label}
                            </Link>
                        ))
                    }
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    {
                        isAuth ?
                            <div className="flex items-center gap-4">
                                {
                                    user?.is_superuser ? <Link href={config.admin.href} prefetch={false}>
                                        <Button variant="outline" size="sm" className="cursor-pointer">
                                            {config.admin.label}
                                        </Button>
                                    </Link> : null
                                }
                                <Link href={config.user.href} className="border rounded-full p-2 cursor-pointer">
                                    <UserIcon />
                                </Link>
                            </div>
                            :
                            <Link href={config.auth.href} prefetch={false}>
                                <Button variant="outline" size="sm" className="cursor-pointer">
                                    {config.auth.label}
                                </Button>
                            </Link>
                    }
                </div>
            </div>
        </div>
    </nav>
}

export default Navbar
