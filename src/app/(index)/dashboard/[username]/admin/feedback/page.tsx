import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCookies } from "@/server/action"
import axios from "axios"
import { StarIcon } from "lucide-react"
import DeleteFeedback from "./DeleteFeedback"

type RecordType = {
    id: string
    user: string
    created_at: string
    feedback: string
    rating: number
}

const FeedbackPage = async () => {
    const { access_token } = await getCookies(["access_token"])

    const response = await axios.get(`${process.env.BASE_API_URL}/feedback/list/`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data: RecordType[] = response.data

    const columnsList = [
        "Username",
        "Date",
        "Message",
        "Rating"
    ]

    const truncate = (str: string) => {
        return str.length > 50 ? str.substring(0, 50) + '...' : str
    }

    const ratingStart = (rating: number) => {
        return <div className="flex gap-1">
            {
                Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                        key={index}
                        className={`w-5 h-5 ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                    />
                ))
            }
        </div>
    }

    return <div className="w-full p-4">
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between py-4">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>
                            All Feedback
                        </CardTitle>
                        <CardDescription>
                            Inspect your feedback and stay on top of important updates.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {
                                    columnsList.map(column => (
                                        <TableHead key={column}>
                                            {column}
                                        </TableHead>
                                    ))
                                }
                                <TableHead>
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((item, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>
                                            {item.user}
                                        </TableCell>
                                        <TableCell>
                                            {item.created_at}
                                        </TableCell>
                                        <TableCell>
                                            {(item.feedback)}
                                        </TableCell>
                                        <TableCell>
                                            {ratingStart(item.rating)}
                                        </TableCell>
                                        <TableCell>
                                            <DeleteFeedback feedbackId={item.id} />
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
}

export default FeedbackPage;