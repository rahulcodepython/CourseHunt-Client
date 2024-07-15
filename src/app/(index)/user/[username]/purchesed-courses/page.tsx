"use client"
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleCheckIcon } from "@/utils/icons"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

const PurchesedCoursesPage = () => {
    const ChapterDetails = [
        {
            id: "1",
            title: "Introduction to React",
            duration: "1h 30m",
            status: "done",
            details: [
                {
                    label: "What is React?",
                    status: "done"
                },
                {
                    label: "Setting up a React project",
                    status: "done"
                },
                {
                    label: "Creating your first React component",
                    status: "done"
                },
                {
                    label: "Understanding JSX",
                    status: "done"
                },
                {
                    label: "Handling events in React",
                    status: "done"
                },
                {
                    label: "Working with props",
                    status: "done"
                },
                {
                    label: "Using state in React components",
                    status: "done"
                },
                {
                    label: "Introduction to React hooks",
                    status: "done"
                }
            ]
        },
        {
            id: "2",
            title: "React Components and Props",
            duration: "2h 0m",
            status: "undone",
            details: [
                {
                    label: "Creating functional components",
                    status: "done"
                },
                {
                    label: "Creating class components",
                    status: "done"
                },
                {
                    label: "Passing props to components",
                    status: "done"
                },
                {
                    label: "Using props.children",
                    status: "undone"
                },
                {
                    label: "Using props destructuring",
                    status: "undone"
                },
                {
                    label: "Prop validation with PropTypes",
                    status: "undone"
                }
            ]
        },
        {
            id: "3",
            title: "State Management with React",
            duration: "2h 30m",
            status: "undone",
            details: [
                {
                    label: "Understanding component state",
                    status: "undone"
                },
                {
                    label: "Updating state in React",
                    status: "undone"
                },
                {
                    label: "Using state to manage form data",
                    status: "undone"
                },
                {
                    label: "Lifting state up in React",
                    status: "undone"
                },
                {
                    label: "Managing state with hooks",
                    status: "undone"
                },
                {
                    label: "Using context for global state management",
                    status: "undone"
                },
                {
                    label: "Optimizing state updates in React",
                    status: "undone"
                }
            ]
        },
        {
            id: "4",
            title: "Routing and Navigation",
            duration: "1h 45m",
            status: "undone",
            details: [
                {
                    label: "Setting up React Router",
                    status: "undone"
                },
                {
                    label: "Creating routes in React",
                    status: "undone"
                },
                {
                    label: "Navigating between routes",
                    status: "undone"
                },
                {
                    label: "Passing props to routes",
                    status: "undone"
                }
            ]
        },
        {
            id: "5",
            title: "Advanced React Concepts",
            duration: "3h 0m",
            status: "undone",
            details: [
                {
                    label: "Higher-order components",
                    status: "undone"
                },
                {
                    label: "Render props",
                    status: "undone"
                },
                {
                    label: "Using React hooks",
                    status: "undone"
                },
                {
                    label: "Using context API",
                    status: "undone"
                },
                {
                    label: "Error boundaries in React",
                    status: "undone"
                }
            ]
        }
    ]

    return <section className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Purchesed Course</CardTitle>
                    <CardDescription>View all purchesed course.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Enrollment Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Show Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Introduction to Web Development</TableCell>
                                <TableCell>2023-06-01</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Enrolled
                                    </Badge>
                                </TableCell>
                                <TableCell>2/20</TableCell>
                                <TableCell>
                                    <Button variant="secondary" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>React.js Fundamentals</TableCell>
                                <TableCell>2023-06-15</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Enrolled
                                    </Badge>
                                </TableCell>
                                <TableCell>2/20</TableCell>
                                <TableCell>
                                    <Button variant="secondary" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Data Structures and Algorithms</TableCell>
                                <TableCell>2023-07-01</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Completed
                                    </Badge>
                                </TableCell>
                                <TableCell>20/20</TableCell>
                                <TableCell>
                                    <Button variant="secondary" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Machine Learning for Beginners</TableCell>
                                <TableCell>2023-07-15</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Enrolled
                                    </Badge>
                                </TableCell>
                                <TableCell>2/20</TableCell>
                                <TableCell>
                                    <Button variant="secondary" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <section className="w-full flex flex-col items-center justify-center">
                <div className="container grid gap-6 space-y-4">
                    <div className="space-y-2">
                        <Accordion type="single" collapsible className="w-full">
                            {
                                ChapterDetails.map((item) => (
                                    <AccordionItem key={item.id} value={item.id}>
                                        <AccordionTrigger className={item.status == 'done' ? 'text-green-600' : 'text-primary'}>
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
                                                            <CircleCheckIcon className={`h-6 w-6 ${detail.status == 'done' ? 'text-green-600' : 'text-primary'}`} />
                                                            <span>
                                                                {detail.label}
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
        </div>
    </section>
}

export default PurchesedCoursesPage;