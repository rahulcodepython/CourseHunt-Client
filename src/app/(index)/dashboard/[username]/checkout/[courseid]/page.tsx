import { getCookies } from '@/server/action';
import axios from 'axios';
import React from 'react'
import PaymentButton from './PaymentButton';
import { Button } from '@/components/ui/button';
import CheckoutForm from './CheckoutForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CoursePayment = async ({ params }: { params: Promise<{ courseid: string | undefined, username: string | undefined }> }) => {
    const { courseid, username } = await params;
    const { access_token } = await getCookies(['access_token']);

    const response = await axios.request({
        method: 'GET',
        url: `${process.env.BASE_API_URL}/course/checkout/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data: {
        price: number,
        tax: number,
        offer: number,
        total: number,
        name: string,
        email: string,
        country: string
        city: string
        phone: string
        address: string
    } = response.data;

    return (
        <Card className='my-12 mx-24'>
            <CardHeader>
                <CardTitle>
                    Delivery Details
                </CardTitle>
            </CardHeader>

            <CardContent className="px-16 grid grid-cols-3 items-center gap-12">
                <div className="space-y-4 col-span-2">
                    <CheckoutForm defaultData={{
                        name: data.name,
                        email: data.email,
                        country: data.country,
                        city: data.city,
                        phone: data.phone,
                        address: data.address
                    }} />
                </div>
                <div className="my-8 w-full space-y-6">
                    <div className="flow-root">
                        <div className="-my-3 divide-y">
                            <dl className="flex items-center justify-between gap-4 py-3">
                                <dt className="text-base font-normal">Price</dt>
                                <dd className="text-base font-medium">
                                    {data.price}
                                </dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4 py-3">
                                <dt className="text-base font-normal">Tax</dt>
                                <dd className="text-base font-medium">
                                    {data.tax}
                                </dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4 py-3">
                                <dt className="text-base font-normal">Subtotal</dt>
                                <dd className="text-base font-medium text-green-500">
                                    {data.price + data.tax}
                                </dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4 py-3">
                                <dt className="text-base font-normal">Offer</dt>
                                <dd className="text-base font-medium">
                                    {data.offer}
                                </dd>
                            </dl>


                            <dl className="flex items-center justify-between gap-4 py-3">
                                <dt className="text-base font-bold">Total</dt>
                                <dd className="text-base font-bold flex items-end gap-1">
                                    <del className='text-xs'>
                                        {data.price + data.tax}
                                    </del>
                                    <span className="text-green-500">
                                        {data.total}
                                    </span>
                                </dd>
                            </dl>
                        </div>
                        <PaymentButton courseid={courseid} username={username} access_token={access_token} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CoursePayment