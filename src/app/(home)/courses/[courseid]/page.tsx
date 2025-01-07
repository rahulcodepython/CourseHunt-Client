import React from "react"
import Image from "next/image"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { DetailSingleCourseType } from "@/types"
import Markdown from "react-markdown"
import { getAccessToken } from "@/app/action"
import { getUser, isAuthenticated, urlGenerator } from "@/utils"
import { Button } from "@/components/ui/button"
import { Link } from "next-view-transitions"

const CoursePage = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const access = await getAccessToken()
    const isAuth = isAuthenticated(access)
    const user = getUser(access)

    const { courseid } = await params;

    const response = await fetch(urlGenerator(`/course/detail-single-course/${courseid}/`), isAuth ? {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    } : {}
    );
    const data: DetailSingleCourseType = await response.json();

    return <section className="flex flex-col min-h-[100dvh] py-24 gap-6">
        <section className="w-fullflex flex-col items-center justify-center">
            <div className="container px-4 md:px-6 space-y-4">
                <div className="space-y-2 flex items-center justify-center flex-col gap-10">
                    <div className="w-[800px]">
                        <Image
                            src="/placeholder.svg"
                            width="200"
                            height="200"
                            alt="Course Image"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                        />
                    </div>
                    <h1 className="text-lg font-bold tracking-tighter sm:text-2xl md:text-4xl">
                        {data.name}
                    </h1>
                    <p className="text-center text-muted-foreground">
                        {data.short_description}
                    </p>
                </div>
            </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center">
            <div className="container grid gap-12 px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Price</CardTitle>
                            <p className="text-2xl font-bold">${data.price}</p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Duration</CardTitle>
                            <p className="text-2xl font-bold">{data.duration}</p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
                            <p className="text-2xl font-bold">{data.created_at}</p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Instructor</CardTitle>
                            <p className="text-2xl font-bold">Rahul Das</p>
                        </CardHeader>
                    </Card>
                </div>
                {

                    isAuth ? data.enrolled ? <Link href={`/dashboard/study/${data.id}/`} className='w-full'>
                        <Button className='w-full'>Study</Button>
                    </Link> : <Button className="w-full">
                        <Link href={`/dashboard/checkout/${data.id}`}>Enroll Now</Link>
                    </Button> : <Button variant={'destructive'} className='w-full'>
                        <Link href="/auth/login">Login to enroll</Link>
                    </Button>

                }
            </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center">
            <div className="container grid gap-6 px-4 md:px-6 space-y-4">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Course Overview</h2>
                <div className="prose prose-sm max-w-none">
                    <Markdown>
                        {data.long_description}
                    </Markdown>
                </div>
            </div>
        </section>
    </section>
}

export default CoursePage