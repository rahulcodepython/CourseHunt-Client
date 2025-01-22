import * as React from "react"
import { ListCourseAdminDashboardType, PaginationType } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getAccessToken } from "@/app/action";
import { serverUrlGenerator } from "@/utils";
import CourseTable from "./course-table";
import Link from "next/link";

const CoursesPage = async () => {
    const access_token = await getAccessToken()

    const response = await axios.get(serverUrlGenerator(`/course/admin-list-course/`), {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
    const data: PaginationType<ListCourseAdminDashboardType> = await response.data

    const columnList = [
        "Course Name",
        "Published Date",
        "Price",
        "Offer",
        "Status",
        "Action"
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
                    {
                        <Link href={`/dashboard/admin/courses/create-course/`}>
                            <Button>
                                Create Course
                            </Button>
                        </Link>
                    }
                </div>
            </CardHeader>
            <CourseTable data={data} columnList={columnList} />
        </Card>
    </div>
}

export default CoursesPage