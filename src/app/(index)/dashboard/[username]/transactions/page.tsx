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

type RecordType = {
    id: string
    course: string
    amount: number
    razorpay_order_id: string
    is_paid: boolean
    created_at: string
}

const PurchasePage = async () => {
    const { access_token } = await getCookies(['access_token'])

    const response = await axios.get(`${process.env.BASE_API_URL}/transactions/list-self-transactions/`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    const data: RecordType[] = response.data

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
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {
                                    columnsList.map(column => {
                                        return <TableHead key={column}>
                                            {column}
                                        </TableHead>
                                    })
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((item, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>
                                            {item.course}
                                        </TableCell>
                                        <TableCell>
                                            {item.amount}
                                        </TableCell>
                                        <TableCell>
                                            {item.razorpay_order_id}
                                        </TableCell>
                                        <TableCell>
                                            {item.is_paid ? <Check /> : <X />}
                                        </TableCell>
                                        <TableCell>
                                            {item.created_at}
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

export default PurchasePage