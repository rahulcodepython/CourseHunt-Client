"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from 'react'
import { ListCouponCodeType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { useAuthStore } from '@/context/AuthStore'
import PaginationControl from "@/components/pagination-control"
import CreateCouponeCodeDialogue from "./create-coupone-code-dialogue"
import EditCouponeCodeDialogue from "./edit-coupone-code-dialogue"
import DeleteCouponeCode from "./delete-coupone-code"

const CouponeCodeTable = ({ data, columnList }: {
    data: PaginationType<ListCouponCodeType>
    columnList: string[]
}) => {
    const pagination = usePagination<ListCouponCodeType>(data, 2)
    const accessToken = useAuthStore(state => state.accessToken)

    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-4 justify-start">
                    <CardTitle>Cupone Codes</CardTitle>
                    <CardDescription>View all Cupone Codes.</CardDescription>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <CreateCouponeCodeDialogue addData={pagination.addData} />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                columnList.map((header, index) => {
                                    return <TableHead key={index}>
                                        {header}
                                    </TableHead>
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            pagination.results.map((item, index) => {
                                return <TableRow key={item.id}>
                                    <TableCell>
                                        {item.code}
                                    </TableCell>
                                    <TableCell>
                                        {item.discount}
                                    </TableCell>
                                    <TableCell>
                                        {item.created_at}
                                    </TableCell>
                                    <TableCell>
                                        {item.expiry}
                                    </TableCell>
                                    <TableCell>
                                        {item.is_unlimited ? 'Unlimited' : item.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {item.used}
                                    </TableCell>
                                    <TableCell>
                                        {item.is_unlimited ? 'Yes' : 'No'}
                                    </TableCell>
                                    <TableCell>
                                        {item.is_active ? 'Yes' : 'No'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <EditCouponeCodeDialogue defaultData={item} updateData={pagination.updateData} />
                                            <DeleteCouponeCode id={item.id} access_token={accessToken} removeCouponCode={pagination.removeData} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                <PaginationControl pagination={pagination} accessToken={accessToken} />
            </CardContent>
        </Card>
    )
}

export default CouponeCodeTable
