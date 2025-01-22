"use client"
import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendHorizonal, StarIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/context/AuthStore";
import useMutation from "@/hooks/useMutation";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { clientUrlGenerator } from "@/utils";
import LoadingButton from "@/components/loading-button";

const FeedbackPage = () => {
    const [rating, setRating] = React.useState(0);
    const [ratingHover, setRatingHover] = React.useState(0);
    const [feedback, setFeedback] = React.useState("");

    const accessToken = useAuthStore(state => state.accessToken);

    const options = {
        url: clientUrlGenerator(`/feedback/create/`),
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        data: { feedback, rating },
    }

    const { mutate, onSuccess, onError, mutationIsLoading } = useMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(options);
    }

    onSuccess((data) => {
        setRating(0);
        setRatingHover(0);
        setFeedback("");
        toast.success(data.success);
    })

    onError((error) => {
        toast.error(error);
    })

    return (
        <CardContent>
            <form className="grid gap-4" onSubmit={e => handleSubmit(e)}>
                <div className="grid gap-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea id="feedback" placeholder="Share your feedback" className="min-h-[100px]" value={feedback} onChange={e => setFeedback(e.target.value)} />
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
                <CardFooter className="flex justify-end p-0">
                    <LoadingButton loading={mutationIsLoading}>
                        <Button type="submit" className="gap-2">
                            <SendHorizonal className="h-4 w-4" />
                            <span>Send Feedback</span>
                        </Button>
                    </LoadingButton>
                </CardFooter>
            </form>
        </CardContent>
    )
}

const createFeedback = async (data: { feedback: string, rating: number }, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/feedback/create/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        data: data,
    }
    return await axios.request(options)
}

export default FeedbackPage;