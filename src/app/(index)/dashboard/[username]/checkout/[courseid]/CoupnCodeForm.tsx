"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCheckoutStore } from '@/context/CheckoutStore';
import useMutation from '@/hooks/useMutation';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import React from 'react'

const CoupnCodeForm = ({
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
    const [isError, setIsError] = React.useState<boolean>(false);

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                }
                else {
                    if (mutationData) {
                        updateDiscount(mutationData.data.discount, true);
                        updateTotal(mutationData.data.total);
                        setCouponCodeValue(mutationData.data.coupon_code_id);
                    }
                }
            }
        }
        handler();
    }, [mutationState])

    const applyCouponCode = async (course_id: string | undefined, access_token: string | undefined, couponCode: string) => {
        try {
            const response = await axios.post(`${process.env.BASE_API_URL}/transactions/apply-coupon-code/${course_id}/`, {
                coupon_code: couponCode
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            return response;
        } catch (error) {
            setIsError(true);
        }
    }

    const handleSubmit = async () => {
        if (couponCode.trim().length <= 0) {
            return;
        }

        await mutate(() => applyCouponCode(course_id, access_token, couponCode));
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
                isError ? <span className='text-red-500 text-sm'>Invalid Coupon Code</span> : null
            }
            {
                mutationIsLoading ? <Button disabled className="gap-2">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Applying
                </Button> : <Button onClick={() => handleSubmit()} disabled={is_discount}>
                    Apply
                </Button>
            }
        </div>
    )
}

export default CoupnCodeForm
