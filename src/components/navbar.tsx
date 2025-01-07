import { Button } from "./ui/button";
import { MountainIcon, UserIcon } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { getUser, isAuthenticated } from "@/utils";
import { getAccessToken } from "@/app/action";
import { Link } from "next-view-transitions";

const Navbar = async () => {
    const access = await getAccessToken();
    const isAuth = isAuthenticated(access);
    const user = getUser(access);

    const NavItems = [
        {
            label: 'Home',
            href: '/'
        },
        {
            label: 'About',
            href: '/about'
        },
        {
            label: 'Blogs',
            href: '/blogs'
        },
        {
            label: 'Courses',
            href: '/courses'
        },
        {
            label: 'Contact',
            href: '/contact'
        }
    ]

    return <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-14 items-center">
                <Link href="#" className="flex items-center" prefetch={false}>
                    <MountainIcon className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <div className="hidden md:flex gap-4">
                    {
                        NavItems.map((item, index) => (
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
                                    user?.is_superuser ? <Link href={`/dashboard/${user.username}/admin`} prefetch={false}>
                                        <Button variant="outline" size="sm">
                                            Admin
                                        </Button>
                                    </Link> : null
                                }
                                <Link href={`/dashboard/${user?.username}`} className="border rounded-full p-2 cursor-pointer">
                                    <UserIcon />
                                </Link>
                            </div>
                            :
                            <Link href={'/auth/login'} prefetch={false}>
                                <Button variant="outline" size="sm">
                                    Sign in
                                </Button>
                            </Link>

                    }
                </div>
            </div>
        </div>
    </nav>
}

export default Navbar
