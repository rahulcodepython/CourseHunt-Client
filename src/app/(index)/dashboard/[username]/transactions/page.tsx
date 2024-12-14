import { getCookies } from "@/server/action"
import axios from "axios"
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
import { Check, X } from "lucide-react"
import { PaginationType, SelfTransactionType } from "@/types"
import TransactionTable from "./TransactionTable"

const PurchasePage = async () => {
    const { access_token } = await getCookies(['access_token'])

    const response = await axios.get(`${process.env.BASE_API_URL}/transactions/list-self-transactions/`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    const data: PaginationType<SelfTransactionType> = response.data

    const columnsList = [
        "Course",
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
            <TransactionTable data={data} columnList={columnsList} />
        </Card>
    </div>
}

export default PurchasePage