"use client"
import * as React from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useMutation } from "@/hook"
import { useAuthStore } from "@/context/AuthStore"
import { toast } from "react-toastify"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DurationField from "@/components/DurationField"
import { FormatTime } from "@/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useForm, useFieldArray } from 'react-hook-form';
import { CourseDataType } from "@/types"

const CourseChapter = ({ setPageIndex, courseid }: {
    setPageIndex: React.Dispatch<React.SetStateAction<number>>,
    courseid: string
}) => {
    const [chapters, setChapters] = React.useState<CourseDataType['chapters'][]>([])

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
        !isQueryRefetching && !isQueryLoading && setChapters(queryData)
    }, [isError, isQueryRefetching, isQueryLoading])

    if (isQueryLoading) {
        return <div>Loading...</div>
    }

    if (isQueryRefetching) {
        return <div>Refetching...</div>
    }

    const onSubmit = async (values: CourseDataType['chapters'][]) => {
        await mutate({
            data: values,
            url: `${process.env.BASE_API_URL}/course/edit-chapter/${courseid}/`,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken }
        })
        setPageIndex(pre => pre + 1)
    }

    return <div className="grid grid-cols-1 gap-8">
        {
            chapters.map((chapter: CourseDataType['chapters'], i: number) => {
                return <Card>
                    <CardHeader className="w-full flex flex-row items-center justify-between space-y-0">
                        <div className="flex flex-col space-y-1.5">
                            <CardTitle>{chapter.name.length === 0 ? 'Enter title of the chapter' : chapter.name}</CardTitle>
                            <CardDescription>
                                <span>Duration: {FormatTime(chapter.duration)}</span>
                            </CardDescription>
                        </div>
                        <ChapterModalForm chapters={chapters} setChapters={setChapters} index={i} />
                    </CardHeader>
                    <CardContent>
                        {
                            chapter.lessons.map((lesson: { name: string }, j: number) => {
                                return <div key={j} className="grid gap-2">
                                    <span className="col-span-10">{lesson.name}</span>
                                </div>
                            })
                        }
                    </CardContent>
                </Card>
            })
        }
        <div className="flex items-center justify-end">
            {
                chapters.length > 0 && mutationIsLoading ? <Button disabled className="gap-2">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <Button onClick={() => onSubmit(chapters)} type="submit">
                    Save Changes
                </Button>
            }
        </div>
    </div>

}

const ChapterModalForm = ({ chapters, setChapters, index }: {
    chapters: CourseDataType['chapters'][],
    setChapters: React.Dispatch<React.SetStateAction<CourseDataType['chapters'][]>>,
    index: number
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const { register, control, handleSubmit, setValue } = useForm({
        defaultValues: chapters[index],
    });

    const { fields: lessons, append, remove } = useFieldArray({
        control,
        name: "lessons"
    });

    const updateItemAtIndex = (chapter: CourseDataType['chapters'][], index: number, newValue: CourseDataType['chapters']) => {
        setChapters(chapter.map((item, i) => {
            if (i !== index) return item;
            return {
                ...item,
                ...newValue
            };
        }));
    };

    const onSubmit = (data: CourseDataType['chapters']) => {
        updateItemAtIndex(chapters, index, data);
        setIsOpen(false);
    };

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
            <Button>Edit Chapter</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl w-full">
            <DialogHeader>
                <DialogTitle>Edit Chapter</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-left">Name</Label>
                        <Input {...register('name')} className="col-span-3" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="duration" className="text-left">Duration</Label>
                        <DurationField
                            duration={chapters[index].duration}
                            setValue={setValue}
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="lessons" className="text-left">Lessons</Label>
                            <Button onClick={() => append({ name: '' })} type="button">New Lesson</Button>
                        </div>

                        <div className="grid gap-3 max-h-[212px] overflow-y-scroll">
                            {lessons.map((item, j) => (
                                <div className="flex items-center justify-around gap-4" key={item.id}>
                                    <Input
                                        {...register(`lessons.${j}.name`)}
                                        defaultValue={item.name}
                                        className="col-span-3"
                                    />
                                    <Trash className="h-4 w-4 cursor-pointer" onClick={() => remove(j)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex items-center justify-end w-full">
                    <Button type="submit">Update</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>

}

export default CourseChapter