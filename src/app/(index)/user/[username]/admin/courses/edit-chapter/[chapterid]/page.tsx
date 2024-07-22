"use client"
import { useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import VideoUpload from "@/app/(index)/user/[username]/admin/courses/edit-chapter/[chapterid]/VideoUpload";
import ResourcesUpload from "./ResourcesUpload";
import ContentUpload from "./ContentUpload";
import QuizUpload from "./QuizUpload";

const EditChapterPage = () => {
    const [chapter, setChapter] = React.useState<number>(1)
    const [lesson, setLesson] = React.useState<number>(1)

    const searchParams = useSearchParams()

    React.useEffect(() => {
        const query_chapter = searchParams.get('chapter')
        const query_lesson = searchParams.get('lesson')

        if (query_chapter) {
            setChapter(parseInt(query_chapter))
        }
        if (query_lesson) {
            setLesson(parseInt(query_lesson))
        }
    }, [])

    return <div className="flex flex-col min-h-dvh bg-background">
        <header className="px-4 lg:px-6 py-6 border-b">
            <h1 className="text-4xl font-bold">Introduction to Web Development</h1>
        </header>
        <main className="flex-1 grid gap-8 px-4 lg:px-6 py-12">
            <VideoUpload />
            <ResourcesUpload />
            <ContentUpload />
            <QuizUpload />
        </main>
        <footer className="flex items-center justify-between px-4 lg:px-6 py-6 border-t">
            <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
            >
                Previous
            </Link>
            <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
            >
                Next
            </Link>
        </footer>
    </div>
}

export default EditChapterPage;