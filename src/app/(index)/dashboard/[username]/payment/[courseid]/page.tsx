import { Button } from '@/components/ui/button';
import { getCookies } from '@/server/action';
import axios from 'axios';
import React from 'react'
import PaymentButton from './PaymentButton';

type CoursePaymentType = {
    amount: number;
    currency: string;
    order_id: string;
}

const CoursePayment = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const { courseid } = await params;
    const { access_token } = await getCookies(['access_token']);

    const response = await axios.request({
        method: 'GET',
        url: `${process.env.BASE_API_URL}/course/payment/initiate/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data: CoursePaymentType = response.data;
    console.log(data);


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                <div className="flow-root">
                    <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${data.amount}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">${data.amount}</dd>
                        </dl>
                    </div>
                </div>

                <PaymentButton amount={data.amount} order_id={data.order_id} />
            </div>
        </div>
    )
}

export default CoursePayment