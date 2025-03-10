"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Script from 'next/script';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { clientUrlGenerator } from '@/utils';
import LoadingButton from '@/components/loading-button';

const PaymentButton = ({
    courseid,
    access_token,
    is_discount,
    coupon_code
}: {
    courseid: string | undefined,
    access_token: string | undefined,
    username: string | undefined,
    is_discount: boolean | undefined,
    coupon_code: string | undefined
}) => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const verifyPayment = async (data: {
        razorpay_payment_id: string,
        razorpay_order_id: string,
        razorpay_signature: string,
    }) => {
        try {
            const response = await axios(clientUrlGenerator(`/transactions/payment/verify/`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: { ...data, course_id: courseid, coupon_code, is_discount }
            })
            // toast.success(response.data.success);
            router.push(`/dashboard/study/${courseid}`);
        } catch (error: any) {
            setLoading(false);
            // toast.error(error?.response?.data?.message);
        }
    }

    const handlePaymentCancel = async (razorpay_order_id: string) => {
        try {
            const response = await axios(clientUrlGenerator(`/transactions/payment/cancel/`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: { razorpay_order_id }
            })
            // toast.error(response.data.success);
        } catch {
            // toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    const makePayment = (data: { amount: number, order_id: string, currency: string }) => {
        try {
            const options = {
                key_id: `${process.env.NEXT_PUBLIC_RAZORPAY_KEY}`, // Enter the Key ID generated from the Dashboard
                amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                currency: data.currency,
                name: "CourseHunt",
                description: "Purchase Course",
                image: "/logo.png",
                handler: function (response: any) { verifyPayment(response) },
                theme: {
                    "color": "#3399cc"
                },
                "prefill": {
                    "name": "Rahul Kumar",
                    "email": "Rahul.kumar@example.com",
                    "contact": "9000090000"
                },
                modal: {
                    ondismiss: function () {
                        handlePaymentCancel(data.order_id); // Call a custom function to handle cancellation
                    },
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch {
            setLoading(false);
            // toast.error(error?.response?.data?.message);
        }
    }

    const initiatePayment = async () => {
        setLoading(true);
        try {
            const response = await axios(clientUrlGenerator(`/transactions/payment/initiate/${courseid}/`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: { is_discount, coupon_code }
            })
            const data = await response.data;
            makePayment(data);
            return;
        } catch {
            setLoading(false);
            // toast.error(error?.response?.data?.message);

        }
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" type='text/javascript' />
            <LoadingButton loading={loading} loadingText='Processing'>
                <Button className="w-full mt-4" onClick={() => initiatePayment()} disabled={loading}>
                    Proceed to Payment
                </Button>
            </LoadingButton>
        </>
    )
}

export default PaymentButton
