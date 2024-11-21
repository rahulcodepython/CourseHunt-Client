import { getCookies } from "@/server/action"
import * as React from "react"
import { AllCourseType } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CourseTable from "./CourseTable";
import CreateCourse from "./CreateCourse";

const CoursesPage = async () => {
    const cookie = await getCookies(['access_token'])
    const response = await fetch(`${process.env.BASE_API_URL}/course/admin-list-course/`, {
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
                            All Courses
                        </CardTitle>
                        <CardDescription>
                            List of all courses.
                        </CardDescription>
                    </div>
                    <CreateCourse />
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
                    <CourseTable fetchedData={data} />
                </Table>
            </CardContent>
        </Card>
    </div>
}

export default CoursesPage