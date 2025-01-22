"use client"
import { Card, CardContent } from '@/components/ui/card'
import usePagination from '@/hooks/usePagination'
import { ListCourseType, PaginationType } from '@/types'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import Link from 'next/link'

const CourseList = ({
    data
}: {
    data: PaginationType<ListCourseType>
}) => {
    const pagination = usePagination<ListCourseType>(data)

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const accessToken = useAuthStore((state) => state.accessToken)

    return (
        <div className='flex flex-col gap-12 items-center'>
            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
                {
                    pagination.isFetching ? <div className="w-full flex items-center justify-center">
                        Loading...
                    </div> : pagination.results.map((item, i) => {
                        return <div className="flex items-center justify-center w-full" key={i}>
                            <Card className="w-full max-w-md">
                                <Image width={200} height={200} src="/placeholder.svg" alt="Course thumbnail" className="rounded-t-lg object-cover w-full aspect-[2/1]" />
                                <CardContent className="p-6 grid gap-6">
                                    <div className="space-y-2">
                                        <Link href={`/courses/${item.id}`} className="text-xl font-semibold hover:underline">
                                            {item.name}
                                        </Link>
                                        <p className="text-muted-foreground">
                                            {item.short_description}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">Price:</p>
                                            <p className="text-xs">
                                                {item.price}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">Published:</p>
                                            <p className="text-xs">{item.created_at}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">Duration:</p>
                                            <p>{item.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        {
                                            isAuthenticated ? item.enrolled ? <Link href={`/dashboard/study/${item.id}/`} className='w-full'>
                                                <Button className='w-full'>Study</Button>
                                            </Link> : <Button className="w-full">
                                                <Link href={`/dashboard/checkout/${item.id}`}>Enroll Now</Link>
                                            </Button> : <Button variant={'destructive'} className='w-full'>
                                                <Link href="/auth/login">Login to enroll</Link>
                                            </Button>
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    })
                }
            </div>
            {
                pagination.isNext && <div className="w-full flex items-center justify-center">
                    <Button onClick={() => pagination.loadMore(pagination.nextPageUrl, isAuthenticated, accessToken)}>
                        Load More
                    </Button>
                </div>
            }
        </div>
    )
}

export default CourseList
