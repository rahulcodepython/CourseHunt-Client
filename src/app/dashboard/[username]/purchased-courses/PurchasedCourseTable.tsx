"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { ListCourseDashboardType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import { Link } from 'next-view-transitions'

const PurchasedCourseTable = ({ data, columnList }: {
    data: PaginationType<ListCourseDashboardType>
    columnList: string[]
}) => {
    const pagination = usePagination<ListCourseDashboardType>(data)
    const accessToken = useAuthStore(state => state.accessToken)
    const user = useAuthStore(state => state.user)

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
                        <TableHead>
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        pagination.results.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/dashboard/${user?.username}/study/${item.id}`}>
                                        <Button>
                                            Studey
                                        </Button>
                                    </Link>
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

export default PurchasedCourseTable
