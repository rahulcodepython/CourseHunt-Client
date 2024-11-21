"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Razorpay from 'razorpay';

const PaymentButton = ({
    amount, order_id
}: {
    amount: number,
    order_id: string
}) => {
    const MakePayment = () => {
        const RazorPayOnSuccess = (response: any) => {
            console.log(response.razorpay_payment_id);
        }

        try {

            const options = {
                key_id: `${process.env.NEXT_PUBLIC_RAZORPAY_KEY}`, // Enter the Key ID generated from the Dashboard
                amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                currency: "INR",
                name: "Company Name",
                description: "Purchase Course",
                image: "/logo.png",
                handler: function (response: any) { RazorPayOnSuccess(response) },
                theme: {
                    "color": "#3399cc"
                },
                "prefill": {
                    "name": "Rahul Kumar",
                    "email": "Rahul.kumar@example.com",
                    "contact": "9000090000"
                },
            };

            const razorpay = new Razorpay(options);
            // razorpay.open();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button className="w-full" onClick={() => MakePayment()}>Proceed to Payment</Button>
    )
}

export default PaymentButton
