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
import { Field, FieldArray, Form, Formik } from "formik"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from "next/navigation"

type CourseBasicDataType = {
    name: string
    description: string
    overview: string
    duration: number
    chapter: number
    price: number
    offer: number
    cuponCode: string
    instructor: string
}
type CourseChapterDataType = { label: string, lessons: string[] }

type CourseFAQDataType = {
    question: string
    answer: string
}
type FormCourseFAQDataType = {
    faq: { question: string, answer: string }[]
}
export type CourseDataType = {
    basic: {
        name: string
        description: string
        overview: string
        duration: number
        chapter: number
        price: number
        offer: number
        cuponCode: string
        instructor: string
    }
    chapters: { label: string, lessons: string[] }[]
    faq: { question: string, answer: string }[]
}

const defaultValue: CourseDataType = {
    basic: {
        name: 'Course 1',
        description: 'Course Description',
        overview: 'Course Overview',
        duration: 10,
        chapter: 2,
        price: 100,
        offer: 0,
        cuponCode: 'Cupon Code',
        instructor: 'Instructor',
    },
    chapters: [
        {
            label: 'Chapter 1',
            lessons: ['Lesson 1', 'Lesson 2']
        },
        {
            label: 'Chapter 2',
            lessons: ['Lesson 1', 'Lesson 2']
        }
    ],
    faq: [
        {
            question: 'Question 1',
            answer: 'Answer 1'
        },
        {
            question: 'Question 2',
            answer: 'Answer 2'
        }
    ]
}

