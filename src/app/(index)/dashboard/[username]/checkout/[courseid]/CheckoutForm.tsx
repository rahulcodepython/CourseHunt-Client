"use client"
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the schema
const formSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    country: z.string().nonempty({ message: "Country is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    phone: z.string().nonempty({ message: "Phone number is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
});

type FormData = z.infer<typeof formSchema>;

const CheckoutForm = ({ defaultData }: { defaultData: FormData }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultData,
    });

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form className="grid grid-cols-2 gap-4">
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Country Field */}
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* City Field */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Phone Field */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Address Field */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </FormProvider>
    );
}

export default CheckoutForm;
