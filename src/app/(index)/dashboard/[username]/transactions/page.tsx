import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

const TransactionsPage = () => {
    const Transactions = [
        {
            transactionId: "TRX-001",
            course: "Course 1",
            date: "2021-10-01",
            amount: 100,
            off: 0,
            cuponCode: "CUPON-001",
            purchasedPrice: 100,
            status: "success",
        },
        {
            transactionId: "TRX-002",
            course: "Course 2",
            date: "2021-10-02",
            amount: 200,
            off: 0,
            cuponCode: "CUPON-001",
            purchasedPrice: 100,
            status: "success",
        },
        {
            transactionId: "TRX-003",
            course: "Course 3",
            date: "2021-10-03",
            amount: 300,
            off: 0,
            cuponCode: "CUPON-001",
            purchasedPrice: 100,
            status: "success",
        },
        {
            transactionId: "TRX-004",
            course: "Course 4",
            date: "2021-10-04",
            amount: 400,
            off: 0,
            cuponCode: "CUPON-001",
            purchasedPrice: 100,
            status: "success",
        },
    ]

    return <section className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Purchesed Course</CardTitle>
                    <CardDescription>View all purchesed course.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Offer</TableHead>
                                <TableHead>Cupone Code</TableHead>
                                <TableHead>Purchased Price</TableHead>
                                <TableHead>Invoice</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Transactions.map((item, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>
                                            {item.transactionId}
                                        </TableCell>
                                        <TableCell>
                                            {item.course}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="text-xs" variant="secondary">
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {item.date}
                                        </TableCell>
                                        <TableCell>
                                            {item.amount}
                                        </TableCell>
                                        <TableCell>
                                            {item.off}
                                        </TableCell>
                                        <TableCell>
                                            {item.cuponCode}
                                        </TableCell>
                                        <TableCell>
                                            {item.purchasedPrice}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="secondary" size="sm">
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </section>
}

export default TransactionsPage;