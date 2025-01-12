import { AppSidebar } from "@/components/ui/app-sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bell, Search, UserIcon } from "lucide-react"
import DashboardBreadcrumbComponent from "./breadcrumb"
import { getAccessToken, getRefreshToken } from "@/app/action"
import { getUser } from "@/utils"
import AddStateValues from "./add-state-values"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const access = await getAccessToken()
    const refresh = await getRefreshToken()
    const user = getUser(access)
    return (
        <SidebarProvider>
            <AddStateValues access={access} refresh={refresh} />
            {user && <AppSidebar is_superuser={user.is_superuser} />}
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between px-4 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <DashboardBreadcrumbComponent />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="relative flex-1 sm:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search courses..."
                                className="w-full rounded-lg bg-background pl-8 sm:w-[400px] lg:w-[536px]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="rounded-full">
                                <Bell className="h-5 w-5" />
                                <span className="sr-only">Notifications</span>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                                        <UserIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout