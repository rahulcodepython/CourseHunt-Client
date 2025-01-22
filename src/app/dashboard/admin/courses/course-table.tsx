"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { ListCourseAdminDashboardType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/context/AuthStore'
import PaginationControl from '@/components/pagination-control'
import CourseAction from './course-action'

const CourseTable = ({ data, columnList }: {
    data: PaginationType<ListCourseAdminDashboardType>
    columnList: string[]
}) => {
    const pagination = usePagination<ListCourseAdminDashboardType>(data, 2)
    const accessToken = useAuthStore(state => state.accessToken)

    const removeCourse = (courseid: string) => {
        pagination.removeData(courseid)
    }

    const updateCourse = (courseid: string, data: Partial<ListCourseAdminDashboardType>) => {
        pagination.updateData(courseid, data)
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
                        </TableRow> : pagination.results.map((course, index) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.created_at}</TableCell>
                                <TableCell>{course.price}</TableCell>
                                <TableCell>{course.offer}</TableCell>
                                <TableCell>{course.status}</TableCell>
                                <TableCell>
                                    <CourseAction course={course} removeCourse={removeCourse} updateCourse={updateCourse} />
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
