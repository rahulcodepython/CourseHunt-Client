import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAccessToken } from "@/app/action";
import CourseForm from "../course-form";

const CreateCourse = async () => {
    const access_token = await getAccessToken();

    const defaultData = {
        "id": "",
        "name": "",
        "short_description": "",
        "long_description": "",
        "price": 0,
        "offer": 0,
        "duration": "",
        "thumbnail": "",
        "status": "draft" as "published" | "draft",
        "videoURL": "",
        "notesURL": "",
        "presentationURL": "",
        "codeURL": "",
        "content": "",
        "created_at": ""
    }

    return (
        <Card className="mx-28 my-10">
            <CardHeader>
                <h2 className="text-xl font-semibold">Create Course</h2>
            </CardHeader>
            <CardContent>
                <CourseForm courseid={undefined} access_token={access_token} defaultValues={defaultData} />
            </CardContent>
        </Card>
    );
}

export default CreateCourse;