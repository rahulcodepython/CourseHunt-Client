import { getCookies } from "@/server/action"
import * as React from "react"
import { ListCourseDashboardType } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    const data: ListCourseDashboardType[] = response.data

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
            <CardContent className="flex items-center justify-center gap-4 flex-wrap">
                {
                    data.map((course, index) => {
                        return <Card key={index} className="w-full max-w-xs">
                            <CardHeader className="space-y-2">
                                <p>
                                    {course.name}
                                </p>
                                <Link href={`/dashboard/${username}/study/${course.id}`} className="w-full">
                                    <Button className="w-full">
                                        Study
                                    </Button>
                                </Link>
                            </CardHeader>
                        </Card>
                    })
                }
            </CardContent>
        </Card>
    </div>
}

export default PurchasedCoursesPage