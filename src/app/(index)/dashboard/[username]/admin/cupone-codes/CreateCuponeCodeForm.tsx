"use client"
import { Input } from "@/components/ui/input";
import React from 'react'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/context/AuthStore";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ListCuponeCodeType } from "@/types";
import axios from "axios";

// Define the Zod schema
const formSchema = z.object({
    code: z.string().min(1),
    discount: z.number().min(0),
    expiry: z
        .string()
        .refine((value) => {
            const today = new Date();
            const expiryDate = new Date(value);
            return expiryDate > today;
        }, {
            message: "Expiry date must be greater than today",
        }),
    is_unlimited: z.boolean(),
    quantity: z.number().optional(),
    is_active: z.boolean(),
}).refine(
    (data) => data.is_unlimited || data.quantity !== undefined,
    {
        message: "Quantity is required when 'is_unlimited' is false",
        path: ["quantity"],
    }
);;

export type CuponCodeFormDataType = z.infer<typeof formSchema>;

const CreateCouponCodeForm = ({ defaultData, edit }: {
    defaultData?: ListCuponeCodeType,
    edit?: boolean
}) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const form = useForm<CuponCodeFormDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: (edit && defaultData) ? {
            code: defaultData?.code,
            discount: defaultData?.discount,
            expiry: defaultData?.expiry,
            is_unlimited: defaultData?.is_unlimited,
            quantity: defaultData?.quantity ?? undefined,
            is_active: defaultData?.is_active ?? false
        } : {
            code: "",
            discount: 0,
            is_unlimited: false,
            quantity: undefined,
            is_active: false,
        },
    });

    const { watch, setValue } = form;
    const watchedUnLimited = watch("is_unlimited");

    React.useEffect(() => {
        if (watchedUnLimited) {
            setValue("quantity", undefined); // Clear quantity when unlimited
        }
    }, [watchedUnLimited, setValue]);

    const onSubmit = async (data: CuponCodeFormDataType) => {
        await mutate(() => edit ? editCouponCode(data, accessToken, defaultData?.id as number) : createCouponCode(data, accessToken));
    };

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    toast.success(mutationData.success);
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Coupon Code</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter coupon code" />
                                </FormControl>
                                <FormMessage>
                                    {form?.formState?.errors?.code?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discount</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" placeholder="Enter discount percentage" onChange={(e) => {
                                        // Convert the value to a number before passing it to `field.onChange`
                                        const value = e.target.value === "" ? undefined : Number(e.target.value);
                                        field.onChange(value);
                                    }} />
                                </FormControl>
                                <FormMessage>
                                    {form?.formState?.errors?.discount?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expiry"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                    <Input {...field} type="date" />
                                </FormControl>
                                <FormMessage>
                                    {form?.formState?.errors?.expiry?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field: quantityField }) => (
                            <div className="flex flex-col gap-2 col-span-3">
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        {...quantityField}
                                        type="number"
                                        placeholder="Enter quantity"
                                        disabled={watchedUnLimited}
                                        value={quantityField.value ?? undefined}
                                        onChange={(e) => {
                                            // Convert the value to a number before passing it to `quantityField.onChange`
                                            const value = e.target.value === "" ? undefined : Number(e.target.value);
                                            quantityField.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form?.formState?.errors?.quantity?.message}
                                </FormMessage>
                            </div>
                        )}
                    />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <FormField
                            control={form.control}
                            name="is_unlimited"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-2">
                                        <FormLabel>Unlimited</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(value) => {
                                                    field.onChange(value);
                                                    if (value) {
                                                        setValue("quantity", undefined); // Clear quantity if unlimited is checked
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {form?.formState?.errors?.quantity?.message}
                                        </FormMessage>
                                    </div>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-2">
                                        <FormLabel>Activate</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {form?.formState?.errors?.is_active?.message}
                                        </FormMessage>
                                    </div>
                                </FormItem>
                            )} />
                    </div>
                    <div className="flex justify-end">
                        {
                            mutationIsLoading ?
                                <Button disabled className="gap-2">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button> :
                                <Button type="submit">
                                    {edit ? 'Edit Coupn' : 'Add New Coupon'}
                                </Button>
                        }
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

const createCouponCode = async (data: CuponCodeFormDataType, access_token: string | null) => {
    const options = {
        url: `${process.env.BASE_API_URL}/transactions/create-coupon-code/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        data: data,
    }
    return await axios.request(options)
}

const editCouponCode = async (data: CuponCodeFormDataType, access_token: string | null, id: number) => {
    const options = {
        url: `${process.env.BASE_API_URL}/transactions/edit-coupon-code/${id}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        data: data,
    }
    return await axios.request(options)
}

export default CreateCouponCodeForm;