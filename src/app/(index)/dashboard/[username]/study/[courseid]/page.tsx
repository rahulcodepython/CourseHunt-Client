import { Button } from "@/components/ui/button";
import { getCookies } from "@/server/action";
import { StudyCourseType } from "@/types";
import axios from "axios";
import Link from "next/link";
import React from "react";

const StudyPage = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const { courseid } = await params;
    const { access_token, user } = await getCookies(['access_token', 'user']);

    const username = user ? JSON.parse(user).username : undefined;

    try {
        const response = await axios.request({
            url: `${process.env.BASE_API_URL}/course/study-single-course/${courseid}/`,
            method: 'GET',
            headers: {
                authorization: `Bearer ${access_token}`
            }
        });
        const data: StudyCourseType = response.data;


        return <div className="flex flex-col min-h-dvh bg-background">
            <header className="px-4 lg:px-6 py-6 border-b">
                <h1 className="text-4xl font-bold">{data.name}</h1>
            </header>
            <main className="flex-1 grid gap-8 px-4 lg:px-6 py-12">
                <section className="flex items-center justify-center">
                    <div className="aspect-video rounded-lg overflow-hidden w-[1024px] h-[500px]">
                        <video controls className="w-full h-full object-cover" poster="/placeholder.svg" width={1024} height={500}>
                            <source src="/video.mp4" type="video/mp4" />
                        </video>
                    </div>
                </section>
                <section className="py-12 md:py-16 lg:py-20">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-lg border bg-muted p-6">
                                <h2 className="text-2xl font-bold">Course Notes</h2>
                                <p className="mt-2 text-muted-foreground">Download the comprehensive course notes in PDF format.</p>
                                <Button className="mt-4">Download Notes</Button>
                            </div>
                            <div className="rounded-lg border bg-muted p-6">
                                <h2 className="text-2xl font-bold">Presentation Slides</h2>
                                <p className="mt-2 text-muted-foreground">
                                    Access the course presentation slides in PowerPoint format.
                                </p>
                                <Button className="mt-4">Download Slides</Button>
                            </div>
                            <div className="rounded-lg border bg-muted p-6">
                                <h2 className="text-2xl font-bold">Code Examples</h2>
                                <p className="mt-2 text-muted-foreground">Explore the sample code used throughout the course.</p>
                                <Button className="mt-4">Download Code</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container px-4 md:px-6 pb-12 md:pb-16 lg:pb-20">
                    <div className="space-y-12">
                        <h2 className="text-4xl font-bold">Course Content</h2>
                        <div className="prose max-w-none">
                            <p>
                                {data.content}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    } catch (error) {
        return <div className="flex flex-col items-center justify-center mt-24 gap-4 container mx-auto">
            You {`haven't`} enrolled in this course yet.
            {
                username && <Link href={`/dashboard/${username}/checkout/${courseid}`}>
                    <Button>Go back to dashboard</Button>
                </Link>
            }
        </div>
    }
}

export default StudyPage;