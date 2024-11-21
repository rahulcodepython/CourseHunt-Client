import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditCourseForm from './edit-course/[courseid]/EditCourseForm'
import { getCookies } from '@/server/action'

const CreateCourse = async () => {
    const { access_token } = await getCookies(['access_token'])

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
        <Dialog>
            <DialogTrigger>
                <p className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
                    Create Course
                </p>
            </DialogTrigger>
            <DialogContent className='h-[750px] overflow-y-scroll max-w-[800px]'>
                <DialogHeader>
                    <DialogTitle>Create a new course</DialogTitle>
                    <DialogDescription>
                        <EditCourseForm courseid={undefined} access_token={access_token} defaultValues={defaultData} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CreateCourse
