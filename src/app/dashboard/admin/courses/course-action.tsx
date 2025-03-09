"use client"
import { useAuthStore } from "@/context/AuthStore";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useMutation from "@/hooks/useMutation";
import React from "react";
import LoadingButton from "@/components/loading-button";
import { clientUrlGenerator } from "@/utils";
import { ListCourseAdminDashboardType } from "@/types";
import Link from "next/link";

const CourseAction = ({ course, removeCourse, updateCourse }:
    {
        course: ListCourseAdminDashboardType,
        removeCourse: (courseid: string) => void,
        updateCourse: (courseid: string, data: Partial<ListCourseAdminDashboardType>) => void
    }) => {

    return (
        <div className="flex items-center gap-2">
            <Link href={`/dashboard/admin/courses/edit-course/${course.id}/`}>
                <Button>Edit</Button>
            </Link>
            <ToggleCourseComponent course={course} updateCourse={updateCourse} />
            <DeleteCourseComponent course={course} removeCourse={removeCourse} />
        </div>
    )
}

const ToggleCourseComponent = ({ course, updateCourse }:
    {
        course: ListCourseAdminDashboardType,
        updateCourse: (courseid: string, data: Partial<ListCourseAdminDashboardType>) => void
    }) => {
    const { mutate, onSuccess, mutationIsLoading } = useMutation();
    const accessToken = useAuthStore(state => state.accessToken);

    onSuccess((data: any) => {
        updateCourse(course.id, {
            status: course.status === 'published' ? 'draft' : 'published'
        });
    })

    const options = {
        url: clientUrlGenerator(`/course/toggle-course-status/${course.id}/`),
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
    }

    return <LoadingButton loading={mutationIsLoading} loadingText="Updating...">
        <Button onClick={async () => {
            accessToken && await mutate(options)
        }}>
            Toggle Status
        </Button>
    </LoadingButton>
}

const DeleteCourseComponent = ({ course, removeCourse }:
    {
        course: ListCourseAdminDashboardType,
        removeCourse: (courseid: string) => void
    }) => {
    const { mutate, onSuccess, mutationIsLoading } = useMutation();
    const accessToken = useAuthStore(state => state.accessToken);

    onSuccess((data: any) => {
        removeCourse(course.id);
    });


    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-course/${course.id}/`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
    }

    return <LoadingButton loading={mutationIsLoading} loadingText="Deleting...">
        <Button variant={'destructive'} onClick={async () => {
            accessToken && await mutate(options)
        }}>
            Delete
        </Button>
    </LoadingButton>
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