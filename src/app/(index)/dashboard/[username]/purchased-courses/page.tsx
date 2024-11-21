import { getCookies } from "@/server/action"
import * as React from "react"
import { AllCourseType } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PurchasedCourseAction from "./PurchasedCourseAction";
// import CourseAction from "./CourseAction";

const PurchasedCoursesPage = async () => {
    const cookie = await getCookies(['access_token'])
    const response = await fetch(`${process.env.BASE_API_URL}/course/purchased-courses/`, {
        headers: {
            Authorization: 'Bearer ' + cookie.access_token
        }
    })
    const data: AllCourseType[] = await response.json()
    const columnsList = [
        "ID",
        "Course Name",
        "Published Date",
        "Duration",
        "Price",
        "Offer",
        "Status",
    ];

    return <div className="w-full p-4">
        <Card>
            <CardHeader className="flex-row justify-between">
                <div className="flex items-center justify-between py-4 w-full">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>
                            All Purchased Courses
                        </CardTitle>
                        <CardDescription>
                            List of all purchased courses.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                columnsList.map((col) => (
                                    <TableHead key={col}>
                                        {col}
                                    </TableHead>
                                ))
                            }
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.id}</TableCell>
                                    <TableCell>{course.name}</TableCell>
                                    <TableCell>{course.created_at}</TableCell>
                                    <TableCell>{course.duration}</TableCell>
                                    <TableCell>{course.price}</TableCell>
                                    <TableCell>{course.offer}</TableCell>
                                    <TableCell>{course.status}</TableCell>
                                    <TableCell>
                                        <PurchasedCourseAction courseid={course.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
}

export default PurchasedCoursesPage