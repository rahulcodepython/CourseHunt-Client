"use client"

import * as React from "react"
import {
    Asterisk,
    Book,
    CircleDollarSign,
    File,
    FlagTriangleRightIcon,
    House,
    MessageCircleMore,
    MountainIcon,
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
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppSidebar({
    is_superuser,
    ...props

}: {
    is_superuser: boolean,
}) {
    const pathname = usePathname();

    const data = {
        site: {
            name: "CourseHunt",
            logo: MountainIcon,
        },
        navMain: [{
            title: "Admin Panel",
            items: is_superuser && pathname.includes('/admin') ?
                [
                    {
                        title: "Dashboard",
                        url: `/dashboard/admin`,
                        icon: House,
                        isActive: true,
                    },
                    {
                        title: "Purchase",
                        url: `/dashboard/admin/purchase`,
                        icon: CircleDollarSign,
                    },
                    {
                        title: "Feedback",
                        url: `/dashboard/admin/feedback`,
                        icon: MessageCircleMore,
                    },
                    {
                        title: "Courses",
                        url: `/dashboard/admin/courses`,
                        icon: Book,
                    },
                    {
                        title: "Blogs",
                        url: `/dashboard/admin/blogs`,
                        icon: File,
                    },
                    {
                        title: "Users",
                        url: `/dashboard/admin/users`,
                        icon: UserIcon,
                    },
                    {
                        title: "Coupon Codes",
                        url: `/dashboard/admin/cupone-codes`,
                        icon: Asterisk,
                    },
                ]
                :
                [
                    {
                        title: "Dashboard",
                        url: `/dashboard`,
                        icon: House,
                        isActive: true,
                    },
                    {
                        title: "Purchased Courses",
                        url: `/dashboard/purchased-courses`,
                        icon: Book,
                    },
                    {
                        title: "Transactions",
                        url: `/dashboard/transactions`,
                        icon: CircleDollarSign,
                    },
                    {
                        title: "Feedback",
                        url: `/dashboard/feedback`,
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
