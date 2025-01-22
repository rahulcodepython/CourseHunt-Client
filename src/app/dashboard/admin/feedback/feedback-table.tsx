"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { FeedbackType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/context/AuthStore'
import { StarIcon } from 'lucide-react'
import PaginationControl from '@/components/pagination-control'
import DeleteFeedback from './delete-feedback'

const FeedbackTable = ({ data, columnList }: {
    data: PaginationType<FeedbackType>
    columnList: string[]
}) => {
    const pagination = usePagination<FeedbackType>(data, 2)
    const accessToken = useAuthStore(state => state.accessToken)

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
                                    {item.user}
                                </TableCell>
                                <TableCell>
                                    {item.created_at}
                                </TableCell>
                                <TableCell>
                                    {truncate(item.feedback)}
                                </TableCell>
                                <TableCell>
                                    {ratingStart(item.rating)}
                                </TableCell>
                                <TableCell>
                                    <DeleteFeedback feedbackId={item.id} removeFeedback={pagination.removeData} />
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

export default FeedbackTable
