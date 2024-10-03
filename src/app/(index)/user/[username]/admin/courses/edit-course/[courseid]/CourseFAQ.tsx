"use client"
import * as React from "react"
import { CheckIcon, ChevronLeft, ChevronRight, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useMutation } from "@/hook"
import { useAuthStore } from "@/context/AuthStore"
import { toast } from "react-toastify"
import { useQuery } from "@tanstack/react-query"
import { CourseDataType } from "@/types"
import { useFieldArray, useForm } from "react-hook-form"

const CourseFAQ = ({ courseid }: { courseid: string }) => {
    const initialValues: CourseDataType['faq'][] = [
        {
            id: null,
            question: '',
            answer: '',
        },
    ];

    const accessToken = useAuthStore(state => state.accessToken)

    const { error: queryError, data: queryData, isRefetching: isQueryRefetching, isError, isLoading: isQueryLoading } = useQuery({
        queryKey: ['edit-faqs', courseid],
        queryFn: async () => {
            const response = await axios.get(`${process.env.BASE_API_URL}/course/edit-faq/${courseid}/`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            return response.data.data
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation()

    React.useEffect(() => {
        if (mutationIsError) {
            toast.error(mutationError)
        } else if (mutationData) {
            toast.success(mutationData.message)
        }
    }, [mutationState])

    React.useEffect(() => {
        isError && toast.error(queryError.message)
    }, [isError])

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CourseDataType>({
        defaultValues: {
            faq: isError ? initialValues : queryData,
        },
    });

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: "faq", // Name of the field array
    // });

    const onSubmit = async (values: CourseDataType) => {
        await mutate({
            url: `${process.env.BASE_API_URL}/course/edit-faq/${courseid}/`,
            data: values,
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        });
    };

    if (isQueryLoading) {
        return <div>Loading...</div>
    }

    if (isQueryRefetching) {
        return <div>Refetching...</div>
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
            <Accordion type="single" collapsible className="w-full">
                {
                    // fields.map((item, index) => (
                    // <AccordionItem value={'item-' + index} key={item.id ?? index}>
                    //     <AccordionTrigger>
                    //         <div className="grid grid-cols-12 gap-4 w-full mr-8">
                    //             <Input
                    //                 {...register(`faq.${index}.question`, { required: "Question is required" })}
                    //                 placeholder="Enter the question"
                    //                 className="col-span-10"
                    //             />
                    //             {errors?.faq?.[index]?.question && (
                    //                 <span className="text-red-600 col-span-12">
                    //                     {errors.faq[index]?.question?.message}
                    //                 </span>
                    //             )}
                    //             {/* Uncomment if remove button is needed */}
                    //             {/* <Button onClick={() => remove(index)} type="button" className="col-span-2 w-full">
                    //                         Remove FAQ
                    //                     </Button> */}
                    //         </div>
                    //     </AccordionTrigger>
                    //     <AccordionContent>
                    //         <Textarea
                    //             {...register(`faq.${index}.answer`, { required: "Answer is required" })}
                    //             placeholder="Enter the answer"
                    //             className="mt-1"
                    //         />
                    //         {errors?.faq?.[index]?.answer && (
                    //             <span className="text-red-600">
                    //                 {errors.faq[index]?.answer?.message}
                    //             </span>
                    //         )}
                    //     </AccordionContent>
                    // </AccordionItem>
                    // ))
                }
            </Accordion>
            {/* <Button onClick={() => append({ id: null, question: '', answer: '' })} type="button">
                New FAQ
            </Button> */}
        </div>
        <div className="flex justify-end items-center">
            {mutationIsLoading ? (
                <Button type="button">
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Saved Changes
                </Button>
            ) : (
                <Button type="submit">Save Changes</Button>
            )}
        </div>
    </form>
}

export default CourseFAQ