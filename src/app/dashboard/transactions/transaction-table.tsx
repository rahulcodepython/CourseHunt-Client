"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { PaginationType, SelfTransactionType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent } from '@/components/ui/card'
import { Check, X } from 'lucide-react'
import PaginationControl from '@/components/pagination-control'

const TransactionTable = ({ data, columnList, accessToken }: {
    data: PaginationType<SelfTransactionType>
    columnList: string[],
    accessToken: string | undefined
}) => {
    const pagination = usePagination<SelfTransactionType>(data, 2)

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
                                <TableCell className='w-[300px]'>
                                    {item.course}
                                </TableCell>
                                <TableCell>
                                    {item.amount}
                                </TableCell>
                                <TableCell className='w-[300px]'>
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

export default TransactionTable
