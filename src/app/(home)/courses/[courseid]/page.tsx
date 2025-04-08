import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DetailSingleCourseType } from "@/types"
import { getAccessToken, isAuthenticated } from "@/app/action"
import { serverUrlGenerator } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MarkdownContent from "@/components/markdown-content"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const CoursePage = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const access = await getAccessToken()
    const isAuth = await isAuthenticated()

    const { courseid } = await params;

    const response = await fetch(serverUrlGenerator(`/course/detail-single-course/${courseid}/`), isAuth ? {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${access}`
        }
    } : {}
    );
    const data: DetailSingleCourseType = await response.json();

    const content = [
        {
            id: "section-1",
            title: "Introduction",
            lectures: 10,
            duration: "1 hour",
            content: [
                {
                    id: "lecture-1-1",
                    title: "Introduction to the Course",
                    duration: "10 minutes",
                    type: "video",
                    description: "An overview of the course and what to expect."
                },
                {
                    id: "lecture-1-2",
                    title: "What You Will Learn",
                    duration: "5 minutes",
                    type: "video",
                    description: "A breakdown of the topics covered in the course."
                }
            ]
        },
        {
            id: "section-2",
            title: "Getting Started",
            lectures: 8,
            duration: "45 minutes",
            content: [
                {
                    id: "lecture-2-1",
                    title: "Setting Up Your Environment",
                    duration: "15 minutes",
                    type: "video",
                    description: "Guide to setting up the necessary tools and software."
                },
                {
                    id: "lecture-2-2",
                    title: "Understanding the Basics",
                    duration: "10 minutes",
                    type: "article",
                    description: "An introduction to fundamental concepts."
                }
            ]
        },
        {
            id: "section-3",
            title: "Core Concepts",
            lectures: 12,
            duration: "1 hour 30 minutes",
            content: [
                {
                    id: "lecture-3-1",
                    title: "Variables and Data Types",
                    duration: "12 minutes",
                    type: "video",
                    description: "Understanding different data types and variables."
                },
                {
                    id: "lecture-3-2",
                    title: "Control Flow and Loops",
                    duration: "15 minutes",
                    type: "video",
                    description: "Exploring if-else statements and loops."
                },
                {
                    id: "lecture-3-3",
                    title: "Functions and Scope",
                    duration: "20 minutes",
                    type: "video",
                    description: "Understanding how functions work and their scope."
                }
            ]
        },
        {
            id: "section-4",
            title: "Advanced Topics",
            lectures: 6,
            duration: "1 hour",
            content: [
                {
                    id: "lecture-4-1",
                    title: "Asynchronous Programming",
                    duration: "20 minutes",
                    type: "video",
                    description: "Explaining promises, async/await, and event loops."
                },
                {
                    id: "lecture-4-2",
                    title: "Performance Optimization",
                    duration: "25 minutes",
                    type: "article",
                    description: "Best practices for writing efficient code."
                }
            ]
        },
        {
            id: "section-5",
            title: "Final Project & Conclusion",
            lectures: 4,
            duration: "40 minutes",
            content: [
                {
                    id: "lecture-5-1",
                    title: "Building a Mini Project",
                    duration: "30 minutes",
                    type: "video",
                    description: "A hands-on project to apply what you've learned."
                },
                {
                    id: "lecture-5-2",
                    title: "Course Wrap-Up",
                    duration: "10 minutes",
                    type: "video",
                    description: "Final thoughts and next steps."
                }
            ]
        }
    ];

    return <section className="flex flex-col min-h-[100dvh] py-24 gap-6 mx-60">
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
                        {`${isAuth}`}
                    </p>
                </div>
            </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center">
            <div className="container grid gap-12 px-4 md:px-6">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Price</CardTitle>
                            <p className="text-2xl font-bold">
                                ${data.price}
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Duration</CardTitle>
                            <p className="text-2xl font-bold">
                                {data.duration}
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
                            <p className="text-2xl font-bold">
                                {data.created_at}
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Instructor</CardTitle>
                            <p className="text-2xl font-bold">
                                {data.created_by}
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Language</CardTitle>
                            <p className="text-2xl font-bold">
                                {
                                    data.language.map((lang, index) => {
                                        return <span key={index} className="uppercase text-base bg-gray-300 p-1 rounded-sm">{lang}</span>
                                    })
                                }
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
                            <p className="text-2xl font-bold">
                                {data.rating}
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Learners</CardTitle>
                            <p className="text-2xl font-bold">
                                {data.learners}
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Tags</CardTitle>
                            <p className="text-2xl font-bold flex gap-2">
                                {
                                    data.tags.map((tag, index) => {
                                        return <span key={index} className="uppercase text-base bg-gray-300 p-1 rounded-sm">{tag}</span>
                                    })
                                }
                            </p>
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
        <section className="w-full flex flex-col items-center justify-center mt-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                        Includes:
                    </CardTitle>
                </CardHeader>
                <CardContent className="ml-12">
                    <ul className="list-disc list-inside">
                        {
                            data.includes.map((include, index) => {
                                return <li key={index}>{include}</li>
                            })
                        }
                    </ul>
                </CardContent>
            </Card>
        </section>
        <section className="w-full flex flex-col items-center justify-center mt-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                        Requirements:
                    </CardTitle>
                </CardHeader>
                <CardContent className="ml-12">
                    <ul className="list-disc list-inside">
                        {
                            data.requirements.map((include, index) => {
                                return <li key={index}>{include}</li>
                            })
                        }
                    </ul>
                </CardContent>
            </Card>
        </section>
        <section className="w-full flex flex-col items-center justify-center mt-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                        Content:
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full border rounded-md">
                        {
                            content.map((item, index) => {
                                return <AccordionItem value={item.id} key={index}>
                                    <AccordionTrigger className="cursor-pointer hover:no-underline" align="left" classHeaderName="bg-gray-100" asChild>
                                        <div className="flex items-center justify-between w-full">
                                            <span>{item.title}</span>
                                            <div className="flex gap-1">
                                                <span>{item.lectures} lectures</span>
                                                <span>&#x2022;</span>
                                                <span>{item.duration}</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-8">
                                        <Accordion type="single" collapsible className="w-full border rounded-md">
                                            {
                                                item.content.map((content, jindex) => {
                                                    return <AccordionItem value={content.id} key={jindex}>
                                                        <AccordionTrigger className="cursor-pointer hover:no-underline" align="left" classHeaderName="bg-gray-100" asChild>
                                                            <div className="flex items-center justify-between w-full">
                                                                <span>{content.title}</span>
                                                                <div className="flex gap-1">
                                                                    <span>{content.duration}</span>
                                                                </div>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="p-4">
                                                            {content.description}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                })
                                            }
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>
                            })
                        }
                    </Accordion>
                </CardContent>
            </Card>
        </section>
        <section className="w-full flex flex-col items-center justify-center mt-8">
            <div className="container grid gap-6 px-4 md:px-6 space-y-4">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Description</h2>
                <MarkdownContent content={data.long_description} />
            </div>
        </section>
    </section>
}

export default CoursePage