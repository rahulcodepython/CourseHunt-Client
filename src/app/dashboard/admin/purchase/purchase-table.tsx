"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { PaginationType, TransactionType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/context/AuthStore'
import { Check, X } from 'lucide-react'
import PaginationControl from '@/components/pagination-control'

const PurchaseTable = ({ data, columnList }: {
    data: PaginationType<TransactionType>
    columnList: string[]
}) => {
    const pagination = usePagination<TransactionType>(data, 2)
    const accessToken = useAuthStore(state => state.accessToken)

    return (
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        {
                            columnList.map((col) => (
                                <TableHead key={col}>
                                    {col}
                                </TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        pagination.isFetching ? <TableRow>
                            <TableCell colSpan={columnList.length + 1}>
                                Loading...
                            </TableCell>
                        </TableRow> : pagination.results.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {item.course}
                                </TableCell>
                                <TableCell>
                                    {item.user}
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
                        ))
                    }
                </TableBody>
            </Table>
            <PaginationControl pagination={pagination} accessToken={accessToken} />
        </CardContent>
    )
}

export default PurchaseTable
