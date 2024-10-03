"use client";
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizType } from "@/types";

const QuizUpload = () => {
    const { control, handleSubmit, register } = useForm<QuizType>({
        defaultValues: {
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
    });

    const { fields: quizFields, append } = useFieldArray({
        control,
        name: "quiz"
    });

    const handleFormSubmit = (data: QuizType) => {
        console.log(data);
    };

    return (
        <section className="py-12 md:py-24 bg-muted">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="grid gap-8">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-4xl font-bold">Quiz</h2>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="space-y-8 mb-8">
                                {quizFields.map((quizItem, qIndex) => (
                                    <div key={quizItem.id}>
                                        {/* Question input */}
                                        <Input
                                            {...register(`quiz.${qIndex}.question`)}
                                            placeholder="Enter Question"
                                        />
                                        <div className="my-4 space-y-1">
                                            {/* Answers field array */}
                                            <Controller
                                                control={control}
                                                name={`quiz.${qIndex}.answers`}
                                                render={({ field }) => (
                                                    <>
                                                        {field.value.map((answer, aIndex) => (
                                                            <div
                                                                key={aIndex}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Input
                                                                    {...register(
                                                                        `quiz.${qIndex}.answers.${aIndex}.text`
                                                                    )}
                                                                    placeholder={`Enter Option ${aIndex + 1}`}
                                                                />
                                                                {/* Radio Button */}
                                                                <Controller
                                                                    name={`quiz.${qIndex}.answers.${aIndex}.correct`}
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="radio"
                                                                            {...field}
                                                                            checked={field.value}
                                                                            value={String(field.value)}
                                                                        />
                                                                    )}
                                                                />
                                                                {/* Add the ability to remove an answer */}
                                                                <Button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        field.value.splice(aIndex, 1)
                                                                    }
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            />
                                        </div>

                                        {/* Button to append more answers */}
                                        <div className="flex justify-end w-full">
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    append({
                                                        question: "",
                                                        answers: [
                                                            { text: "", correct: false },
                                                            { text: "", correct: false },
                                                            { text: "", correct: false },
                                                            { text: "", correct: false }
                                                        ]
                                                    })
                                                }
                                            >
                                                Add Answer
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Submit Quiz</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuizUpload;
