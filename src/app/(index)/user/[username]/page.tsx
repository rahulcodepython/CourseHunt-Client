"use client"
import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarchartChart, BarChartIcon, BellIcon, BriefcaseIcon, CircleCheckIcon, EyeIcon, FileTextIcon, LinechartChart, LineChartIcon, TrashIcon, TrophyIcon } from "@/utils/icons"

const Dashboard = () => {
    const Notification = [
        {
            status: "unread",
            title: "Your assignment has been graded.",
            time: "5 min ago",
        },
        {
            status: "read",
            title: "Your assignment has been graded.",
            time: "5 min ago",
        },
        {
            status: "unread",
            title: "You have a new message from your instructor.",
            time: "1 min ago",
        },
        {
            status: "read",
            title: "You have a new message from your instructor.",
            time: "1 min ago",
        },
    ]

    return <section className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="grid items-start gap-4 p-4 sm:p-6 md:gap-8">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Courses Purchased</CardTitle>
                        <BriefcaseIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">125</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                        <CircleCheckIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Student Marks</CardTitle>
                        <TrophyIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-8">
                    <CardTitle className="text-xl font-semibold">Notifications</CardTitle>
                    <BellIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {
                        Notification.map((item, i) => {
                            return <div className="grid grid-cols-[25px_1fr_75px] items-start" key={i}>
                                <span className={`flex h-2 w-2 translate-y-1.5 rounded-full ${item.status === 'read' ? 'bg-gray-500' : 'bg-blue-500'}`} />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                </div>
                                <div className="flex items-center">
                                    <Button variant="ghost" size="icon">
                                        <EyeIcon className="w-4 h-4" />
                                        <span className="sr-only">Read</span>
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <TrashIcon className="w-4 h-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        })
                    }
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-8">
                    <CardTitle className="text-xl font-semibold">Reports</CardTitle>
                    <BellIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {
                        Notification.map((item, i) => {
                            return <div className="grid grid-cols-[25px_1fr_30px] items-start" key={i}>
                                <span className={`flex h-2 w-2 translate-y-1.5 rounded-full ${item.status === 'read' ? 'bg-gray-500' : 'bg-blue-500'}`} />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <EyeIcon className="w-4 h-4" />
                                    <span className="sr-only">Read</span>
                                </Button>
                            </div>
                        })
                    }
                </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Student Performance</CardTitle>
                        <LineChartIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <LinechartChart className="aspect-[9/4]" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Course Completion Rate</CardTitle>
                        <BarChartIcon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <BarchartChart className="aspect-[9/4]" />
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
}

export default Dashboard;

