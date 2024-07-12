import { Button } from "@/components/ui/button"
import { MountainIcon } from "@/utils/icons"
import { Link } from "next-view-transitions"

const Navbar = () => {
    const NavItems: string[] = [
        'Home',
        'About',
        'Services',
        'Contact'
    ]

    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-14 items-center">
                    <Link href="#" className="flex items-center" prefetch={false}>
                        <MountainIcon className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <div className="hidden md:flex gap-4">
                        {
                            NavItems.map((item, index) => (
                                <Link key={index} href="#" className="font-medium flex items-center text-sm transition-colors" prefetch={false}>
                                    {item}
                                </Link>
                            ))
                        }
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={'/auth/login'} prefetch={false}>
                            <Button variant="outline" size="sm">
                                Sign in
                            </Button>
                        </Link>
                        <Link href={'/auth/register'} prefetch={false}>
                            <Button size="sm">Sign up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar