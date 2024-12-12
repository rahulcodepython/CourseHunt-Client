"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AllCourseType } from "@/types";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SendHorizonal } from "lucide-react";
import axios from "axios";

// Define Zod schema for validation
const courseSchema = z.object({
    name: z.string().min(1, "Course name is required"),
    short_description: z.string().min(1, "Short description is required"),
    long_description: z.string().min(1, "Long description is required"),
    duration: z.string().min(1, "Duration should be a positive number"),
    price: z.number().min(1, "Price should be a positive number"),
    offer: z.number().min(0).max(100, "Offer should be between 0 and 100"),
    status: z.enum(["published", "draft"]),
    thumbnail: z.string().optional(),
    videoURL: z.string().optional(),
    notesURL: z.string().optional(),
    presentationURL: z.string().optional(),
    codeURL: z.string().optional(),
    content: z.string().optional(),
});

const EditCourseForm = ({
    defaultValues,
    courseid,
    access_token
}: {
    defaultValues: AllCourseType;
    courseid: string | undefined;
    access_token: string | undefined;
}) => {
    const form = useForm<AllCourseType>({
        resolver: zodResolver(courseSchema),
        defaultValues: defaultValues,
    });

    const { mutationIsLoading, mutate, mutationData, mutationIsError, mutationState, mutationError } = useMutation();

    const onSubmit = async (data: AllCourseType) => {
        await mutate(() => courseid ? editCourse(courseid, data, access_token) : createCourse(data, access_token));
    };

    React.useEffect(() => {
        if (mutationState === "done") {
            if (mutationIsError) {
                toast.error(mutationError);
            }
            else {
                toast.success(mutationData.success);
            }
        }
    }, [mutationData]);

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    {/* Course Name */}
                    <FormField control={form.control} name="short_description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Name</FormLabel>
                            <FormControl>
                                <Input {...form.register("name")} placeholder="Enter course name" />
                            </FormControl>
                            <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Short Description */}
                    <FormField control={form.control} name="short_description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a short description" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.short_description?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Long Description */}
                    <FormField control={form.control} name="long_description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Long Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter a long description" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.long_description?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Duration */}
                    <FormField control={form.control} name="duration" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter duration" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.duration?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Price */}
                    <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter price" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Offer */}
                    <FormField control={form.control} name="offer" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Offer (%)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter offer" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.offer?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Status */}
                    <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value: any) => field.onChange(value)}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Thumbnail */}
                    <FormField control={form.control} name="thumbnail" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter thumbnail URL" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.thumbnail?.message}</FormMessage>
                        </FormItem>
                    )}
                    />

                    {/* Video URL */}
                    <FormField control={form.control} name="videoURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter video URL" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.videoURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Notes URL */}
                    <FormField control={form.control} name="notesURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter notes URL" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.notesURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Presentation URL */}
                    <FormField control={form.control} name="presentationURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Presentation URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter presentation URL" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.presentationURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Code URL */}
                    <FormField control={form.control} name="codeURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter code URL" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.codeURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Content URL */}
                    <FormField control={form.control} name="content" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter course content" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.content?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        {mutationIsLoading ?
                            <Button disabled className="gap-2" type="button">
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button> : <Button type="submit" className="gap-2">
                                <SendHorizonal className="h-4 w-4" />
                                <span>Submit</span>
                            </Button>
                        }
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

const createCourse = async (data: AllCourseType, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/create-course/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        data: data,
    }
    return await axios.request(options)
}

const editCourse = async (courseid: string | undefined, data: AllCourseType, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-course/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "PATCH",
        data: data,
    }
    return await axios.request(options)
}

export default EditCourseForm;