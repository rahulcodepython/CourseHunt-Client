"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { PaginationType, TransactionType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import { Check, X } from 'lucide-react'

const PurchaseTable = ({ data, columnList }: {
    data: PaginationType<TransactionType>
    columnList: string[]
}) => {
    const pagination = usePagination<TransactionType>(data)
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
                        pagination.results.map((item, index) => (
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
                    {
                        pagination.isFetching && <TableRow>
                            <TableCell colSpan={columnList.length + 1}>
                                Loading...
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
            <CardFooter className='p-0 pt-6 flex justify-between'>
                <p className='text-left'>
                    Total Courses: {pagination.count}
                </p>
                {
                    pagination.is_next && <Button onClick={() => pagination.fetchNext(pagination.nextPageUrl, true, accessToken)}>
                        Load More
                    </Button>
                }
            </CardFooter>
        </CardContent>
    )
}

export default PurchaseTable
