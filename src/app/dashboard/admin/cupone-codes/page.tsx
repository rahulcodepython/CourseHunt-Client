import React from "react";
import axios from "axios";
import { ListCuponeCodeType, PaginationType } from "@/types";
import CuponCodeTable from "./CuponCodeTable";
import { getAccessToken } from "@/app/action";

const CuponCodesPage = async () => {
    const access_token = await getAccessToken();

    const response = await axios.request({
        method: 'GET',
        url: `${process.env.BASE_API_URL_SERVER}/transactions/list-coupon-code/`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data: PaginationType<ListCuponeCodeType> = response.data;

    const columnsList = [
        "Code",
        "Discount",
        "Expiry",
        "Quantity",
        "Used",
        "Unlimited",
        "Active",
        "Action"
    ]

    return <section className="grid gap-4 pt-8">
        <div className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                <CuponCodeTable data={data} columnList={columnsList} />
            </div>
        </div>
    </section>
}

export default CuponCodesPage;