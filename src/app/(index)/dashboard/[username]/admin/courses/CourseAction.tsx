"use client"
import { Link } from "next-view-transitions";
import { useAuthStore } from "@/context/AuthStore";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useMutation from "@/hooks/useMutation";
import React from "react";
import { toast } from "react-toastify";
import { ReloadIcon } from "@radix-ui/react-icons";

const CourseAction = ({ courseid, removeCourse }:
    {
        courseid: string,
        removeCourse: (courseid: string) => void
    }) => {
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const user = useAuthStore(state => state.user);
    const accessToken = useAuthStore(state => state.accessToken);

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    toast.success(mutationData.success);
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <div className="flex items-center gap-2">
            <Link href={`/dashboard/${user?.username}/admin/courses/edit-course/${courseid}/`}>
                <Button>Edit</Button>
            </Link>
            {
                mutationIsLoading ? <Button disabled className="gap-2">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <Button onClick={async () => {
                    accessToken && await mutate(() => toggleCourseStatus(courseid, accessToken))
                }}>
                    Toggle Status
                </Button>
            }
            {
                mutationIsLoading ? <Button disabled className="gap-2">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <Button variant={'destructive'} onClick={async () => {
                    accessToken && await mutate(() => deleteCourse(courseid, accessToken, removeCourse))
                }}>Delete</Button>
            }
        </div>
    )
}

const deleteCourse = async (courseid: string | undefined, access_token: string | undefined, removeCourse: (courseid: string) => void) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-course/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "DELETE",
    }
    await axios.request(options)
    courseid && removeCourse(courseid)
}

const toggleCourseStatus = async (courseid: string | undefined, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/toggle-course-status/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
    }
    await axios.request(options)
}

export default CourseAction;