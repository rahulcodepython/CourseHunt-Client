import * as React from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { FeedbackType, PaginationType } from "@/types"
import { getAccessToken } from "@/app/action"
import { serverUrlGenerator } from "@/utils"
import FeedbackTable from "./feedback-table"

const FeedbackPage = async () => {
    const access_token = await getAccessToken()

    const response = await axios.get(serverUrlGenerator(`/feedback/list/`), {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data: PaginationType<FeedbackType> = response.data

    const columnsList = [
        "Username",
        "Date",
        "Message",
        "Rating"
    ]

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
            <FeedbackTable data={data} columnList={columnsList} />
        </Card>
    </div>
}

export default FeedbackPage;