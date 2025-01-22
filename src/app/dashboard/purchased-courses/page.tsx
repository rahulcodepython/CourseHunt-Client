import * as React from "react"
import { ListCourseDashboardType, PaginationType } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { getAccessToken } from "@/app/action";
import { serverUrlGenerator } from "@/utils";
import CourseTable from "./course-table";

const PurchasedCoursesPage = async () => {
    const access = await getAccessToken();
    const response = await axios(serverUrlGenerator(`/course/purchased-courses/`), {
        headers: {
            Authorization: 'Bearer ' + access
        }
    })
    const data: PaginationType<ListCourseDashboardType> = response.data

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
            <CourseTable data={data} columnList={['Course', 'Action']} accessToken={access} />
        </Card>
    </div>
}

export default PurchasedCoursesPage