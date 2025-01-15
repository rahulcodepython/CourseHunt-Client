"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon } from "@radix-ui/react-icons";
import { CopyIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ReferralsTable from "./ReferralsTable";

const ReferralsPage = () => {
    return <section className="grid gap-4 pt-8">
        <div className="container mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Referrals</CardTitle>
                    <CardDescription>Share your unique referral link and earn rewards.</CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
        <div className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                <ReferralsTable />
            </div>
        </div>
    </section>
}


export default ReferralsPage;   