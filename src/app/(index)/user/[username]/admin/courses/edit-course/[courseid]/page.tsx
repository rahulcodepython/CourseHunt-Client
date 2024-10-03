"use client"
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import CourseBasic from "./CourseBasic"
import CourseChapter from "./CourseChapter"
import CourseFAQ from "./CourseFAQ"

const CourseEditPage = ({ params }: { params: { courseid: string } }) => {
    const { courseid } = params

    const [tabValue, setTabValue] = React.useState<string>('course-basic')
    const [pageIndex, setPageIndex] = React.useState<number>(0)

    const tabsList: string[] = ['course-basic', 'course-chapter', 'course-faq']

    React.useEffect(() => {
        setTabValue(tabsList[pageIndex])
    }, [pageIndex])

    return <section className="py-6 flex flex-col gap-8">
        <div className="mx-4 sm:mx-8 md:mx-12">
            <h1 className="text-2xl font-semibold">
                Update Course
            </h1>
            <p>
                Update the course details
            </p>
        </div>
        <div className="container mx-auto flex flex-col justify-between gap-4">
            <Tabs defaultValue={tabsList[0]} value={tabValue} onValueChange={setTabValue} className="w-full h-[600px] overflow-y-scroll">
                <TabsContent value="course-basic" className="mt-0">
                    <CourseBasic setPageIndex={setPageIndex} courseid={courseid} />
                </TabsContent>
                <TabsContent value="course-chapter" className="mt-0">
                    <CourseChapter setPageIndex={setPageIndex} courseid={courseid} />
                </TabsContent>
                <TabsContent value="course-faq" className="mt-0">
                    <CourseFAQ courseid={courseid} />
                </TabsContent>
            </Tabs>
            <div className="flex items-center justify-around gap-6">
                <Button onClick={() => (pageIndex > 0) ? setPageIndex(pageIndex - 1) : null} disabled={pageIndex === 0} className="pl-2.5 items-center">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>
                {
                    !(pageIndex === tabsList.length - 1) && <Button onClick={() => (pageIndex < tabsList.length - 1) ? setPageIndex(pageIndex + 1) : null} disabled={pageIndex === tabsList.length - 1} className="pr-2.5 items-center">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    </section>
}

export default CourseEditPage