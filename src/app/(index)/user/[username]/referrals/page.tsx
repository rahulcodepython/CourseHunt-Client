"use client"
import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon } from "@radix-ui/react-icons";
import { CopyIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type ReferralType = {
    user: string;
    email: string;
    date: string;
    status: "Active" | "Inactive" | "Purchased";
    reward: number;

}

const ReferralsPage = () => {
    const Referrals: ReferralType[] = [
        {
            user: "John Doe",
            email: "abc@example.com",
            date: "01/01/2022",
            status: "Active",
            reward: 1
        },
        {
            user: "Jane Doe",
            email: "xyz@example.com",
            date: "01/01/2022",
            status: "Inactive",
            reward: 0
        },
        {
            user: "Rahul Das",
            email: "rahul@example.com",
            date: "01/01/2022",
            status: "Purchased",
            reward: 40
        },
    ]
    return (
        <section className="grid gap-4 pt-8">
            <div className="grid gap-2 text-left container mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Referrals</h1>
                <p className="text-muted-foreground">Share your unique referral link and earn rewards.</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm container mx-auto max-w-2xl w-full">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Your Referral Link</div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <CopyIcon className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="h-4 w-4" />
                                    <span>Copied to clipboard!</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="mt-2 flex items-center justify-center rounded-md bg-muted px-3 py-2">
                    <Input
                        readOnly
                        value="https://example.com/referral/abc123"
                        className="w-full bg-transparent text-center font-medium"
                    />
                </div>
            </div>
            <div className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Purchesed Course</CardTitle>
                            <CardDescription>View all purchesed course.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Reward</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        Referrals.map((item, index) => {
                                            return <TableRow key={index}>
                                                <TableCell>
                                                    {item.user}
                                                </TableCell>
                                                <TableCell>
                                                    {item.email}
                                                </TableCell>
                                                <TableCell>
                                                    {item.date}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="text-xs" variant="secondary">
                                                        {item.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    ${item.reward}
                                                </TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default ReferralsPage;