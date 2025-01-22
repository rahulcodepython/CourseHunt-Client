"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { ListCourseDashboardType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PaginationControl from '@/components/pagination-control'
import Link from 'next/link'


const CourseTable = ({ data, columnList, accessToken }: {
    data: PaginationType<ListCourseDashboardType>
    columnList: string[],
    accessToken: string | undefined
}) => {
    const pagination = usePagination<ListCourseDashboardType>(data, 1)

    return (
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        {
                            columnList.map((col) => (
                                <TableHead key={col} className='first:w-full'>
                                    {col}
                                </TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        pagination.isFetching ?
                            <TableRow>
                                <TableCell colSpan={columnList.length + 1}>
                                    Loading...
                                </TableCell>
                            </TableRow> :
                            pagination.results.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/study/${item.id}`}>
                                            <Button className='w-[10rem]'>
                                                Studey
                                            </Button>
                                        </Link>
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

export default CourseTable
