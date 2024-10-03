"use client"
import * as React from "react"
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable, Row as RowType, Table as TableType
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuthStore } from "@/context/AuthStore"
import { useRouter } from "next/navigation"
import { ReloadIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useMutation } from "@/hook"
import { toast } from "react-toastify"
import { FormatDate } from "@/utils"
import { useQuery } from "@tanstack/react-query"

type RecordType = {
    id: string
    name: string
    created_at: string
    duration: number
    chapter: string
    price: number
    offer: number
    status: 'published' | 'draft'
    cuponCode: string
}

const CoursesPage = () => {
    const user = useAuthStore((state) => state.user)
    const accessToken = useAuthStore((state) => state.accessToken)

    const ROWS_PER_PAGE = 2

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [filters, setFilters] = React.useState<string>('')
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(ROWS_PER_PAGE)
    const [rowsPerPageDropDown, setRowsPerPageDropDown] = React.useState<number>(ROWS_PER_PAGE)
    const [hasNext, setHasNext] = React.useState<boolean>(false)
    const [hasPrevious, setHasPrevious] = React.useState<boolean>(false)
    const [page, setPage] = React.useState(1)

    const router = useRouter()

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation()

    const { error: queryError, data: queryData, isRefetching: isQueryRefetching, isLoading: isQueryLoading } = useQuery({
        queryKey: ['admin-courses', { 'page': page, 'limit': rowsPerPage }],
        queryFn: async () => {
            const response = await axios.get(`${process.env.BASE_API_URL}/course/admin-courses/`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            return response.data
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    const rowsOption: (number)[] = [2, 4, 6]

    const columnsList = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Course Name' },
        { key: 'created_at', label: 'Published Date' },
        { key: 'duration', label: 'Duration' },
        { key: 'chapter', label: 'Chapter' },
        { key: 'price', label: 'Price' },
        { key: 'offer', label: 'Offer' },
        { key: 'status', label: 'Status' },
        { key: 'cuponCode', label: 'Cupon Code' },
    ]

    const columns: ColumnDef<RecordType>[] = [
        {
            id: "select",
            accessorKey: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
    ];
    columnsList.forEach((columnValue) => {
        !(columnValue.key === 'id') && columns.push({
            id: columnValue.key,
            accessorKey: columnValue.key,
            header: ({ column }) => {
                return <Button variant="ghost" className="capitalize"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    {columnValue.label}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    {
                        columnValue.key === 'status' ? <UpdateCourseStatus id={row.original.id} value={row.getValue(columnValue.key)} /> : (row.getValue(columnValue.key) === undefined || row.getValue(columnValue.key) === null) ? 'N/A' : row.getValue(columnValue.key)
                    }
                </div>
            ),
        });
    });
    columns.push({
        id: "actions",
        accessorKey: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const info = row.original;
            return <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <Button>
                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link href={`/user/${user?.username}/admin/courses/edit-chapter/${info.id}/`} className="w-full">
                            Edit Chapter
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={`/user/${user?.username}/admin/courses/edit-course/${info.id}/`} className="w-full">
                            Edit Course
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        },
    });

    const table = useReactTable({
        data: queryData?.results ?? [],
        columns,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter: filters,
            columnVisibility,
            rowSelection,
        },
    })

    React.useEffect(() => {
        table.setPageSize(ROWS_PER_PAGE)
        setRowsPerPageDropDown(ROWS_PER_PAGE)
    }, [])

    React.useEffect(() => {
        if (!isQueryLoading) {
            if (queryError) {
                toast.error(queryError?.message)
            }
            setHasNext(queryData?.results?.next)
            setHasPrevious(queryData?.results?.previous)
        }
    }, [queryError, isQueryLoading, queryData])

    React.useEffect(() => {
        mutationIsError && toast.error(mutationError)
        if (mutationState === 'done' && mutationData) {
            toast.success('Course created successfully')
            router.push(`/user/${user?.username}/admin/courses/edit-course/${mutationData.id}`)
        }

    }, [mutationState])

    return <div className="w-full p-4">
        <Card>
            <CardHeader className="flex-row justify-between">
                <div className="flex items-center justify-between py-4 w-full">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>
                            All Courses
                        </CardTitle>
                        <CardDescription>
                            List of all courses.
                        </CardDescription>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        {
                            mutationIsLoading ? <Button disabled className="gap-2">
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button> : <Button className="w-full" onClick={async () => {
                                await mutate({
                                    url: `${process.env.BASE_API_URL}/course/create-course/`,
                                    method: 'POST',
                                    headers: {
                                        Authorization: `Bearer ${accessToken}`
                                    },
                                    data: {
                                        "created_at": FormatDate(new Date().toISOString())
                                    }
                                })
                            }}>
                                Create Course
                            </Button>
                        }
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>Columns</MenubarTrigger>
                                <MenubarContent>
                                    {
                                        columns.map((column) => {
                                            return !(column.id == 'select' || column.id == 'actions') &&
                                                <MenubarCheckboxItem
                                                    className="capitalize cursor-pointer"
                                                    key={column.id}
                                                    checked={table.getColumn(column.id ?? '')?.getIsVisible()}
                                                    onCheckedChange={() => table.getColumn(column.id ?? '')?.toggleVisibility()}>
                                                    {column.id}
                                                </MenubarCheckboxItem>
                                        })
                                    }
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="cursor-pointer" onClick={() => {
                                    setSorting([])
                                    setFilters('')
                                    setColumnVisibility({})
                                }}>Unfiilter</MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>
                        <Input
                            placeholder="Search..."
                            value={filters}
                            onChange={(event) => setFilters(event.target.value)}
                            className="max-w-lg"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return <TableHead key={header.id}>
                                                {
                                                    header.isPlaceholder ? null : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </TableHead>
                                        })}
                                    </TableRow>
                                ))
                            }
                        </TableHeader>
                        <TableBody>
                            {
                                (isQueryLoading || isQueryRefetching) ? <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Fetching...
                                    </TableCell>
                                </TableRow> : table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => {
                                    return <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}>
                                        {
                                            row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className={cell.column.columnDef.id === 'select' || cell.column.columnDef.id === 'actions' ? "px-4" : "px-8"}>
                                                    {
                                                        flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                }) : <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected
                    </div>
                    <div className={'text-sm text-muted-foreground'}>
                        Shows {table.getFilteredRowModel().rows.length < rowsPerPage ? table.getFilteredRowModel().rows.length : rowsPerPage} out
                        of {table.getFilteredRowModel().rows.length} rows
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-center">
                <div className={'flex items-center justify-center gap-4'}>
                    <Pagination className={'w-fit mx-0'}>
                        <PaginationContent>
                            <PaginationItem>
                                {
                                    hasPrevious ? <PaginationPrevious onClick={() => setPage(page - 1)} className="cursor-pointer" /> : <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 cursor-not-allowed opacity-50">
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </span>
                                }
                            </PaginationItem>
                            {
                                // Array.from({ length: ((totalRecords / rowsPerPage) + (totalRecords % rowsPerPage === 0 ? 0 : 1)) }, (_, i) => {
                                //     return (
                                //         <PaginationItem key={i} onClick={() => {
                                //             setPage(i + 1)
                                //             table.setPageIndex(i)
                                //         }} className="cursor-pointer">
                                //             <PaginationLink className={
                                //                 page === i + 1 ?
                                //                     `bg-secondary-foreground text-white hover:bg-secondary-foreground hover:text-white`
                                //                     : ''}>{i + 1}</PaginationLink>
                                //         </PaginationItem>
                                //     )
                                // })
                            }
                            <PaginationItem>
                                {
                                    hasNext ? <PaginationNext onClick={() => setPage(page + 1)} className="cursor-pointer" /> :
                                        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5 cursor-not-allowed opacity-50">
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </span>
                                }
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {rowsPerPage} <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {
                                rowsOption.map((option) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={option}
                                            className="capitalize"
                                            checked={rowsPerPageDropDown === option}
                                            onCheckedChange={() => {
                                                table.setPageSize(option)
                                                setRowsPerPage(option)
                                                setRowsPerPageDropDown(option)
                                            }}
                                        >
                                            {option}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardFooter>
        </Card>
    </div>
}

const UpdateCourseStatus = ({ id, value }: {
    id: string
    value: 'published' | 'draft'
}) => {
    const accessToken = useAuthStore((state) => state.accessToken)

    const [status, setStatus] = React.useState<'published' | 'draft'>(value)

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation()

    React.useEffect(() => {
        if (mutationState === 'done') {
            if (mutationIsError) {
                toast.error(mutationError)
                return;
            }
            toast.success(mutationData?.message ?? 'Course updated successfully')
            setStatus(mutationData?.status)
        }
    }, [mutationState])

    return mutationIsLoading ? <Button>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
    </Button> : <Button onClick={() => mutate({
        url: `${process.env.BASE_API_URL}/course/publish-course/${id}/`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })}
        className={status === 'published' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {status === 'published' ? 'Published' : 'Draft'}
    </Button>
}

export default CoursesPage