import axios from "axios"
import * as React from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaginationType, TransactionType } from "@/types"
import { getAccessToken } from "@/app/action"
import { serverUrlGenerator } from "@/utils"
import PurchaseTable from "./purchase-table"

const PurchasePage = async () => {
    const access = await getAccessToken()

    const response = await axios.get(serverUrlGenerator(`/transactions/list-transactions/`), {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    const data: PaginationType<TransactionType> = response.data

    const columnsList = [
        "Course",
        "User",
        "Amount",
        "Razorpay Order Id",
        "Paid",
        "Placed On",
    ]

    return <div className="w-full p-4">
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between py-4">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>
                            All Purchases
                        </CardTitle>
                        <CardDescription>
                            List of all the purchases made by the users.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <PurchaseTable data={data} columnList={columnsList} />
        </Card>
    </div>
}

export default PurchasePage