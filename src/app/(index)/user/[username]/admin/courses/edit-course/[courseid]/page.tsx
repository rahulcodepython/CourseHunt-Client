"use client"
import * as React from "react"
import { CheckIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Field, FieldArray, Form, Formik, FormikErrors } from "formik"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useFnCall } from "@/hook"
import { HMSToSeconds, SecondsToHMS } from "@/utils"
import { useAuthStore } from "@/context/AuthStore"
import { toast } from "react-toastify"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"

export type CourseDataType = {
    basic: {
        id: string | null
        name: string
        description: string
        overview: string
        duration: number
        chapter: number
        price: number
        offer: number
        cupon_code: string | null
    }
    chapters: {
        id: string | null,
        name: string,
        duration: number,
        lessons: {
            id: string | null,
            name: string
        }[]
    }
    faq: { id: string | null, question: string, answer: string }
}

const CourseEditPage = ({ params }: { params: { courseid: string } }) => {
    const { courseid } = params

    const [tabValue, setTabValue] = React.useState<string>('course-basic')
    const [pageIndex, setPageIndex] = React.useState<number>(0)

    const tabsList: string[] = ['course-basic', 'course-chapter', 'course-faq']

    React.useEffect(() => {
        setTabValue(tabsList[pageIndex])
    }, [pageIndex])

    return <section className="py-6 flex flex-col gap-8">
        <div className="mx-4 sm:mx-8 md:mx-12">
            <h1 className="text-2xl font-semibold">
                Update Course
            </h1>
            <p>
                Update the course details
            </p>
        </div>
        <div className="container mx-auto flex flex-col justify-between gap-4">
            <Tabs defaultValue={tabsList[0]} value={tabValue} onValueChange={setTabValue} className="w-full h-[600px] overflow-y-scroll">
                <TabsContent value="course-basic" className="mt-0">
                    <CourseBasic setPageIndex={setPageIndex} courseid={courseid} />
                </TabsContent>
                <TabsContent value="course-chapter" className="mt-0">
                    <CourseChapter setPageIndex={setPageIndex} courseid={courseid} />
                </TabsContent>
                <TabsContent value="course-faq" className="mt-0">
                    <CourseFAQ courseid={courseid} />
                </TabsContent>
            </Tabs>
            <div className="flex items-center justify-around gap-6">
                <Button onClick={() => (pageIndex > 0) ? setPageIndex(pageIndex - 1) : null} disabled={pageIndex === 0} className="pl-2.5 items-center">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>
                {
                    pageIndex === tabsList.length - 1 ? <Button onClick={() => {
                        // console.log({
                        //     faq: courseFAQData
                        // })
                    }}>
                        Create Course
                    </Button> : <Button onClick={() => (pageIndex < tabsList.length - 1) ? setPageIndex(pageIndex + 1) : null} disabled={pageIndex === tabsList.length - 1} className="pr-2.5 items-center">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    </section>
}

const CourseBasic = ({ setPageIndex, courseid }:
    {
        setPageIndex: React.Dispatch<React.SetStateAction<number>>,
        courseid: string
    }) => {
    const initialValues: CourseDataType['basic'] = {
        id: null,
        name: '',
        description: '',
        overview: '',
        duration: 0,
        chapter: 0,
        price: 0,
        offer: 0,
        cupon_code: '',
    }

    const accessToken = useAuthStore(state => state.accessToken)

    const { isLoading: loadingFnCall, isError: isErrorFnCall, error: errorFnCall, data: dataFnCall, call } = useFnCall(async values => {
        const response = await axios.post(`${process.env.BASE_API_URL}/course/edit-course/${courseid}/`, values, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        return response.data
    })

    const { error: queryError, data: queryData, isRefetching: isQueryRefetching, isError, isLoading: isQueryLoading } = useQuery({
        queryKey: ['edit-courses', courseid],
        queryFn: async () => {
            const response = await axios.get(`${process.env.BASE_API_URL}/course/edit-course/${courseid}/`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            return response.data
        }
    })

    React.useEffect(() => {
        if (isErrorFnCall) {
            toast.error(errorFnCall)
        } else if (dataFnCall) {
            toast.success(dataFnCall.message)
        }
    }, [dataFnCall, isErrorFnCall, errorFnCall])

    React.useEffect(() => {
        isError && toast.error(queryError.message)
    }, [isError])

    if (isQueryLoading) {
        return <div>Loading...</div>
    }

    if (isQueryRefetching) {
        return <div>Refetching...</div>
    }

    return <Formik initialValues={isError ? initialValues : queryData} onSubmit={async values => {
        let updatedValues = { ...values }
        updatedValues.cupon_code = values.cupon_code === '' ? null : values.cupon_code

        await call(updatedValues)
        setPageIndex(pre => pre + 1)
    }}>
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
            return <Form className="grid grid-cols-1 gap-4">
                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Course Name</Label>
                    <Input type="text" id="name" name="name" placeholder="Enter course name" className="mt-1" value={values.name} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="description" className="block text-sm font-medium text-muted-foreground">Description</Label>
                    <Textarea className="mt-1" value={values.description} onChange={handleChange} id="description" placeholder="Enter short description about course">
                    </Textarea>
                </div>
                <div>
                    <Label htmlFor="overview" className="block text-sm font-medium text-muted-foreground">Overview</Label>
                    <Textarea className="mt-1" value={values.overview} onChange={handleChange} id="overview" placeholder="Write about the course">
                    </Textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="duration" className="block text-sm font-medium text-muted-foreground">Duration</Label>
                        <DurationField duration={values.duration} setFieldValue={setFieldValue} fieldName={'duration'} />
                    </div>
                    <div>
                        <Label htmlFor="chapter" className="block text-sm font-medium text-muted-foreground">Chapter</Label>
                        <Input type="number" id="chapter" name="chapter" placeholder="Enter chapter" className="mt-1" value={values.chapter} onChange={handleChange} min={values.chapter === 0 ? 1 : values.chapter} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="price" className="block text-sm font-medium text-muted-foreground">Price</Label>
                        <Input type="number" id="price" name="price" placeholder="Enter price" className="mt-1" value={values.price} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="offer" className="block text-sm font-medium text-muted-foreground">Offer</Label>
                        <Input type="number" id="offer" name="offer" placeholder="Enter offer" className="mt-1" value={values.offer} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1">
                    <div>
                        <Label htmlFor="cuponCode" className="block text-sm font-medium text-muted-foreground">Cupon Code</Label>
                        <Input type="text" id="cuponCode" name="cupon_code" placeholder="Enter cupon code" className="mt-1" value={values.cupon_code ?? ''} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-end">
                    {
                        loadingFnCall ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button onClick={() => handleSubmit} type="submit">
                            Save Changes
                        </Button>
                    }
                </div>
            </Form>
        }}
    </Formik>
}

const CourseChapter = ({ setPageIndex, courseid }:
    {
        setPageIndex: React.Dispatch<React.SetStateAction<number>>,
        courseid: string
    }) => {
    const initialValues: CourseDataType['chapters'][] = [{
        id: null,
        name: '',
        duration: 0,
        lessons: []
    }]

    const accessToken = useAuthStore(state => state.accessToken)

    const { error: queryError, data: queryData, isRefetching: isQueryRefetching, isError, isLoading: isQueryLoading } = useQuery({
        queryKey: ['edit-chapters', courseid],
        queryFn: async () => {
            const response = await axios.get(`${process.env.BASE_API_URL}/course/edit-chapter/${courseid}/`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            return response.data.data
        }
    })

    const { isLoading: loadingFnCall, isError: isErrorFnCall, error: errorFnCall, data: dataFnCall, call } = useFnCall(async (values) => {
        const response = await axios.post(`${process.env.BASE_API_URL}/course/edit-chapter/${courseid}/`, values, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        return response.data
    })

    React.useEffect(() => {
        if (isErrorFnCall) {
            toast.error(errorFnCall)
        } else if (dataFnCall) {
            toast.success(dataFnCall.message)
        }
    }, [dataFnCall, isErrorFnCall, errorFnCall])

    React.useEffect(() => {
        isError && toast.error(queryError.message)
    }, [isError])

    if (isQueryLoading) {
        return <div>Loading...</div>
    }

    if (isQueryRefetching) {
        return <div>Refetching...</div>
    }

    return <Formik initialValues={{
        chapters: isError ? initialValues : queryData
    }} onSubmit={async values => {
        await call(values.chapters)
        setPageIndex(pre => pre + 1)
    }}>
        {
            ({ values, handleSubmit, handleChange, setFieldValue }) => {
                return <Form>
                    <FieldArray name="chapters">
                        {
                            ({ push, remove }) => {
                                return <Accordion type="single" collapsible className="w-full">
                                    {
                                        values.chapters.map((_: CourseDataType['chapters'], i: number) => {
                                            return <AccordionItem key={i} value={`item-${i + 1}`} className="last:border-b-0">
                                                <AccordionTrigger className="hover:no-underline">
                                                    <div className="grid grid-cols-3 gap-4 w-full mr-4">
                                                        <Input name={`chapters.${i}.name`} placeholder='Chapter Name' value={values.chapters[i].name} onChange={handleChange} className="col-span-2" />
                                                        <DurationField duration={values.chapters[i].duration} setFieldValue={setFieldValue} fieldName={`chapters.${i}.duration`} />
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6">
                                                    <FieldArray name={`chapters.${i}.lessons`}>
                                                        {({ push, remove }) => {
                                                            return <div className="grid grid-cols-1 gap-4">
                                                                {
                                                                    values.chapters[i].lessons.map((_: { id: string | null, name: string }, j: number) => {
                                                                        return <div key={j} className="grid grid-cols-12 gap-6">
                                                                            <Input name={`chapters.${i}.lessons[${j}].name`} value={values.chapters[i].lessons[j].name} placeholder="Enter Lessons" onChange={handleChange} className="col-span-10" />
                                                                            {/* <Button onClick={() => {
                                                                                remove(j)
                                                                            }} type="button" className="w-full col-span-2">
                                                                                Remove Lesson
                                                                            </Button> */}
                                                                        </div>
                                                                    })
                                                                }
                                                                <Button onClick={() => push({ id: null, name: "" })} type="button">
                                                                    New Lesson
                                                                </Button>
                                                            </div>
                                                        }}
                                                    </FieldArray>
                                                </AccordionContent>
                                            </AccordionItem>
                                        })
                                    }
                                    <div className="flex justify-end mt-4">
                                        {
                                            initialValues.length > 0 && loadingFnCall ? <Button disabled className="gap-2">
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </Button> : <Button onClick={() => handleSubmit} type="submit">
                                                Save Changes
                                            </Button>
                                        }
                                    </div>
                                </Accordion>
                            }
                        }
                    </FieldArray>
                </Form>
            }
        }
    </Formik>
}

const DurationField = ({ duration, setFieldValue, fieldName }:
    { duration: number, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<any>>, fieldName: string }) => {
    const [time, setTime] = React.useState<{ hours: number, minutes: number, seconds: number }>({ hours: 0, minutes: 0, seconds: 0 })

    React.useEffect(() => {
        const { hours, minutes, seconds } = SecondsToHMS(duration)
        setTime({
            hours,
            minutes,
            seconds
        })
    }, [])

    React.useEffect(() => {
        const { hours, minutes, seconds } = time
        setFieldValue(fieldName, HMSToSeconds(hours, minutes, seconds))
    }, [time])

    return <div className="grid grid-cols-3 gap-2">
        <Input type="number" id="hours" name="hours" placeholder="Hours" className="mt-1" value={time.hours} onChange={e => setTime(pre => {
            return {
                ...pre,
                hours: parseInt(e.target.value)
            }
        })} />
        <Input type="number" id="minutes" name="minutes" placeholder="Minutes" className="mt-1" value={time.minutes} onChange={e => setTime(pre => {
            return {
                ...pre,
                minutes: parseInt(e.target.value)
            }
        })} />
        <Input type="number" id="seconds" name="seconds" placeholder="Seconds" className="mt-1" value={time.seconds} onChange={e => setTime(pre => {
            return {
                ...pre,
                seconds: parseInt(e.target.value)
            }
        })} />
    </div>
}

const CourseFAQ = ({ courseid }: { courseid: string }) => {
    const initialValues: CourseDataType['faq'][] = [{
        id: null,
        question: '',
        answer: ''
    }]

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
        }
    })

    const { isLoading: loadingFnCall, isError: isErrorFnCall, error: errorFnCall, data: dataFnCall, call } = useFnCall(async (values) => {
        const response = await axios.post(`${process.env.BASE_API_URL}/course/edit-faq/${courseid}/`, values, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        return response.data
    })

    React.useEffect(() => {
        if (isErrorFnCall) {
            toast.error(errorFnCall)
        } else if (dataFnCall) {
            toast.success(dataFnCall.message)
        }
    }, [dataFnCall, isErrorFnCall, errorFnCall])

    React.useEffect(() => {
        isError && toast.error(queryError.message)
    }, [isError])

    if (isQueryLoading) {
        return <div>Loading...</div>
    }

    if (isQueryRefetching) {
        return <div>Refetching...</div>
    }

    return <Formik initialValues={{
        faq: isError ? initialValues : queryData
    }} onSubmit={async values => {
        await call(values);
    }}>
        {
            ({ values, handleSubmit, handleChange }) => {
                return <Form className="space-y-8">
                    <FieldArray name="faq">
                        {
                            ({ push, remove }) => {
                                return <div className="grid gap-4">
                                    <Accordion type="single" collapsible className="w-full">
                                        {
                                            values.faq.map((item: CourseDataType['faq'], i: number) => {
                                                return <AccordionItem value={'item-' + i} key={i}>
                                                    <AccordionTrigger>
                                                        <div className="grid grid-cols-12 gap-4 w-full mr-8">
                                                            <Input value={item.question} onChange={handleChange} name={`faq.${i}.question`} placeholder="Enter the question" className="col-span-10" />
                                                            {/* <Button onClick={() => remove(i)} type="button" className="col-span-2 w-full">
                                                                Remove FAQ
                                                            </Button> */}
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <Textarea value={item.answer} onChange={handleChange} name={`faq.${i}.answer`} placeholder="Enter the answer" />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            })
                                        }
                                    </Accordion>
                                    <Button onClick={() => push({ id: null, question: '', answer: '' })} type="button">
                                        New FAQ
                                    </Button>
                                </div>
                            }
                        }
                    </FieldArray>
                    <div className="flex justify-end items-center">
                        {
                            loadingFnCall ? <Button type="button">
                                <CheckIcon className="h-4 w-4 mr-2" />
                                Saved Changes
                            </Button> : <Button
                                onClick={() => handleSubmit} type="submit">
                                Save Changes
                            </Button>
                        }
                    </div>
                </Form>
            }
        }
    </Formik>
}

export default CourseEditPage