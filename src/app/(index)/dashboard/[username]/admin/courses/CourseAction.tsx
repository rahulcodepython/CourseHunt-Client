"use client"
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "next-view-transitions";
import { useAuthStore } from "@/context/AuthStore";
import { deleteCourse } from "@/server/action";

const CourseAction = ({ courseid, index, removeCourse }:
    {
        courseid: string,
        index: number,
        removeCourse: (courseid: string) => void
    }) => {
    const user = useAuthStore(state => state.user);
    const accessToken = useAuthStore(state => state.accessToken);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={`/dashboard/${user?.username}/admin/courses/edit-course/${courseid}/`}>
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    accessToken && deleteCourse(courseid, accessToken)
                        .then(() => removeCourse(courseid))
                }}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CourseAction;