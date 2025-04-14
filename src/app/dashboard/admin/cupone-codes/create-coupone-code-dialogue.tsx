"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutation from "@/hooks/useMutation";
import { useAuthStore } from "@/context/AuthStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoadingButton from "@/components/loading-button";
import { clientUrlGenerator } from "@/utils";
import { Label } from "@/components/ui/label";
import { ListCouponCodeType } from "@/types";

const formSchema = z.object({
    code: z.string().min(1),
    discount: z.number().min(0),
    is_unlimited: z.boolean(),
    quantity: z.number().optional(),
    is_active: z.boolean(),
});

type CouponCodeFormDataType = z.infer<typeof formSchema>;

const CreateCouponeCodeDialogue = ({
    addData,
}: {
    addData: (data: ListCouponCodeType) => void
}) => {
    const [date, setDate] = React.useState<Date>(new Date());
    const [isOpen, setIsOpen] = React.useState(false);

    const accessToken = useAuthStore((state) => state.accessToken);
    const { mutate, mutationIsLoading, onSuccess, } = useMutation();

    const { register, handleSubmit, watch, setValue } = useForm<CouponCodeFormDataType>({
        resolver: zodResolver(formSchema),
    });

    const watchedUnLimited = watch("is_unlimited");

    const onSubmit = async (data: CouponCodeFormDataType) => {
        const formattedData = {
            ...data,
            expiry_date: date.toISOString().split("T")[0], // Inject only today's date
        };

        // Uncomment and use when making an API request
        const options = {
            url: clientUrlGenerator(`/transactions/create-coupon-code/`),
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            data: formattedData,
        };
        await mutate(options);
    };

    onSuccess((data) => {
        addData(data);
        setIsOpen(false);
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Add New Coupon
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Create New Coupon Code</DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-8 mt-8">
                            <div>
                                <Label className="block text-sm font-medium mb-2">Coupon Code</Label>
                                <Input
                                    placeholder="Enter coupon code"
                                    {...register("code")}
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-2">Discount</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter discount percentage"
                                    {...register("discount", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-2">Expiry Date</Label>
                                <Input
                                    type="date"
                                    value={date.toISOString().split("T")[0]}
                                    onChange={(e) => {
                                        const selectedDate = new Date(e.target.value);
                                        setDate(
                                            new Date(selectedDate)
                                        );
                                    }}
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-2">Quantity</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter quantity"
                                    disabled={watchedUnLimited}
                                    {...register("quantity", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div>
                                    <Label className="flex items-center gap-2">
                                        <Checkbox
                                            {...register("is_unlimited")}
                                            onCheckedChange={(value: boolean) => {
                                                setValue("is_unlimited", value);
                                                if (value) {
                                                    setValue("quantity", undefined); // Clear quantity if unlimited is checked
                                                }
                                            }}
                                        />
                                        Unlimited
                                    </Label>
                                </div>
                                <div>
                                    <Label className="flex items-center gap-2">
                                        <Checkbox
                                            {...register("is_active")}
                                            onCheckedChange={(value) =>
                                                setValue("is_active", !!value)
                                            }
                                        />
                                        Activate
                                    </Label>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <LoadingButton loading={mutationIsLoading} loadingText="Please wait...">
                                    <Button type="submit">Add New Coupon</Button>
                                </LoadingButton>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCouponeCodeDialogue;
