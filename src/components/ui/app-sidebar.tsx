"use client"

import * as React from "react"
import {
    Asterisk,
    Bell,
    Book,
    CircleDollarSign,
    FlagTriangleRightIcon,
    GalleryVerticalEnd,
    House,
    MessageCircleMore,
    Tag,
    UserIcon,
} from "lucide-react"

import { NavMain } from "@/components/ui/nav-main"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/context/AuthStore"
import { usePathname } from "next/navigation"
import { Link } from "next-view-transitions"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAuthStore((state) => state.user);
    const pathname = usePathname();

    const data = {
        site: {
            name: "Coursera",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        navMain: [{
            title: "Admin Panel",
            items: user?.is_superuser && pathname.includes('/admin') ?
                [
                    {
                        title: "Dashboard",
                        url: `/dashboard/${user?.username}/admin`,
                        icon: House,
                        isActive: true,
                    },
                    {
                        title: "Purchase",
                        url: `/dashboard/${user?.username}/admin/purchase`,
                        icon: CircleDollarSign,
                    },
                    {
                        title: "Feedback",
                        url: `/dashboard/${user?.username}/admin/feedback`,
                        icon: MessageCircleMore,
                    },
                    {
                        title: "Courses",
                        url: `/dashboard/${user?.username}/admin/courses`,
                        icon: Book,
                    },
                    {
                        title: "Users",
                        url: `/dashboard/${user?.username}/admin/users`,
                        icon: UserIcon,
                    },
                    {
                        title: "Coupon Codes",
                        url: `/dashboard/${user?.username}/admin/cupone-codes`,
                        icon: Asterisk,
                    },
                ]
                :
                [
                    {
                        title: "Dashboard",
                        url: `/dashboard/${user?.username}`,
                        icon: House,
                        isActive: true,
                    },
                    {
                        title: "Purchased Courses",
                        url: `/dashboard/${user?.username}/purchased-courses`,
                        icon: Book,
                    },
                    {
                        title: "Transactions",
                        url: `/dashboard/${user?.username}/transactions`,
                        icon: CircleDollarSign,
                    },
                    {
                        title: "Feedback",
                        url: `/dashboard/${user?.username}/feedback`,
                        icon: FlagTriangleRightIcon,
                    },
                ],
        }]
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/">
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <data.site.logo className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {data.site.name}
                                    </span>
                                    <span className="truncate text-xs">{data.site.plan}</span>
                                </div>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
