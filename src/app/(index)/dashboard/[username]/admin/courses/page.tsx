import { getCookies } from "@/server/action"
import * as React from "react"
import { ListCourseDashboardType } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CourseTable from "./CourseTable";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import axios from "axios";

const CoursesPage = async () => {
    const { access_token, user } = await getCookies(['access_token', 'user'])
    const response = await axios.get(`${process.env.BASE_API_URL}/course/admin-list-course/`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
    const data: ListCourseDashboardType[] = await response.data
    const columnsList = [
        "Course Name",
        "Published Date",
        "Price",
        "Offer",
        "Status",
    ];

    const username = user ? JSON.parse(user).username : undefined

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
                    {
                        <Link href={`/dashboard/${username}/admin/courses/create-course/`}>
                            <Button>
                                Create Course
                            </Button>
                        </Link>
                    }
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