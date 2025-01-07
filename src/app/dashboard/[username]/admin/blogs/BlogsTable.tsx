"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { AdminListBlogsType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import BlogsAction from './BlogsAction'

const BlogsTable = ({ data, columnList }: {
    data: PaginationType<AdminListBlogsType>
    columnList: string[]
}) => {
    const pagination = usePagination<AdminListBlogsType>(data)
    const accessToken = useAuthStore(state => state.accessToken)

    const deleteBlogItem = async (id: string) => {
        pagination.removeData(id)
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
                        pagination.results.map((blog, index) => (
                            <TableRow key={blog.id}>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{blog.created_at}</TableCell>
                                <TableCell>{blog.updated_at}</TableCell>
                                <TableCell>{blog.likes}</TableCell>
                                <TableCell>{blog.read}</TableCell>
                                <TableCell>{blog.comments}</TableCell>
                                <TableCell>
                                    <BlogsAction id={blog.id} deleteBlogItem={deleteBlogItem} />
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

export default BlogsTable
