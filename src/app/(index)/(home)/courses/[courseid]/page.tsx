import React from "react"
import { Button } from "@/components/ui/button"
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
import Image from "next/image"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { enrollCourse, getCookies } from "@/server/action"
import { DetailSingleCourseType } from "@/types"
import EnrollButton from "../EnrollButton"
// import { CircleCheckIcon } from "lucide-react"

const CoursePage = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const { access_token } = await getCookies(['access_token']);
    const { courseid } = await params;

    const response = await axios.request({
        url: `${process.env.BASE_API_URL}/course/detail-single-course/${courseid}/`,
        method: 'GET',
        headers: {
            authorization: `Bearer ${access_token}`
        }
    });
    const data: DetailSingleCourseType = response.data;

    return <section className="flex flex-col min-h-[100dvh]">
        <section className="w-full py-8 md:py-24 lg:py-32 flex flex-col items-center justify-center">
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
        <section className="w-full pb-12 md:pb-24 lg:pb-32 flex flex-col items-center justify-center">
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
                <EnrollButton id={data.id} access_token={access_token} />
            </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col items-center justify-center">
            <div className="container grid gap-6 px-4 md:px-6 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Chapter Details</h2>
                <div className="space-y-2 px-16">
                    <Accordion type="single" collapsible className="w-full">
                        {
                            ChapterDetails.map((item) => (
                                <AccordionItem key={item.id} value={item.id}>
                                    <AccordionTrigger>
                                        <div className="flex items-center justify-between w-full mr-24">
                                            <span>
                                                {item.title}
                                            </span>
                                            <span>
                                                {item.duration}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2 text-muted-foreground px-12 my-4">
                                            {
                                                item.details.map((detail, index) => (
                                                    <li className="flex items-start space-x-4" key={index}>
                                                        <CircleCheckIcon className="h-6 w-6 text-primary" />
                                                        <span>
                                                            {detail}
                                                        </span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </section> */}
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
            <div className="container grid gap-6 px-4 md:px-6 space-y-4">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Course Overview</h2>
                <p className="w-full text-muted-foreground text-md">
                    {data.long_description}
                </p>
            </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col items-center justify-center">
            <div className="container grid gap-6 px-4 md:px-6 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    <Accordion type="single" collapsible className="w-full">
                        {
                            FAQ.map((item) => (
                                <AccordionItem key={item.id} value={item.id}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent className="px-8">{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </section> */}
    </section>
}

export default CoursePage