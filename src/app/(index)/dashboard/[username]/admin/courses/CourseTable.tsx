"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import CourseAction from './CourseAction'
import { ListCourseAdminDashboardType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'

const CourseTable = ({ data, columnList }: {
    data: PaginationType<ListCourseAdminDashboardType>
    columnList: string[]
}) => {
    const pagination = usePagination<ListCourseAdminDashboardType>(data)
    const accessToken = useAuthStore(state => state.accessToken)

    const removeCourse = (courseid: string) => {
        pagination.removeData(courseid)
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
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        pagination.results.map((course, index) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.created_at}</TableCell>
                                <TableCell>{course.price}</TableCell>
                                <TableCell>{course.offer}</TableCell>
                                <TableCell>{course.status}</TableCell>
                                <TableCell>
                                    <CourseAction courseid={course.id} removeCourse={removeCourse} />
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

export default CourseTable
