import axios from "axios";
import { AllCourseType } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAccessToken } from "@/app/action";
import { serverUrlGenerator } from "@/utils";
import CourseForm from "../../course-form";

const EditCourse = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const access_token = await getAccessToken();
    const { courseid } = await params;

    const response = await axios.request({
        url: serverUrlGenerator(`/course/edit-course/${courseid}/`),
        method: 'GET',
        headers: {
            authorization: `Bearer ${access_token}`
        }
    });
    const data: AllCourseType = response.data;

    return (
        <Card className="mx-28 my-10">
            <CardHeader>
                <h2 className="text-xl font-semibold">Edit Course</h2>
            </CardHeader>
            <CardContent>
                <CourseForm defaultValues={data} courseid={courseid} access_token={access_token} />
            </CardContent>
        </Card>
    );
}

export default EditCourse;