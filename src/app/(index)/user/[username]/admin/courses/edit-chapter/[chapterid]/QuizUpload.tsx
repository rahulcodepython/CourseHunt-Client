"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { FieldArray, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";

type initialValuesType = {
    quiz: {
        question: string,
        answers: {
            text: string,
            correct: boolean
        }[],
    }[]
}

const QuizUpload = () => {
    const initialValues: initialValuesType = {
        quiz: [
            {
                question: "",
                answers: [
                    { text: "", correct: false },
                    { text: "", correct: false },
                    { text: "", correct: false },
                    { text: "", correct: false }
                ]
            }
        ]
    }

    return <section className="py-12 md:py-24 bg-muted">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="grid gap-8">
                <div className="flex flex-col gap-8">
                    <h2 className="text-4xl font-bold">Quiz</h2>
                    <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
                        {
                            ({ values, handleChange, handleSubmit }) => {
                                return <Form>
                                    <FieldArray name="quiz">
                                        {
                                            ({ push, remove }) => {
                                                return <div className="space-y-8 mb-8">
                                                    {
                                                        values.quiz.map((item, qIndex) => {
                                                            return <div>
                                                                <Input name={`quiz[${qIndex}].question`} id="question" value={values.quiz[qIndex].question} onChange={handleChange} placeholder="Enter Questions" />
                                                                <div className="my-4 space-y-1">
                                                                    {
                                                                        values.quiz[qIndex].answers.map((answer, aIndex) => {
                                                                            return <div key={aIndex} className="flex items-center space-x-2">
                                                                                <Input name={`quiz[${qIndex}].answers[${aIndex}].text`} value={answer.text} onChange={handleChange} placeholder={'Enter Options ' + (aIndex + 1)} />
                                                                                <input type="radio" name="correct" checked={answer.correct} onChange={handleChange} />
                                                                                <Button onClick={() => remove(aIndex)}>Remove</Button>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className="flex justify-end w-full">
                                                                    <Button onClick={() => push({
                                                                        question: "",
                                                                        answers: [
                                                                            { text: "", correct: false },
                                                                            { text: "", correct: false },
                                                                            { text: "", correct: false },
                                                                            { text: "", correct: false }
                                                                        ]
                                                                    })}>
                                                                        Add Answer
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            }
                                        }
                                    </FieldArray>
                                    <div className="flex justify-end">
                                        <Button onSubmit={() => handleSubmit}>
                                            Add Question
                                        </Button>
                                    </div>
                                </Form>
                            }
                        }
                    </Formik>
                </div>
            </div>
        </div>
    </section>
}

export default QuizUpload;