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

const FeedbackPage = () => {
    const [rating, setRating] = React.useState(0);
    const [ratingHover, setRatingHover] = React.useState(0);
    const [feedback, setFeedback] = React.useState("");

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const accessToken = useAuthStore(state => state.accessToken);

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isAuthenticated && await mutate(() => createFeedback({ feedback, rating }, accessToken));
    }

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    setRating(0);
                    setRatingHover(0);
                    setFeedback("");
                    toast.success(mutationData.success);
                }
            }
        }
        handler();
    }, [mutationState])

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
                    {
                        mutationIsLoading ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="gap-2">
                            <SendHorizonal className="h-4 w-4" />
                            <span>Send Feedback</span>
                        </Button>
                    }
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