import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCookies } from "@/server/action"
import axios from "axios"
import { UserType } from "@/types"

const UsersPage = async () => {
    const columnsList = [
        "Username",
        "Name",
        "Email",
        "Superuser",
    ];

    const { access_token } = await getCookies(['access_token'])

    const options = {
        method: 'get',
        url: `${process.env.BASE_API_URL}/auth/users/alluser/`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    };

    const response = await axios(options)
    const data: UserType[] = response.data

    return <div className="w-full p-4">
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between py-4">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>
                            All Users
                        </CardTitle>
                        <CardDescription>
                            List of all users.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {
                                    columnsList.map((col) => (
                                        <TableHead key={col}>
                                            {col}
                                        </TableHead>
                                    ))
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((user, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{`${user.is_superuser}`}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
}

export default UsersPage