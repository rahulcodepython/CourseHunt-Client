"use client"
import { Card, CardContent } from '@/components/ui/card'
import usePagination from '@/hooks/usePagination'
import { ListBlogsType, PaginationType } from '@/types'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const BlogsList = ({
    data,
    access,
    isAuth
}: {
    data: PaginationType<ListBlogsType>,
    access: string | undefined,
    isAuth: boolean
}) => {
    const pagination = usePagination<ListBlogsType>(data)

    return (
        <div className='flex flex-col gap-12 items-center'>
            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
                {
                    pagination.results.map((item, i) => {
                        return <div className="flex items-center justify-center w-full" key={i}>
                            <Card className="w-full">
                                <img width={200} height={200} src="/placeholder.svg" alt="Course thumbnail" className="rounded-t-lg object-cover w-full aspect-[2/1]" />
                                <CardContent className="p-6 grid gap-6">
                                    <div className="space-y-2">
                                        <Link href={`/blogs/${item.id}`} className="text-xl font-semibold hover:underline">
                                            {item.title}
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">Published:</p>
                                            <p className="text-xs">{item.created_at}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    })
                }
                {
                    pagination.isFetching ? <div className="w-full flex items-center justify-center lg:col-span-2 2xl:col-span-3">
                        Loading...
                    </div> : null
                }
            </div>
            {
                pagination.isNext && <div className="w-full flex items-center justify-center">
                    <Button onClick={() => pagination.loadMore(pagination.nextPageUrl, isAuth, access)} className='cursor-pointer'>
                        Load More
                    </Button>
                </div>
            }
        </div>
    )
}

export default BlogsList
