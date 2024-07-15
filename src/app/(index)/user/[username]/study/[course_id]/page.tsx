"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type AnswersType = {
    [key: number]: number
}

const StudyPage = () => {
    const Answer_Already_Given = true
    const [quizScore, setQuizScore] = React.useState(0)
    const questions = [
        {
            question: "What is the purpose of the <head> tag in HTML?",
            answers: [
                { text: "It defines the main content of the document", correct: false },
                { text: "It defines the header of the document", correct: true },
                { text: "It defines the footer of the document", correct: false },
                { text: "It defines the navigation links of the document", correct: false }
            ],
            default: 0
        },
        {
            question: "What is the purpose of the <footer> tag in HTML?",
            answers: [
                { text: "It defines the main content of the document", correct: false },
                { text: "It defines the header of the document", correct: false },
                { text: "It defines the footer of the document", correct: true },
                { text: "It defines the navigation links of the document", correct: false }
            ],
            default: 2
        }
    ]
    const [answers, setAnswers] = React.useState<AnswersType>({})
    const handleQuizSubmit = () => {
        let marks = 0;
        for (let questionIndex in answers) {
            if (answers.hasOwnProperty(questionIndex)) {
                const answerIndex = answers[questionIndex];
                if (questions[questionIndex].answers[answerIndex].correct) {
                    marks += 1;
                }
            }
        }
        setQuizScore(marks)
    }

    return <div className="flex flex-col min-h-dvh bg-background">
        <header className="px-4 lg:px-6 py-6 border-b">
            <h1 className="text-4xl font-bold">Introduction to Web Development</h1>
        </header>
        <main className="flex-1 grid gap-8 px-4 lg:px-6 py-12">
            <section>
                <div className="aspect-video rounded-lg overflow-hidden">
                    <video controls className="w-full h-full object-cover" poster="/placeholder.svg">
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
                            In this course, you will learn the fundamentals of web development, including HTML, CSS, and JavaScript.
                            We'll cover topics such as responsive design, accessibility, and modern web development frameworks.
                        </p>
                        <h3>Topics Covered:</h3>
                        <ul>
                            <li>Introduction to HTML and CSS</li>
                            <li>JavaScript Basics</li>
                            <li>Responsive Design Principles</li>
                            <li>Accessibility Best Practices</li>
                            <li>Introduction to Web Frameworks</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-24 bg-muted">
                <div className="container mx-auto max-w-4xl px-4 md:px-6">
                    <div className="grid gap-8">
                        <div>
                            <h2 className="text-4xl font-bold">Quiz</h2>
                            <div className="mt-8 space-y-8">
                                {
                                    questions.map((question, qIndex) => (
                                        <div key={qIndex} className="grid gap-4">
                                            <p className="text-xl">{question.question}</p>
                                            <RadioGroup defaultValue={`${question.default}`} onValueChange={e => setAnswers(pre => {
                                                const newAnswers: AnswersType = { ...pre }
                                                newAnswers[qIndex] = parseInt(e)
                                                return newAnswers
                                            })}>
                                                {
                                                    question.answers.map((answer, aIndex) => {
                                                        return (
                                                            <div key={aIndex} className="flex items-center space-x-2">
                                                                <RadioGroupItem value={`${aIndex}`} id={`a-${qIndex}-${aIndex}`} disabled={Answer_Already_Given} />
                                                                <Label htmlFor={`a-${qIndex}-${aIndex}`} className="text-base">{answer.text}

                                                                </Label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </RadioGroup>
                                        </div>
                                    ))
                                }
                                <div className="flex justify-end">
                                    <Button onClick={handleQuizSubmit} disabled={Answer_Already_Given}>Submit Quiz</Button>
                                </div>
                                {
                                    quizScore !== null && <div className="text-center text-2xl font-bold">
                                        Your score: {quizScore}/{questions.length}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <footer className="flex items-center justify-between px-4 lg:px-6 py-6 border-t">
            <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
            >
                Previous
            </Link>
            <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
            >
                Next
            </Link>
        </footer>
    </div>
}

export default StudyPage;