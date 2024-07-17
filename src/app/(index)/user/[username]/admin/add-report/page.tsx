"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { BellIcon, EyeIcon } from "@/utils/icons";
import { TrashIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddReportPage = () => {
    const Reports = [
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
        {
            status: "read",
            title: "You have a new message from your instructor.",
            time: "1 min ago",
        },
        {
            status: "read",
            title: "You have a new message from your instructor.",
            time: "1 min ago",
        },
        {
            status: "read",
            title: "You have a new message from your instructor.",
            time: "1 min ago",
        },
        {
            status: "read",
            title: "You have a new message from your instructor.",
            time: "1 min ago",
        },
    ]

    return <section className="grid items-start gap-4 p-4 sm:p-6 md:gap-8">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Create Report</h1>
            <p className="mt-2 text-muted-foreground md:text-md">
                Manage your reports and stay on top of important updates.
            </p>
        </div>
        <form className="space-y-4 container mx-auto">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter report title" />
            </div>
            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter report message" className="min-h-[120px]" />
            </div>
            <div className="flex items-center justify-end">
                <Button type="submit">
                    Create Report
                </Button>
            </div>
        </form>
        <Card className="pb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <CardTitle className="text-xl font-semibold">Reports</CardTitle>
                <BellIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-6 h-[500px] overflow-y-scroll">
                {
                    Reports.map((item, i) => {
                        return <div className="grid grid-cols-[25px_1fr_75px] items-start" key={i}>
                            <div className="w-full flex items-center justify-center my-2">
                                <span className={`h-2 w-2 rounded-full ${item.status === 'read' ? 'bg-gray-500' : 'bg-blue-500'}`} />
                            </div>
                            <div className="grid gap-1">
                                <p className="text-md font-bold">{item.title}</p>
                                <p className="text-sm">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.time}</p>
                            </div>
                            <div className="flex items-center justify-center">
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
    </section>
}

export default AddReportPage;