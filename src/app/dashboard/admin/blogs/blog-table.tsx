"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { AdminListBlogsType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/context/AuthStore'
import PaginationControl from '@/components/pagination-control'
import BlogAction from './blog-action'

const BlogTable = ({ data, columnList }: {
    data: PaginationType<AdminListBlogsType>
    columnList: string[]
}) => {
    const pagination = usePagination<AdminListBlogsType>(data, 2)
    const accessToken = useAuthStore(state => state.accessToken)

    const deleteBlogItem = async (id: string) => {
        pagination.removeData(id)
    }

    return (
        <CardContent>
            <Table className='table-auto w-full'>
                <TableHeader>
                    <TableRow>
                        {
                            columnList.map((col) => (
                                <TableHead key={col} className='first:w-[300px]'>
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
                        </TableRow> : pagination.results.map((blog, index) => (
                            <TableRow key={blog.id}>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{blog.created_at}</TableCell>
                                <TableCell>{blog.updated_at}</TableCell>
                                <TableCell>{blog.likes}</TableCell>
                                <TableCell>{blog.read}</TableCell>
                                <TableCell>{blog.comments}</TableCell>
                                <TableCell>
                                    <BlogAction id={blog.id} deleteBlogItem={deleteBlogItem} />
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

export default BlogTable
