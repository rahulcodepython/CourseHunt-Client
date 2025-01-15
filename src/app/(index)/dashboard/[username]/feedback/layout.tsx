import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import React from "react";

const UserFeedbackLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-center justify-start w-full h-screen bg-background px-8 pt-8">
            <Card className="w-full p-8 space-y-6">
                <CardHeader>
                    <CardTitle>Give us your feedback</CardTitle>
                    <CardDescription>We&apos;d love to hear your thoughts on how we&apos;re doing.</CardDescription>
                </CardHeader>
                {children}
            </Card>
        </div>
    );
};

export default UserFeedbackLayout;