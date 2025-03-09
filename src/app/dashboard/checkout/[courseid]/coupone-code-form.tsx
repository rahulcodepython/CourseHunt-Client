"use client"
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCheckoutStore } from '@/context/CheckoutStore';
import useMutation from '@/hooks/useMutation';
import { clientUrlGenerator } from '@/utils';
import React from 'react'

const CouponeCodeForm = ({
    access_token,
    course_id
}: {
    access_token: string | undefined,
    course_id: string | undefined
}) => {
    const [couponCode, setCouponCode] = React.useState<string>('');
    const is_discount = useCheckoutStore(state => state.is_discount);
    const updateDiscount = useCheckoutStore(state => state.updateDiscount);
    const updateTotal = useCheckoutStore(state => state.updateTotal);
    const setCouponCodeValue = useCheckoutStore(state => state.setCouponCode);

    const { mutate, onSuccess, onError, mutationIsLoading, mutationIsError } = useMutation();

    onSuccess((data) => {
        updateDiscount(data.discount, true);
        updateTotal(data.total);
        setCouponCodeValue(data.coupon_code_id);
    })


    const handleSubmit = async () => {
        if (couponCode.trim().length <= 0) {
            return;
        }

        const options = {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            methods: 'POST',
            url: clientUrlGenerator(`/transactions/apply-coupon-code/${course_id}/`),
            data: {
                coupon_code: couponCode
            }
        };

        await mutate(options);
    }

    return (
        <div className='flex flex-col gap-2'>
            <Input
                placeholder='Coupon Code'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={mutationIsLoading || is_discount}
            />
            {
                mutationIsError ? <span className='text-red-500 text-sm'>Invalid Coupon Code</span> : null
            }
            <LoadingButton loading={mutationIsLoading} loadingText='Applying'>
                <Button onClick={() => handleSubmit()} disabled={is_discount}>
                    Apply
                </Button>
            </LoadingButton>
        </div>
    )
}

export default CouponeCodeForm
