"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { FeedbackType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import { StarIcon } from 'lucide-react'
import DeleteFeedback from './DeleteFeedback'

const FeedbackTable = ({ data, columnList }: {
    data: PaginationType<FeedbackType>
    columnList: string[]
}) => {
    const pagination = usePagination<FeedbackType>(data)
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
                        pagination.results.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {item.user}
                                </TableCell>
                                <TableCell>
                                    {item.created_at}
                                </TableCell>
                                <TableCell>
                                    {(item.feedback)}
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

export default FeedbackTable
