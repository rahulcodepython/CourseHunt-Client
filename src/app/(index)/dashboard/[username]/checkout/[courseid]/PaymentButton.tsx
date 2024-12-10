"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Script from 'next/script';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const PaymentButton = ({
    courseid,
    access_token,
    username,
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
            await axios(`${process.env.BASE_API_URL}/course/payment/verify/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: { ...data, course_id: courseid, coupon_code, is_discount }
            })
            toast.success('Payment successful');
            setLoading(false);
            await new Promise(resolve => setTimeout(() => {
                router.push(`/dashboard/${username}/study/${courseid}`);
                resolve(undefined);
            }, 2000));
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.response?.data?.message);
        }
    }

    const handlePaymentCancel = async (razorpay_order_id: string) => {
        try {
            await axios(`${process.env.BASE_API_URL}/course/payment/cancel/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: { razorpay_order_id }
            })
            toast.error('Payment cancelled');
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const makePayment = (data: { amount: number, order_id: string, currency: string }) => {
        try {
            const options = {
                key_id: `${process.env.NEXT_PUBLIC_RAZORPAY_KEY}`, // Enter the Key ID generated from the Dashboard
                amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                currency: data.currency,
                name: "Coursera",
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
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }

    const initiatePayment = async () => {
        setLoading(true);
        try {
            const response = await axios(`${process.env.BASE_API_URL}/course/payment/initiate/${courseid}/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: { is_discount, coupon_code }
            })
            const data = await response.data;
            makePayment(data);
            return;
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.response?.data?.message);

        }
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" type='text/javascript' />
            {
                loading ? <Button disabled className="gap-2 w-full mt-4">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> :
                    <Button className="w-full mt-4" onClick={() => initiatePayment()}>Proceed to Payment</Button>
            }
        </>
    )
}

export default PaymentButton
