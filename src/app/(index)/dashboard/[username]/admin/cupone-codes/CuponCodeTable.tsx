"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
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
import React from 'react'
import { ListCuponeCodeType, PaginationType } from '@/types'
import usePagination from '@/hooks/usePagination'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import PButton from "@/components/PButton";
import DeleteCuponeCode from "./DeleteCuponCode";
import CreateCouponCodeForm from "./CreateCuponCodeForm";

const CuponCodeTable = ({ data, columnList }: {
    data: PaginationType<ListCuponeCodeType>
    columnList: string[]
}) => {
    const pagination = usePagination<ListCuponeCodeType>(data)
    const accessToken = useAuthStore(state => state.accessToken)

    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-4 justify-start">
                    <CardTitle>Cupone Codes</CardTitle>
                    <CardDescription>View all Cupone Codes.</CardDescription>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <CreateCouponCodeForm addData={pagination.addData} />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                columnList.map((header, index) => {
                                    return <TableHead key={index}>
                                        {header}
                                    </TableHead>
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            pagination.results.map((item, index) => {
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
                                            <CreateCouponCodeForm defaultData={item} edit updateData={pagination.updateData} />

                                            <DeleteCuponeCode id={item.id} access_token={accessToken} removeCuponeCode={pagination.removeData} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                <CardFooter className='p-0 pt-6 flex justify-between'>
                    <p className='text-left'>
                        Total Courses: {pagination.count}
                    </p>
                    {
                        pagination.is_next && <Button onClick={() => pagination.fetchNext(pagination.nextPageUrl, true, accessToken)}>
                            Load More
                        </Button>
                    }
                </CardFooter>
            </CardContent>
        </Card>
    )
}

export default CuponCodeTable
