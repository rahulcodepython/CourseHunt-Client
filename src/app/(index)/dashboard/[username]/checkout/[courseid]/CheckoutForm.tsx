"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CoursePriceResponseType } from "@/types";


const CheckoutForm = ({
    defaultData,
}: {
    defaultData: CoursePriceResponseType,
}) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Name
                </Label>
                <Input
                    id="name"
                    placeholder="Name"
                    value={defaultData.name}
                    readOnly
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                    Email
                </Label>
                <Input
                    id="email"
                    placeholder="Email"
                    value={defaultData.email}
                    readOnly
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="country">
                    Country
                </Label>
                <Input
                    id="country"
                    placeholder="Country"
                    value={defaultData.country}
                    readOnly
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="city">
                    City
                </Label>
                <Input
                    id="city"
                    placeholder="City"
                    value={defaultData.city}
                    readOnly
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="phone">
                    Phone
                </Label>
                <Input
                    id="phone"
                    placeholder="Phone"
                    value={defaultData.phone}
                    readOnly
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="address">
                    Address
                </Label>
                <Input
                    id="address"
                    placeholder="Address"
                    value={defaultData.address}
                    readOnly
                />
            </div>
        </div>
    );
}

export default CheckoutForm;
