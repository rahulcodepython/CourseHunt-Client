import { getCookies } from "@/server/action"
import * as React from "react"
import { ListCourseDashboardType, PaginationType } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import PurchasedCourseTable from "./PurchasedCourseTable";

const PurchasedCoursesPage = async () => {
    const { access_token } = await getCookies(['access_token'])
    const response = await axios(`${process.env.BASE_API_URL}/course/purchased-courses/`, {
        headers: {
            Authorization: 'Bearer ' + access_token
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
            <PurchasedCourseTable data={data} columnList={['Course']} />
        </Card>
    </div>
}

export default PurchasedCoursesPage