"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/context/AuthStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoadingButton from "@/components/loading-button";
import { clientUrlGenerator } from "@/utils";
import { ListCuponeCodeType } from "@/types";
import { Label } from "@/components/ui/label";

interface CuponCodeFormDataType {
    code: string;
    discount: number;
    is_unlimited: boolean;
    quantity?: number;
    is_active: boolean;
}

const EditCouponeCodeDialogue = ({
    defaultData,
    updateData,
}: {
    defaultData: ListCuponeCodeType,
    updateData: (id: string, data: ListCuponeCodeType) => void
}) => {
    const [isUnlimited, setIsUnlimited] = React.useState<boolean>(defaultData.is_unlimited);
    const [isOpen, setIsOpen] = React.useState(false);

    const accessToken = useAuthStore((state) => state.accessToken);
    const { mutate, mutationIsLoading, onSuccess, onError } = useMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const formData: CuponCodeFormDataType = {
            code: data.get('code')?.toString() || '',
            discount: Number(data.get('discount')) || 0,
            is_unlimited: isUnlimited,
            quantity: data.get('quantity') ? Number(data.get('quantity')) : undefined,
            is_active: data.get('is_active') === 'on',
        };

        if (!formData.is_unlimited && !formData.quantity) {
            toast.error("Quantity is required");
            return;
        }

        // Uncomment and use when making an API request
        const options = {
            url: clientUrlGenerator(`/transactions/edit-coupon-code/${defaultData?.id}/`),
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            data: data,
        }
        await mutate(options);
    };

    onSuccess((data) => {
        updateData(data.id, data);
        toast.success("Coupon code updated successfully");
        setIsOpen(false);
    });

    onError((error) => {
        toast.error(error);
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Edit Cupon
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Edit Cupon Code
                    </DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <div className="space-y-8 mt-8">
                            <div>
                                <Label className="block text-sm font-medium mb-2">Coupon Code</Label>
                                <Input
                                    placeholder="Enter coupon code"
                                    defaultValue={defaultData.code}
                                    name="code"
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-2">Discount</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter discount percentage"
                                    defaultValue={defaultData.discount}
                                    name="discount"
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-2">Expiry Date</Label>
                                <Input
                                    type="date"
                                    defaultValue={new Date(defaultData.expiry).toLocaleDateString('en-CA')}
                                    name="expiry"
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-2">Quantity</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter quantity"
                                    disabled={isUnlimited}
                                    defaultValue={defaultData.quantity ?? ''}
                                    name="quantity"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div>
                                    <Label className="flex items-center gap-2">
                                        <Checkbox
                                            checked={isUnlimited}
                                            onCheckedChange={(value: boolean) => {
                                                setIsUnlimited(value);
                                            }}
                                        />
                                        Unlimited
                                    </Label>
                                </div>
                                <div>
                                    <Label className="flex items-center gap-2">
                                        <Checkbox
                                            defaultChecked={defaultData.is_active}
                                            name="is_active"
                                        />

                                        Activate
                                    </Label>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <LoadingButton loading={mutationIsLoading} loadingText="Please wait...">
                                    <Button type="submit">Edit Coupn</Button>
                                </LoadingButton>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </DialogContent>
        </Dialog>
    );
};

export default EditCouponeCodeDialogue;
