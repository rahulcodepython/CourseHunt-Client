"use client"
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StarIcon } from "@/utils/icons";

const FeedbackPage = () => {
    const [rating, setRating] = React.useState(0);
    const [ratingHover, setRatingHover] = React.useState(0);

    return (
        <div className="flex flex-col items-center justify-start w-full h-screen bg-background px-8 pt-8">
            <Card className="w-full p-8 space-y-6">
                <CardHeader>
                    <CardTitle>Give us your feedback</CardTitle>
                    <CardDescription>We&apos;d love to hear your thoughts on how we&apos;re doing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea id="feedback" placeholder="Share your feedback" className="min-h-[100px]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Rating:</span>
                            <div className="flex gap-1">
                                {
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <StarIcon
                                            key={index}
                                            className={`w-5 h-5 ${((rating > index) || (ratingHover > index)) ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                                            onMouseEnter={() => setRatingHover(index + 1)}
                                            onMouseLeave={() => setRatingHover(0)}
                                            onClick={() => setRating(index + 1)}
                                        />
                                    ))
                                }
                                {/* <StarIcon className="w-5 h-5 fill-primary" />
                                <StarIcon className="w-5 h-5 fill-primary" />
                                <StarIcon className="w-5 h-5 fill-primary" />
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Submit Feedback</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default FeedbackPage;