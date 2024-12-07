import { getCookies } from "@/server/action"
import * as React from "react"
import { ListCourseDashboardType } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import axios from "axios";

const PurchasedCoursesPage = async () => {
    const { access_token, user } = await getCookies(['access_token', 'user'])
    const response = await axios(`${process.env.BASE_API_URL}/course/purchased-courses/`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
    const data: ListCourseDashboardType[] = await response.data
    const columnsList = [
        "Course Name",
    ];

    const username = user ? JSON.parse(user).username : undefined

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
                                    <TableCell>{course.name}</TableCell>
                                    <TableCell>
                                        {
                                            username && <Link href={`/dashboard/${username}/study/${course.id}/`}>
                                                <Button>
                                                    Study
                                                </Button>
                                            </Link>
                                        }
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