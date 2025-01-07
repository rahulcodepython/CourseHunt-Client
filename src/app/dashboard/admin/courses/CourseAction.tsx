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
    const user = useAuthStore(state => state.user);
    const accessToken = useAuthStore(state => state.accessToken);

    return (
        <div className="flex items-center gap-2">
            <Link href={`/dashboard/admin/courses/edit-course/${courseid}/`}>
                <Button>Edit</Button>
            </Link>
            <ToggleCourseComponent courseid={courseid} accessToken={accessToken} />
            <DeleteCourseComponent courseid={courseid} removeCourse={removeCourse} accessToken={accessToken} />
        </div>
    )
}

const ToggleCourseComponent = ({ courseid, accessToken }:
    {
        courseid: string,
        accessToken: string | undefined
    }) => {
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

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

    return mutationIsLoading ? <Button disabled className="gap-2">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
    </Button> : <Button onClick={async () => {
        accessToken && await mutate(() => toggleCourseStatus(courseid, accessToken))
    }}>
        Toggle Status
    </Button>
}

const DeleteCourseComponent = ({ courseid, removeCourse, accessToken }:
    {
        courseid: string,
        removeCourse: (courseid: string) => void
        accessToken: string | undefined
    }) => {
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    courseid && removeCourse(courseid)
                    toast.success(mutationData.success);
                }
            }
        }
        handler();
    }, [mutationState])

    return mutationIsLoading ? <Button disabled className="gap-2">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
    </Button> : <Button variant={'destructive'} onClick={async () => {
        accessToken && await mutate(() => deleteCourse(courseid, accessToken))
    }}>Delete</Button>
}

const deleteCourse = async (courseid: string | undefined, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-course/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "DELETE",
    }
    return await axios.request(options)
}

const toggleCourseStatus = async (courseid: string | undefined, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/toggle-course-status/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
    }
    return await axios.request(options)
}

export default CourseAction;