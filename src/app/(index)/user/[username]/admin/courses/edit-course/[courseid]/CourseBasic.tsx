"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useMutation } from "@/hook"
import { useAuthStore } from "@/context/AuthStore"
import { toast } from "react-toastify"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import DurationField from "@/components/DurationField"
import { CourseDataType } from "@/types"

const CourseBasic = ({ setPageIndex, courseid }:
    {
        setPageIndex: React.Dispatch<React.SetStateAction<number>>,
        courseid: string
    }) => {
    const accessToken = useAuthStore(state => state.accessToken)

    const { error: queryError, data: queryData, isRefetching: isQueryRefetching, isError, isLoading: isQueryLoading } = useQuery({
        queryKey: ['edit-courses', courseid],
        queryFn: async () => {
            const response = await axios.get(`${process.env.BASE_API_URL}/course/edit-course/${courseid}/`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            return response.data
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    React.useEffect(() => {
        isError && toast.error(queryError.message)
    }, [isError])

    if (isQueryLoading) {
        return <div>Loading...</div>
    }

    if (isQueryRefetching) {
        return <div>Refetching...</div>
    }

    const defaultValues = isError || isQueryRefetching || isQueryLoading || !queryData ? {
        name: '',
        description: '',
        overview: '',
        duration: 0,
        chapter: 0,
        price: 0,
        offer: 0,
        cupon_code: '',
    } : queryData

    return <CourseBasicForm defaultValues={defaultValues} setPageIndex={setPageIndex} courseid={courseid} />
}

const CourseBasicForm = ({ defaultValues, setPageIndex, courseid }: {
    defaultValues: CourseDataType['basic'],
    setPageIndex: React.Dispatch<React.SetStateAction<number>>,
    courseid: string
}) => {
    const accessToken = useAuthStore(state => state.accessToken)

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation()

    React.useEffect(() => {
        if (mutationIsError) {
            toast.error(mutationError)
        } else if (mutationData) {
            toast.success(mutationData.message)
        }
    }, [mutationState])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CourseDataType['basic']>({
        defaultValues: defaultValues,
    });

    const onSubmit = async (values: CourseDataType['basic']) => {
        let updatedValues = { ...values };
        updatedValues.cupon_code = values.cupon_code === '' ? null : values.cupon_code;

        await mutate({
            url: `${process.env.BASE_API_URL}/course/edit-course/${courseid}/`,
            data: updatedValues,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        setPageIndex((prev: number) => prev + 1);
    };

    return <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Course Name</Label>
            <Input
                type="text"
                id="name"
                {...register("name", { required: "Course name is required" })}
                placeholder="Enter course name"
                className="mt-1"
            />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
        </div>
        <div>
            <Label htmlFor="description" className="block text-sm font-medium text-muted-foreground">Description</Label>
            <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Enter short description about course"
                className="mt-1"
            />
            {errors.description && <span className="text-red-600">{errors.description.message}</span>}
        </div>
        <div>
            <Label htmlFor="overview" className="block text-sm font-medium text-muted-foreground">Overview</Label>
            <Textarea
                id="overview"
                {...register("overview", { required: "Overview is required" })}
                placeholder="Write about the course"
                className="mt-1"
            />
            {errors.overview && <span className="text-red-600">{errors.overview.message}</span>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="duration" className="block text-sm font-medium text-muted-foreground">Duration</Label>
                <DurationField duration={defaultValues.duration} setValue={setValue} />
            </div>
            <div>
                <Label htmlFor="chapter" className="block text-sm font-medium text-muted-foreground">Chapter</Label>
                <Input
                    type="number"
                    id="chapter"
                    {...register("chapter", { required: "Chapter is required", min: 1 })}
                    placeholder="Enter chapter"
                    className="mt-1"
                />
                {errors.chapter && <span className="text-red-600">{errors.chapter.message}</span>}
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="price" className="block text-sm font-medium text-muted-foreground">Price</Label>
                <Input
                    type="number"
                    id="price"
                    {...register("price", { required: "Price is required" })}
                    placeholder="Enter price"
                    className="mt-1"
                />
                {errors.price && <span className="text-red-600">{errors.price.message}</span>}
            </div>
            <div>
                <Label htmlFor="offer" className="block text-sm font-medium text-muted-foreground">Offer</Label>
                <Input
                    type="number"
                    id="offer"
                    {...register("offer", { required: "Offer is required" })}
                    placeholder="Enter offer"
                    className="mt-1"
                />
                {errors.offer && <span className="text-red-600">{errors.offer.message}</span>}
            </div>
        </div>
        <div className="grid grid-cols-1">
            <div>
                <Label htmlFor="cuponCode" className="block text-sm font-medium text-muted-foreground">Cupon Code</Label>
                <Input
                    type="text"
                    id="cuponCode"
                    {...register("cupon_code")}
                    placeholder="Enter cupon code"
                    className="mt-1"
                />
            </div>
        </div>
        <div className="flex justify-end">
            {mutationIsLoading ? (
                <Button disabled className="gap-2">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button type="submit">Save Changes</Button>
            )}
        </div>
    </form>
}

export default CourseBasic