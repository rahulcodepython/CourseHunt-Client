import { getAccessToken } from "@/app/action";
import MarkdownContent from "@/components/markdown-content";
import { Button } from "@/components/ui/button";
import { StudyCourseType } from "@/types";
import { serverUrlGenerator } from "@/utils";
import axios from "axios";
import Link from "next/link";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";

const StudyPage = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const { courseid } = await params;
    const access = await getAccessToken();

    try {
        const response = await axios.request({
            url: serverUrlGenerator(`/course/study-single-course/${courseid}/`),
            method: 'GET',
            headers: {
                authorization: `Bearer ${access}`
            }
        });
        const data: StudyCourseType = response.data;

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

        return <section className="min-h-dvh bg-background">
            <div className="px-4 lg:px-6 py-6 border-b flex w-full justify-between">
                <h1 className="text-4xl font-bold">{data.name}</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer">
                            Show Lessons
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[80rem] max-h-[80vh] overflow-y-scroll">
                        <DialogHeader>
                            <DialogTitle>Course Lessons</DialogTitle>
                        </DialogHeader>
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
                                            {
                                                item.content.map((content, jindex) => {
                                                    return <div key={jindex} className="flex items-center w-full gap-4 hover:bg-accent p-4 rounded-md cursor-pointer">
                                                        <Checkbox />
                                                        <span>{content.title}</span>
                                                        <div className="flex-1 w-full text-end">
                                                            <span>{content.duration}</span>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                })
                            }
                        </Accordion>
                    </DialogContent>
                </Dialog>

            </div>
            <main className="grid gap-8 px-4 lg:px-6 py-12 cols-span-3">
                <section className="flex items-center justify-between gap-2">
                    <Button variant={'outline'} size={'icon'} className="cursor-pointer rounded-full">
                        <ArrowLeft size={16} />
                    </Button>
                    <div className="aspect-video rounded-lg overflow-hidden w-[1024px] h-[500px]">
                        <video controls className="w-full h-full object-cover" poster="/placeholder.svg" width={1024} height={500}>
                            <source src="/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <Button variant={'outline'} size={'icon'} className="cursor-pointer rounded-full">
                        <ArrowRight size={16} />
                    </Button>
                </section>
                <section className="py-8 px-4 mx-32">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg border bg-muted p-6 flex flex-col justify-between gap-4">
                            <h2 className="text-2xl font-bold">Course Notes</h2>
                            <p className="text-muted-foreground">Download the comprehensive course notes in PDF format.</p>
                            <Button className="">Download Notes</Button>
                        </div>
                        <div className="rounded-lg border bg-muted p-6 flex flex-col justify-between gap-4">
                            <h2 className="text-2xl font-bold">Presentation Slides</h2>
                            <p className="text-muted-foreground">
                                Access the course presentation slides in PowerPoint format.
                            </p>
                            <Button className="">Download Slides</Button>
                        </div>
                        <div className="rounded-lg border bg-muted p-6 flex flex-col justify-between gap-4">
                            <h2 className="text-2xl font-bold">Code Examples</h2>
                            <p className="text-muted-foreground">Explore the sample code used throughout the course.</p>
                            <Button className="">Download Code</Button>
                        </div>
                    </div>
                </section>
                <section className="w-full flex items-center justify-center border-t pt-4">
                    <div className="grid gap-6 px-4 md:px-6 space-y-4 mx-60">
                        <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Description</h2>
                        <MarkdownContent content={data.content} />
                    </div>
                </section>
            </main>
        </section>
    } catch (error) {
        return <div className="flex flex-col items-center justify-center mt-24 gap-4 container mx-auto">
            You {`haven't`} enrolled in this course yet.
            <Link href={`/dashboard/checkout/${courseid}`}>
                <Button>Go back to dashboard</Button>
            </Link>
        </div>
    }
}

export default StudyPage;