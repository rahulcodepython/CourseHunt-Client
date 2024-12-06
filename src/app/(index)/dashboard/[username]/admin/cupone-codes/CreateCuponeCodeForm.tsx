"use client"
import { Input } from "@/components/ui/input";
import React from 'react'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";
import { createCouponCode, editCouponCode } from "@/server/action";
import { useAuthStore } from "@/context/AuthStore";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ListCuponeCodeType } from "@/types";

// Define the Zod schema
const formSchema = z.object({
    code: z.string().optional(),
    discount: z.number().optional(),
    expiry: z.string().optional(),
    is_unlimited: z.boolean(),
    quantity: z.number().optional(),
    is_active: z.boolean(),
});

export type CuponCodeFormDataType = z.infer<typeof formSchema>;

const CreateCouponCodeForm = ({ defaultData, edit }: {
    defaultData?: ListCuponeCodeType,
    edit?: boolean
}) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const methods = useForm<CuponCodeFormDataType>({
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
            expiry: "",
            is_unlimited: false,
            quantity: undefined,
            is_active: false,
        },
    });

    const { watch, setValue } = methods;
    const watchedUnLimited = watch("is_unlimited");

    const onSubmit = async (data: CuponCodeFormDataType) => {
        try {
            await mutate(() => edit ? editCouponCode(data, accessToken, defaultData?.id as number) : createCouponCode(data, accessToken));
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationData.data);
                }
                else {
                    toast.success(mutationData.data);
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                {/* Coupon Code */}
                <FormField
                    control={methods.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Coupon Code</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter coupon code" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Discount */}
                <FormField
                    control={methods.control}
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
                        </FormItem>
                    )}
                />

                {/* Expiry Date */}
                <FormField
                    control={methods.control}
                    name="expiry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                                <Input {...field} type="date" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
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
                                    value={quantityField.value ?? ""}
                                />
                            </FormControl>
                        </div>
                    )}
                />

                {/* Unlimited Checkbox and Quantity */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <FormField
                        control={methods.control}
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
                                </div>
                            </FormItem>
                        )} />
                    <FormField
                        control={methods.control}
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
                                </div>
                            </FormItem>
                        )} />
                </div>

                {/* Submit Button */}
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
            </form>
        </FormProvider>
    );
}

export default CreateCouponCodeForm;