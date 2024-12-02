"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AllCourseType } from "@/types";
import { createCourse, editCourse } from "@/server/action";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SendHorizonal } from "lucide-react";

// Define Zod schema for validation
const courseSchema = z.object({
    name: z.string().min(1, "Course name is required"),
    short_description: z.string().min(1, "Short description is required"),
    long_description: z.string().min(1, "Long description is required"),
    duration: z.string().min(1, "Duration should be a positive number"),
    price: z.number().min(1, "Price should be a positive number"),
    offer: z.number().min(0).max(100, "Offer should be between 0 and 100"),
    status: z.enum(["published", "draft"]),
    thumbnail: z.string().min(1, "Thumbnail URL is required"),
    videoURL: z.string().min(1, "Video URL is required"),
    notesURL: z.string().min(1, "Notes URL is required"),
    presentationURL: z.string().min(1, "Presentation URL is required"),
    codeURL: z.string().min(1, "Code URL is required"),
    content: z.string().min(1, "Content URL is required"),
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
    const methods = useForm<AllCourseType>({
        resolver: zodResolver(courseSchema),
        defaultValues: defaultValues,
    });

    const { mutationIsLoading, mutate, mutationData, mutationIsError, mutationState } = useMutation();

    const onSubmit = async (data: AllCourseType) => {
        await mutate(() => courseid ? editCourse(courseid, data, access_token) : createCourse(data, access_token));
    };

    React.useEffect(() => {
        if (mutationState === "done") {
            if (mutationIsError) {
                toast.error(mutationData.data);
            }
            else {
                toast.success(mutationData.data);
            }
        }
    }, [mutationData]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    {/* Course Name */}
                    <FormField control={methods.control} name="short_description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Name</FormLabel>
                            <FormControl>
                                <Input {...methods.register("name")} placeholder="Enter course name" />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.name?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Short Description */}
                    <FormField control={methods.control} name="short_description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a short description" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.short_description?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Long Description */}
                    <FormField control={methods.control} name="long_description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Long Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter a long description" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.long_description?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Duration */}
                    <FormField control={methods.control} name="duration" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter duration" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.duration?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Price */}
                    <FormField control={methods.control} name="price" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter price" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.price?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Offer */}
                    <FormField control={methods.control} name="offer" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Offer (%)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter offer" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.offer?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Status */}
                    <FormField control={methods.control} name="status" render={({ field }) => (
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
                            <FormMessage>{methods.formState.errors.status?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Thumbnail */}
                    <FormField control={methods.control} name="thumbnail" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter thumbnail URL" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.thumbnail?.message}</FormMessage>
                        </FormItem>
                    )}
                    />

                    {/* Video URL */}
                    <FormField control={methods.control} name="videoURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter video URL" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.videoURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Notes URL */}
                    <FormField control={methods.control} name="notesURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter notes URL" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.notesURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Presentation URL */}
                    <FormField control={methods.control} name="presentationURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Presentation URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter presentation URL" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.presentationURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Code URL */}
                    <FormField control={methods.control} name="codeURL" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter code URL" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.codeURL?.message}</FormMessage>
                        </FormItem>
                    )} />

                    {/* Content URL */}
                    <FormField control={methods.control} name="content" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter course content" {...field} />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.content?.message}</FormMessage>
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

export default EditCourseForm;