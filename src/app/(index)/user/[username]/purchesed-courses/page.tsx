import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const PurchesedCoursesPage = () => {
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
                                <TableHead>Student</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Enrollment Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">John Doe</div>
                                    <div className="text-sm text-muted-foreground">john@example.com</div>
                                </TableCell>
                                <TableCell>Introduction to Web Development</TableCell>
                                <TableCell>2023-06-01</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Enrolled
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Jane Smith</div>
                                    <div className="text-sm text-muted-foreground">jane@example.com</div>
                                </TableCell>
                                <TableCell>React.js Fundamentals</TableCell>
                                <TableCell>2023-06-15</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Enrolled
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Michael Johnson</div>
                                    <div className="text-sm text-muted-foreground">michael@example.com</div>
                                </TableCell>
                                <TableCell>Data Structures and Algorithms</TableCell>
                                <TableCell>2023-07-01</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Enrolled
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Emily Davis</div>
                                    <div className="text-sm text-muted-foreground">emily@example.com</div>
                                </TableCell>
                                <TableCell>Machine Learning for Beginners</TableCell>
                                <TableCell>2023-07-15</TableCell>
                                <TableCell>
                                    <Badge className="text-xs" variant="secondary">
                                        Enrolled
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </section>
}

export default PurchesedCoursesPage;