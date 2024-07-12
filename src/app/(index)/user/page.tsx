import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { BellIcon, BookIcon, HomeIcon, MenuIcon, Package2Icon, SearchIcon, SettingsIcon, UserIcon } from "@/utils/icons"

const user = () => {
    const sideNav = [
        {
            name: "Dashboard",
            icon: <HomeIcon className="h-5 w-5" />,
            href: "#",
        },
        {
            name: "Courses",
            icon: <BookIcon className="h-5 w-5" />,
            href: "#",
        },
        {
            name: "Students",
            icon: <UserIcon className="h-5 w-5" />,
            href: "#",
        },
        {
            name: "Settings",
            icon: <SettingsIcon className="h-5 w-5" />,
            href: "#",
        },
    ]

    return <main className="flex min-h-screen w-full bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Link href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        prefetch={false}>
                        <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    {
                        sideNav.map((item, i) => {
                            return <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                        prefetch={false}
                                    >
                                        {item.icon}
                                        <span className="sr-only">
                                            {item.name}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {item.name}
                                </TooltipContent>
                            </Tooltip>
                        })
                    }
                </TooltipProvider>
            </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <MenuIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link href="#" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base" prefetch={false}>
                                <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
                                <span className="sr-only">
                                    Acme Inc
                                </span>
                            </Link>
                            {
                                sideNav.map((item, i) => {
                                    return <Link href={item.href} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false} key={i}>
                                        {item.icon}
                                        <span>
                                            {item.name}
                                        </span>
                                    </Link>
                                })
                            }
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="relative ml-auto flex-1 md:grow-0">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search courses..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="rounded-full">
                        <BellIcon className="h-5 w-5" />
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
            </header>
            <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Courses</CardTitle>
                            <CardDescription>Browse our latest course offerings.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 px-4">
                            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
                                {
                                    Array.from({ length: 3 }).map((_, i) => {
                                        return <div className="flex items-center justify-center w-full my-2 lg:my-4" key={i}>
                                            <Card className="w-full max-w-md">
                                                <img src="/placeholder.svg" alt="Course thumbnail" className="rounded-t-lg object-cover w-full aspect-[2/1]" />
                                                <CardContent className="p-6 grid gap-6">
                                                    <div className="space-y-2">
                                                        <h3 className="text-xl font-semibold">Introduction to Web Development</h3>
                                                        <p className="text-muted-foreground">
                                                            Learn the fundamentals of web development, including HTML, CSS, and JavaScript.
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">Price:</p>
                                                            <p>$99</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">Published:</p>
                                                            <p>June 1, 2023</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">Duration:</p>
                                                            <p>12 hours</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">Chapters:</p>
                                                            <p>24</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar>
                                                                <AvatarImage src="/placeholder-user.jpg" />
                                                                <AvatarFallback>JD</AvatarFallback>
                                                            </Avatar>
                                                            <div className="text-sm">
                                                                <p className="font-medium">John Doe</p>
                                                                <p className="text-muted-foreground">Instructor</p>
                                                            </div>
                                                        </div>
                                                        <Button className="w-full max-w-[150px]">Enroll</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    })
                                }
                            </div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Recent Enrollments</CardTitle>
                            <CardDescription>View the latest student enrollments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Enrollment Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">John Doe</div>
                                            <div className="text-sm text-muted-foreground">john@example.com</div>
                                        </TableCell>
                                        <TableCell>Introduction to Web Development</TableCell>
                                        <TableCell>2023-06-01</TableCell>
                                        <TableCell>
                                            <Badge className="text-xs" variant="secondary">
                                                Enrolled
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Jane Smith</div>
                                            <div className="text-sm text-muted-foreground">jane@example.com</div>
                                        </TableCell>
                                        <TableCell>React.js Fundamentals</TableCell>
                                        <TableCell>2023-06-15</TableCell>
                                        <TableCell>
                                            <Badge className="text-xs" variant="secondary">
                                                Enrolled
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Michael Johnson</div>
                                            <div className="text-sm text-muted-foreground">michael@example.com</div>
                                        </TableCell>
                                        <TableCell>Data Structures and Algorithms</TableCell>
                                        <TableCell>2023-07-01</TableCell>
                                        <TableCell>
                                            <Badge className="text-xs" variant="secondary">
                                                Enrolled
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Emily Davis</div>
                                            <div className="text-sm text-muted-foreground">emily@example.com</div>
                                        </TableCell>
                                        <TableCell>Machine Learning for Beginners</TableCell>
                                        <TableCell>2023-07-15</TableCell>
                                        <TableCell>
                                            <Badge className="text-xs" variant="secondary">
                                                Enrolled
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    </main>
}

export default user