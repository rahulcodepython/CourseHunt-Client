import { getCookies } from '@/server/action';
import axios from 'axios';
import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CoursePriceResponseType } from '@/types';
import CheckoutSection from './CheckoutSection';

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
    const data: CoursePriceResponseType = response.data;

    return (
        <Card className='my-12 mx-24'>
            <CardHeader>
                <CardTitle>
                    Delivery Details
                </CardTitle>
            </CardHeader>
            <CheckoutSection data={data} access_token={access_token} course_id={courseid} username={username} />
        </Card>
    )
}

export default CoursePayment