import Link from "next/link"
import React from "react"
import ModeToggle from "@/components/ModeToggle"
import { MountainIcon } from "lucide-react"
import { getCookies } from "@/server/action"
import AuthNavSection from "@/components/AuthNavSection"


const Navbar = async () => {
    const { access_token, refresh_token, user } = await getCookies(['access_token', 'refresh_token', 'user']);

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
            label: 'Services',
            href: '/services'
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
                    <AuthNavSection accessToken={access_token} refreshToken={refresh_token} userData={user} />
                </div>
            </div>
        </div>
    </nav>
}

export default Navbar