const CourseEditPage = () => {
    const [action, setAction] = React.useState<"update" | "create">("create")
    const [tabValue, setTabValue] = React.useState<string>('course-basic')
    const [tabsList, setTabsList] = React.useState<string[]>(['course-basic', 'course-chapter', 'course-faq'])
    const [pageIndex, setPageIndex] = React.useState<number>(0)
    const [totalChapter, setTotalChapter] = React.useState<number>(0)
    const [courseBasicData, setCourseBasicData] = React.useState<CourseBasicDataType>({
        name: '',
        description: '',
        overview: '',
        duration: 0,
        chapter: 0,
        price: 0,
        offer: 0,
        cuponCode: '',
        instructor: '',
    })
    const [courseChapterData, setCourseChapterData] = React.useState<CourseChapterDataType[]>([])
    const [courseFAQData, setCourseFAQData] = React.useState<CourseFAQDataType[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    const searchParams = useSearchParams()

    React.useEffect(() => {
        const action_query = searchParams.get('action')
        if (action_query && action_query === 'update') {
            setAction(action_query)
            setTotalChapter(defaultValue.basic.chapter)
            setCourseBasicData(defaultValue.basic)
            setCourseChapterData(defaultValue.chapters)
            setCourseFAQData(defaultValue.faq)
            setLoading(false)
        }
        setTabValue(tabsList[pageIndex])
    }, [pageIndex])

    React.useEffect(() => {
        setCourseChapterData(Array.from({ length: totalChapter }, () => ({ label: '', lessons: [] })))
    }, [totalChapter])

    return !loading && <section className="py-6 flex flex-col gap-8">
        <div className="mx-4 sm:mx-8 md:mx-12">
            <h1 className="text-2xl font-semibold">
                {
                    action === 'update' ? 'Update Course' : 'Create Course'
                }
            </h1>
            <p>
                {
                    action === 'update' ? 'Update the course details' : 'Create a new course for your students'
                }
            </p>
        </div>
        <div className="container mx-auto flex flex-col justify-between gap-4">
            <Tabs defaultValue={tabsList[0]} value={tabValue} onValueChange={setTabValue} className="w-full h-[600px] overflow-y-scroll">
                <TabsContent value="course-basic" className="mt-0">
                    <CourseBasic setTotalChapter={setTotalChapter} defaultBasicsValue={courseBasicData} setCourseBasicData={setCourseBasicData} setPageIndex={setPageIndex} />
                </TabsContent>
                <TabsContent value="course-chapter" className="mt-0">
                    <CourseChapter totalChapter={totalChapter} setCourseChapterData={setCourseChapterData} setPageIndex={setPageIndex} defaultChaptersValue={courseChapterData} />
                </TabsContent>
                <TabsContent value="course-faq" className="mt-0">
                    <CourseFAQ setCourseFAQData={setCourseFAQData} defaultFAQValue={courseFAQData} />
                </TabsContent>
            </Tabs>
            <div className="flex items-center justify-around gap-6">
                <Button onClick={() => (pageIndex > 0) ? setPageIndex(pageIndex - 1) : null} disabled={pageIndex === 0} className="pl-2.5 items-center">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>
                {
                    pageIndex === tabsList.length - 1 ? <Button onClick={() => {
                        console.log({
                            basic: courseBasicData,
                            chapters: courseChapterData,
                            faq: courseFAQData
                        })
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

const CourseBasic = ({ setTotalChapter, defaultBasicsValue, setCourseBasicData, setPageIndex }:
    {
        setTotalChapter: React.Dispatch<React.SetStateAction<number>>,
        defaultBasicsValue: CourseBasicDataType,
        setCourseBasicData: React.Dispatch<React.SetStateAction<CourseBasicDataType>>,
        setPageIndex: React.Dispatch<React.SetStateAction<number>>
    }) => {
    const [submited, setSubmited] = React.useState<boolean>(false)

    return <Formik initialValues={defaultBasicsValue} onSubmit={values => {
        setCourseBasicData?.(values)
        setSubmited(true)
        setTimeout(() => {
            setSubmited(false)
            setPageIndex(pre => pre + 1)
        }, 1000)
    }}>
        {({ values, handleChange, handleSubmit }) => {
            return <Form className="grid grid-cols-1 gap-4">
                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Course Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter course name"
                        className="mt-1"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="description" className="block text-sm font-medium text-muted-foreground">Description</Label>
                    <Textarea className="mt-1" value={values.description} onChange={handleChange} id="description">
                    </Textarea>
                </div>
                <div>
                    <Label htmlFor="overview" className="block text-sm font-medium text-muted-foreground">Overview</Label>
                    <Textarea className="mt-1" value={values.overview} onChange={handleChange} id="overview">
                    </Textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="duration" className="block text-sm font-medium text-muted-foreground">Duration</Label>
                        <Input
                            type="number"
                            id="duration"
                            name="duration"
                            placeholder="Enter duration"
                            className="mt-1"
                            value={values.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="chapter" className="block text-sm font-medium text-muted-foreground">Chapter</Label>
                        <Input
                            type="text"
                            id="chapter"
                            name="chapter"
                            placeholder="Enter chapter"
                            className="mt-1"
                            value={values.chapter}
                            onChange={(e) => {
                                setTotalChapter(parseInt(e.target.value))
                                handleChange(e)
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="price" className="block text-sm font-medium text-muted-foreground">Price</Label>
                        <Input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter price"
                            className="mt-1"
                            value={values.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="offer" className="block text-sm font-medium text-muted-foreground">Offer</Label>
                        <Input
                            type="number"
                            id="offer"
                            name="offer"
                            placeholder="Enter offer"
                            className="mt-1"
                            value={values.offer}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="cuponCode" className="block text-sm font-medium text-muted-foreground">Cupon Code</Label>
                        <Input
                            type="text"
                            id="cuponCode"
                            name="cuponCode"
                            placeholder="Enter cupon code"
                            className="mt-1"
                            value={values.cuponCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="instructor" className="block text-sm font-medium text-muted-foreground">Instructor</Label>
                        <Input
                            type="text"
                            id="instructor"
                            name="instructor"
                            placeholder="Enter instructor"
                            className="mt-1"
                            value={values.instructor}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    {
                        submited ? <Button type="button">
                            <CheckIcon className="h-4 w-4 mr-2" />
                            Saved Changes
                        </Button> : <Button onClick={() => handleSubmit()} type="submit">
                            Save Changes
                        </Button>
                    }
                </div>
            </Form>
        }}
    </Formik>
}

const CourseChapter = ({ totalChapter, setCourseChapterData, setPageIndex, defaultChaptersValue }:
    {
        totalChapter: number,
        setCourseChapterData: React.Dispatch<React.SetStateAction<CourseChapterDataType[]>>,
        setPageIndex: React.Dispatch<React.SetStateAction<number>>,
        defaultChaptersValue: { label: string, lessons: string[] }[]
    }) => {
    const [submited, setSubmited] = React.useState<boolean>(false)

    return <Formik initialValues={{
        chapters: defaultChaptersValue
    }} onSubmit={values => {
        setCourseChapterData?.(values.chapters)
        setSubmited(true)
        setTimeout(() => {
            setSubmited(false)
            setPageIndex(pre => pre + 1)
        }, 1000)
    }}>
        {
            ({ values, handleSubmit, handleChange }) => {
                return <Form>
                    <FieldArray name="chapters">
                        {
                            ({ push, remove }) => {
                                return <Accordion type="single" collapsible className="w-full">
                                    {
                                        values.chapters.map((_, i) => {
                                            return <AccordionItem key={i} value={`item-${i + 1}`} className="last:border-b-0">
                                                <AccordionTrigger className="hover:no-underline">
                                                    <CustomField name={`chapters.${i}.label`} placeholder={'Lesson Name'} />
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6">
                                                    <FieldArray name={`chapters.${i}.lessons`}>
                                                        {({ push, remove }) => {
                                                            return <div className="grid grid-cols-1 gap-4">
                                                                {
                                                                    values.chapters[i].lessons.map((lesson, j) => {
                                                                        return <div key={j} className="grid grid-cols-12 gap-6">
                                                                            <Input name={`chapters.${i}.lessons[${j}]`} value={values.chapters[i].lessons[j]} placeholder="Enter Lessons" onChange={handleChange} className="col-span-10" />
                                                                            <Button onClick={() => {
                                                                                remove(j)
                                                                            }} type="button" className="w-full col-span-2">
                                                                                Remove Lesson
                                                                            </Button>
                                                                        </div>
                                                                    })
                                                                }
                                                                <Button onClick={() => push("")} type="button">
                                                                    New Lesson
                                                                </Button>
                                                            </div>
                                                        }}
                                                    </FieldArray>
                                                </AccordionContent>
                                            </AccordionItem>
                                        })
                                    }
                                    {
                                        totalChapter > 0 ? <div className="flex justify-end items-center pt-4">
                                            {
                                                submited ? <Button type="button">
                                                    <CheckIcon className="h-4 w-4 mr-2" />
                                                    Saved Changes
                                                </Button> : <Button
                                                    onClick={() => handleSubmit()} type="submit">
                                                    Save Changes
                                                </Button>
                                            }
                                        </div> : null
                                    }
                                </Accordion>
                            }
                        }
                    </FieldArray>
                </Form>
            }
        }
    </Formik>
}

const CourseFAQ = ({ setCourseFAQData, defaultFAQValue }: {
    setCourseFAQData: React.Dispatch<React.SetStateAction<CourseFAQDataType[]>>,
    defaultFAQValue: { question: string, answer: string }[]
}) => {
    const [submited, setSubmited] = React.useState<boolean>(false)

    const initialValues: FormCourseFAQDataType = {
        faq: defaultFAQValue
    }

    React.useEffect(() => {
        setTimeout(() => {
            setSubmited(false)
        }, 2000)
    }, [submited])

    return <Formik initialValues={initialValues} onSubmit={values => {
        setCourseFAQData?.(values.faq)
        setSubmited(true)
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
                                            values.faq.map((item, i) => {
                                                return <AccordionItem value={'item-' + i} key={i}>
                                                    <AccordionTrigger>
                                                        <div className="grid grid-cols-12 gap-4 w-full mr-8">
                                                            <Input value={item.question} onChange={handleChange} name={`faq.${i}.question`} placeholder="Enter the question" className="col-span-10" />
                                                            <Button onClick={() => remove(i)} type="button" className="col-span-2 w-full">
                                                                Remove FAQ
                                                            </Button>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <Textarea value={item.answer} onChange={handleChange} name={`faq.${i}.answer`} placeholder="Enter the answer" />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            })
                                        }
                                    </Accordion>
                                    <Button onClick={() => push({ question: '', answer: '' })} type="button">
                                        New FAQ
                                    </Button>
                                </div>
                            }
                        }
                    </FieldArray>
                    <div className="flex justify-end items-center">
                        {
                            submited ? <Button type="button">
                                <CheckIcon className="h-4 w-4 mr-2" />
                                Saved Changes
                            </Button> : <Button
                                onClick={() => handleSubmit()} type="submit">
                                Save Changes
                            </Button>
                        }
                    </div>
                </Form>
            }
        }
    </Formik>
}

const CustomField = ({ ...props }) => {
    return <Field {...props} className="flex h-10 w-full bg-accent rounded-md px-3 py-2 mr-6 text-sm placeholder:text-muted-foreground focus:outline-none" />
}

export default CourseEditPage