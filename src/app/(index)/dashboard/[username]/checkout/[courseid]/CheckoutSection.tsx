"use client"
import React from 'react'
import { CardContent } from '@/components/ui/card';
import { CoursePriceResponseType } from '@/types';
import CheckoutForm from './CheckoutForm';
import PaymentButton from './PaymentButton';
import CoupnCodeForm from './CoupnCodeForm';
import { useCheckoutStore } from '@/context/CheckoutStore';

const CheckoutSection = ({
    data,
    access_token,
    course_id,
    username
}: {
    data: CoursePriceResponseType,
    access_token: string | undefined,
    course_id: string | undefined,
    username: string | undefined
}) => {
    const price = useCheckoutStore(state => state.price);
    const tax = useCheckoutStore(state => state.tax);
    const offer = useCheckoutStore(state => state.offer);
    const total = useCheckoutStore(state => state.total);
    const setValue = useCheckoutStore(state => state.setValue);
    const updateTotal = useCheckoutStore(state => state.updateTotal);
    const is_discount = useCheckoutStore(state => state.is_discount);
    const discount = useCheckoutStore(state => state.discount);
    const coupon_code = useCheckoutStore(state => state.coupon_code);

    React.useEffect(() => {
        setValue(data.price, data.tax, data.offer);
        updateTotal(data.total);
    }, [])

    return (
        <CardContent className="px-16 grid grid-cols-3 items-center gap-12">
            <div className="space-y-4 col-span-2">
                <CheckoutForm defaultData={data} />
                <CoupnCodeForm access_token={access_token} course_id={course_id} />
            </div>
            <div className="my-8 w-full space-y-6">
                <div className="flow-root">
                    <div className="-my-3 divide-y">
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal">Price</dt>
                            <dd className="text-base font-medium">
                                {price}
                            </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal">Tax</dt>
                            <dd className="text-base font-medium">
                                {tax}
                            </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal">Subtotal</dt>
                            <dd className="text-base font-medium text-green-500">
                                {price + tax}
                            </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal">Offer</dt>
                            <dd className="text-base font-medium">
                                {offer}
                            </dd>
                        </dl>
                        {
                            is_discount && <dl className="flex items-center justify-between gap-4 py-3">
                                <dt className="text-base font-normal">Discount</dt>
                                <dd className="text-base font-medium">
                                    {discount}
                                </dd>
                            </dl>
                        }

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-bold">Total</dt>
                            <dd className="text-base font-bold flex items-end gap-1">
                                <del className='text-xs'>
                                    {price + tax}
                                </del>
                                <span className="text-green-500">
                                    {total.toFixed(2)}
                                </span>
                            </dd>
                        </dl>
                    </div>
                    <PaymentButton courseid={course_id} username={username} access_token={access_token} is_discount={is_discount} coupon_code={coupon_code} />
                </div>
            </div>
        </CardContent>
    )
}

export default CheckoutSection
