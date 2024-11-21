"use client"
import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StarIcon } from "lucide-react";

const FeedbackPage = () => {
    const [rating, setRating] = React.useState(0);
    const [ratingHover, setRatingHover] = React.useState(0);

    return (
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
                    </div>
                </div>
            </form>
            <CardFooter className="flex justify-end p-0">
                <Button>Submit Feedback</Button>
            </CardFooter>
        </CardContent>
    )
}

export default FeedbackPage;