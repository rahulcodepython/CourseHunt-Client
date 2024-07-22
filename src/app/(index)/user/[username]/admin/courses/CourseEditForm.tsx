"use client"
import * as React from "react"
import { CheckIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
type CourseChapterDataType = {
    chapters: { label: string, lessons: string[] }[]
}
type CourseFAQDataType = {
    question: string
    answer: string
}
type FormCourseFAQDataType = {
    question: string
    answer: string
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

const CourseModulation = ({ action, defaultValue }: { action: "update" | "create", defaultValue: CourseDataType | null }) => {
    const [tabValue, setTabValue] = React.useState<string>('course-basic')
    const [tabsList, setTabsList] = React.useState<string[]>(['course-basic', 'course-chapter', 'course-faq'])
    const [pageIndex, setPageIndex] = React.useState<number>(0)
    const [totalChapter, setTotalChapter] = React.useState<number>((action === 'update' && defaultValue) ? defaultValue.basic.chapter
        : 0)
    const [courseBasicData, setCourseBasicData] = React.useState<CourseBasicDataType>((action === 'update' && defaultValue) ? defaultValue.basic : {
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
    const [courseChapterData, setCourseChapterData] = React.useState<CourseChapterDataType | null>(null)
    const [courseFAQData, setCourseFAQData] = React.useState<CourseFAQDataType[]>([])

    React.useEffect(() => {
        setTabValue(tabsList[pageIndex])
    }, [pageIndex])

    return <Dialog>
        <DialogTrigger>
            <Button>
                Create Course
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-7xl">
            <DialogHeader className="space-y-0">
                <DialogTitle className="pb-6 text-2xl">
                    {
                        action === 'update' ? 'Edit Course' : 'Create Course'
                    }
                </DialogTitle>
                <DialogDescription>
                    <Card>
                        <CardContent className="pt-6 max-h-[500px] h-full overflow-y-scroll">
                            <Tabs defaultValue={tabsList[0]} value={tabValue} onValueChange={setTabValue} className="w-full">
                                <TabsContent value="course-basic" className="mt-0">
                                    <CourseBasic setTotalChapter={setTotalChapter} courseBasicData={courseBasicData} setCourseBasicData={setCourseBasicData} setPageIndex={setPageIndex} />
                                </TabsContent>
                                <TabsContent value="course-chapter" className="mt-0">
                                    <CourseChapter totalChapter={totalChapter} setCourseChapterData={setCourseChapterData} setPageIndex={setPageIndex} action={action} defaultChaptersValue={defaultValue?.chapters} />
                                </TabsContent>
                                <TabsContent value="course-faq" className="mt-0">
                                    <CourseFAQ setCourseFAQData={setCourseFAQData} action={action} defaultFAQValue={defaultValue?.faq} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                        <CardFooter className="border-t p-6 justify-end gap-6">
                            <Button onClick={() => {
                                if (pageIndex > 0) {
                                    setPageIndex(pageIndex - 1)
                                }
                            }} disabled={pageIndex === 0} className="pl-2.5 items-center">
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            {
                                pageIndex === tabsList.length - 1 ? <Button>
                                    Create Course
                                </Button> : <Button onClick={() => {
                                    console.log("Course Basic Data", courseBasicData)
                                    console.log("Course Chapter Data", courseChapterData)
                                    if (pageIndex < tabsList.length - 1) {
                                        setPageIndex(pageIndex + 1)
                                    }
                                }} disabled={pageIndex === tabsList.length - 1} className="pr-2.5 items-center">
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            }
                        </CardFooter>
                    </Card>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}

const CourseBasic = ({ setTotalChapter, courseBasicData, setCourseBasicData, setPageIndex }:
    {
        setTotalChapter: React.Dispatch<React.SetStateAction<number>>,
        courseBasicData: CourseBasicDataType,
        setCourseBasicData: React.Dispatch<React.SetStateAction<CourseBasicDataType>>,
        setPageIndex: React.Dispatch<React.SetStateAction<number>>
    }) => {
    const [submited, setSubmited] = React.useState<boolean>(false)

    React.useEffect(() => {
        setTimeout(() => {
            setSubmited(false)
        }, 2000)
    }, [submited])

    return <Formik initialValues={courseBasicData} onSubmit={values => setCourseBasicData?.(values)}>
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
                        </Button> : <Button onClick={() => {
                            handleSubmit()
                            setSubmited(true)
                            setPageIndex(pre => pre + 1)
                        }} type="submit">
                            Save Changes
                        </Button>
                    }
                </div>
            </Form>
        }}
    </Formik>
}

const CourseChapter = ({ totalChapter, setCourseChapterData, setPageIndex, action, defaultChaptersValue }:
    {
        totalChapter: number,
        setCourseChapterData: React.Dispatch<React.SetStateAction<CourseChapterDataType | null>>,
        setPageIndex: React.Dispatch<React.SetStateAction<number>>,
        action: string,
        defaultChaptersValue: { label: string, lessons: string[] }[] | undefined
    }) => {
    const [lessonValue, setLessonValue] = React.useState<string>('')
    const [submited, setSubmited] = React.useState<boolean>(false)

    React.useEffect(() => {
        setTimeout(() => {
            setSubmited(false)
        }, 2000)
    }, [submited])

    return <Formik initialValues={{
        lessonValue: '',
        chapters: (action === 'update' && defaultChaptersValue) ?
            defaultChaptersValue : Array.from({ length: totalChapter }, () => ({ label: '', lessons: [] }))
    }} onSubmit={values => {
        setCourseChapterData?.(values)
        setSubmited(true)
        setPageIndex(pre => pre + 1)
    }}>
        {
            ({ values, handleSubmit, setFieldValue, handleChange }) => {
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
                                                            return <div className="flex flex-col gap-4">
                                                                <div className="flex items-center gap-6">
                                                                    <Input value={lessonValue} onChange={e => setLessonValue(e.target.value)} />
                                                                    <Button onClick={() => {
                                                                        if (lessonValue.length > 0) {
                                                                            push(lessonValue)
                                                                            setLessonValue('')
                                                                        }
                                                                    }} type="button">
                                                                        Add Lesson
                                                                    </Button>
                                                                </div>
                                                                <div className="flex flex-col gap-4">
                                                                    {
                                                                        values.chapters[i].lessons.map((lesson, j) => {
                                                                            return <div key={j} className="flex items-center gap-6">
                                                                                <UpdateLessonValueInputComponent lessonValue={lesson} values={values} i={i} j={j} />
                                                                                <Button onClick={() => {
                                                                                    remove(j)
                                                                                }} type="button">
                                                                                    Remove Lesson
                                                                                </Button>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
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

const UpdateLessonValueInputComponent = ({ lessonValue, values, i, j }: {
    lessonValue: string,
    values: { chapters: { label: string, lessons: string[] }[] },
    i: number,
    j: number
}) => {
    const [value, setValue] = React.useState<string>(lessonValue)
    return <Input className="w-full bg-accent rounded-md p-2" value={value} onChange={e => {
        setValue(e.target.value)
        values.chapters[i].lessons[j] = e.target.value
    }} />
}

const CourseFAQ = ({ setCourseFAQData, action, defaultFAQValue }: {
    setCourseFAQData: React.Dispatch<React.SetStateAction<CourseFAQDataType[]>>,
    action: "update" | "create"
    defaultFAQValue: { question: string, answer: string }[] | undefined
}) => {
    const initialValues: FormCourseFAQDataType = {
        question: '',
        answer: '',
        faq: (action === 'update' && defaultFAQValue) ? defaultFAQValue : []
    }

    return <Formik initialValues={initialValues} onSubmit={values => setCourseFAQData?.(values.faq)}>
        {
            ({ values, handleSubmit, handleChange, setFieldValue }) => {
                return <Form className="space-y-8">
                    <FieldArray name="faq">
                        {
                            ({ push, remove }) => {
                                return <div className="space-y-12">
                                    <div className="space-y-4">
                                        <Input placeholder="Enter Question" value={values.question} onChange={handleChange} name="question" />
                                        <Textarea placeholder="Enter Answer" value={values.answer} onChange={handleChange} name="answer" />
                                        <div className="flex justify-end items-center">
                                            <Button onClick={() => {
                                                push({ question: values.question, answer: values.answer })
                                                setFieldValue('question', '')
                                                setFieldValue('answer', '')
                                            }}>
                                                Add FAQ
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <Accordion type="single" collapsible className="w-full">
                                            {
                                                values.faq.map((faq, i) => {
                                                    return <AccordionItem value={'item-' + i} key={i}>
                                                        <AccordionTrigger>
                                                            <div className="flex items-center justify-between w-full mr-8">
                                                                {faq.question}
                                                                <Button onClick={() => {
                                                                    remove(i)
                                                                }}>
                                                                    Remove FAQ
                                                                </Button>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            {faq.answer}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                })
                                            }
                                        </Accordion>
                                    </div>
                                </div>
                            }
                        }
                    </FieldArray>
                    <div className="flex justify-end items-center">
                        <Button onClick={() => handleSubmit()} type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            }
        }
    </Formik>
}

const CustomField = ({ ...props }) => {
    return <Field {...props} className="flex h-10 w-full bg-accent rounded-md px-3 py-2 mr-6 text-sm placeholder:text-muted-foreground focus:outline-none" />
}

export default CourseModulation