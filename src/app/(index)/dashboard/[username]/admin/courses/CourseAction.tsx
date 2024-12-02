"use client"
import { Link } from "next-view-transitions";
import { useAuthStore } from "@/context/AuthStore";
import { deleteCourse } from "@/server/action";
import { Button } from "@/components/ui/button";

const CourseAction = ({ courseid, removeCourse }:
    {
        courseid: string,
        removeCourse: (courseid: string) => void
    }) => {
    const user = useAuthStore(state => state.user);
    const accessToken = useAuthStore(state => state.accessToken);

    return (
        <div className="flex items-center gap-2">
            <Link href={`/dashboard/${user?.username}/admin/courses/edit-course/${courseid}/`}>
                <Button>
                    Edit
                </Button>
            </Link>
            <Button variant={'destructive'} onClick={() => {
                accessToken && deleteCourse(courseid, accessToken)
                    .then(() => removeCourse(courseid))
            }}>Delete</Button>
        </div>
    )
}

export default CourseAction;