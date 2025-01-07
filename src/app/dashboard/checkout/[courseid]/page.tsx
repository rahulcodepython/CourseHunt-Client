import axios from 'axios';
import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CoursePriceResponseType } from '@/types';
import CheckoutSection from './CheckoutSection';
import { getAccessToken } from '@/app/action';
import { getUser } from '@/utils';

const CoursePayment = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const { courseid } = await params;

    const access = await getAccessToken();
    const user = getUser(access);

    const response = await axios.request({
        method: 'GET',
        url: `${process.env.BASE_API_URL_SERVER}/transactions/checkout/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access}`
        }
    })
    const data: CoursePriceResponseType = response.data;

    return (
        <Card className='my-12 mx-24'>
            <CardHeader>
                <CardTitle>
                    Delivery Details
                </CardTitle>
            </CardHeader>
            <CheckoutSection data={data} access_token={access} course_id={courseid} username={user?.username} />
        </Card>
    )
}

export default CoursePayment