"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleCheckIcon } from "lucide-react"

const CoursePage = () => {
    const FAQ = [
        {
            id: "1",
            question: "What is the refund policy?",
            answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the course, you can request a full refund within 30 days of your purchase."
        },
        {
            id: "2",
            question: "Do I need prior experience with React?",
            answer: "No, this course is designed for beginners as well as experienced developers. We'll start from the fundamentals and gradually build up your understanding of React."
        },
        {
            id: "3",
            question: "How long do I have access to the course materials?",
            answer: "You'll have lifetime access to the course materials, so you can learn at your own pace and revisit the content whenever you need to."
        },
        {
            id: "4",
            question: "Are there any additional costs or hidden fees?",
            answer: "No, the course price you see is the only cost. There are no additional fees or hidden charges."
        }
    ]

    const ChapterDetails = [
        {
            id: "1",
            title: "Introduction to React",
            duration: "1h 30m",
            details: [
                "What is React?",
                "Setting up a React project",
                "Creating your first React component",
                "Understanding JSX",
                "Handling events in React",
                "Working with props",
                "Using state in React components",
                "Introduction to React hooks"
            ]
        },
        {
            id: "2",
            title: "React Components and Props",
            duration: "2h 0m",
            details: [
                "Creating reusable components",
                "Passing props to components",
                "Using props to customize components",
                "Understanding prop types",
                "Composing components",
                "Conditional rendering in React",
                "List rendering in React",
                "Styling components with CSS"
            ]
        },
        {
            id: "3",
            title: "State Management with React",
            duration: "2h 30m",
            details: [
                "Understanding component state",
                "Updating state in React",
                "Using state to manage form data",
                "Lifting state up in React",
                "Managing state with hooks",
                "Using context for global state management",
                "Optimizing state updates in React"
            ]
        },
        {
            id: "4",
            title: "Routing and Navigation",
            duration: "1h 45m",
            details: [
                "Adding routing to a React application",
                "Navigating between routes",
                "Passing data between routes",
                "Implementing nested routes",
                "Creating a navigation menu",
                "Handling 404 errors",
                "Implementing redirects in React"
            ]
        },
        {
            id: "5",
            title: "Advanced React Concepts",
            duration: "3h 0m",
            details: [
                "Understanding React hooks",
                "Using custom hooks in React",
                "Managing side effects with hooks",
                "Optimizing performance with memoization",
                "Using context API in React",
                "Implementing lazy loading in React",
                "Testing React components",
                "Deploying a React application"
            ]
        }
    ]

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
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                        Mastering React: Build Modern Web Apps
                    </h1>
                    <p className="text-center text-muted-foreground">
                        Learn to build powerful, scalable, and maintainable web applications with React, the most popular
                        JavaScript library for building user interfaces.
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
                            <p className="text-2xl font-bold">$99</p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Duration</CardTitle>
                            <p className="text-2xl font-bold">12 weeks</p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
                            <p className="text-2xl font-bold">2023-07-14</p>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-2">
                        <CardHeader className="flex items-center justify-center">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Instructor</CardTitle>
                            <p className="text-2xl font-bold">Rahul Das</p>
                        </CardHeader>
                    </Card>
                </div>
                <Button className="w-full">Enroll Now</Button>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col items-center justify-center">
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
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
            <div className="container grid gap-6 px-4 md:px-6 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Course Overview</h2>
                <p className="w-full text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {`
                        In this comprehensive course, you'll dive deep into the world of React, the most popular JavaScript library for building user interfaces. You'll learn how to create powerful, scalable, and maintainable web applications from the ground up. Starting with the fundamentals, you'll explore React's core concepts, such as components, props, and state management. You'll then delve into more advanced topics, including hooks, context, and performance optimization, equipping you with the skills to build complex, feature-rich applications. Throughout the course, you'll work on hands-on projects, applying your newfound knowledge to real-world scenarios. You'll also learn about React's ecosystem and tooling, ensuring you're well-equipped to navigate the ever-evolving landscape of web development. By the end of this course, you'll have the confidence and expertise to build modern, responsive, and scalable web applications using React, a skill that is highly sought-after in the industry.
                        `}
                </p>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col items-center justify-center">
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
        </section>
    </section>
}

export default CoursePage