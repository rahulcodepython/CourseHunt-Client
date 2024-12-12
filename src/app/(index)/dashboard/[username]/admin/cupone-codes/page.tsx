import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateCuponeCodeForm from "./CreateCuponeCodeForm";
import { getCookies } from "@/server/action";
import axios from "axios";
import { ListCuponeCodeType } from "@/types";
import PButton from "@/components/PButton";
import DeleteCuponeCode from "./DeleteCuponeCode";

const CuponeCodesPage = async () => {
    const { access_token } = await getCookies(['access_token']);

    const response = await axios.request({
        method: 'GET',
        url: `${process.env.BASE_API_URL}/transactions/list-coupon-code/`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data: ListCuponeCodeType[] = response.data;

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
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-4 justify-start">
                            <CardTitle>Cupone Codes</CardTitle>
                            <CardDescription>View all Cupone Codes.</CardDescription>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <Dialog>
                                <DialogTrigger>
                                    <PButton>
                                        Add New Cupone
                                    </PButton>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-xl">Create New Cupon Code</DialogTitle>
                                        <DialogDescription>
                                            <CreateCuponeCodeForm />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {
                                        columnsList.map((header, index) => {
                                            return <TableHead key={index}>
                                                {header}
                                            </TableHead>
                                        })
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => {
                                        return <TableRow key={item.id}>
                                            <TableCell>
                                                {item.code}
                                            </TableCell>
                                            <TableCell>
                                                {item.discount}
                                            </TableCell>
                                            <TableCell>
                                                {item.expiry}
                                            </TableCell>
                                            <TableCell>
                                                {item.is_unlimited ? 'Unlimited' : item.quantity}
                                            </TableCell>
                                            <TableCell>
                                                {item.used}
                                            </TableCell>
                                            <TableCell>
                                                {item.is_unlimited ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell>
                                                {item.is_active ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <PButton>
                                                                Edit
                                                            </PButton>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle className="text-xl">Edit Cupon Code</DialogTitle>
                                                                <DialogDescription>
                                                                    <CreateCuponeCodeForm defaultData={data[index]} edit />
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <DeleteCuponeCode id={item.id} access_token={access_token} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
}

export default CuponeCodesPage;