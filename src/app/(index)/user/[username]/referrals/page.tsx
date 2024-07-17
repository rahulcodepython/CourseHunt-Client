"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight, CopyIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
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
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

type ReferralType = {
    id: string;
    user: string;
    email: string;
    date: string;
    status: "Active" | "Inactive" | "Purchased";
    reward: number;
}

const ReferralsPage = () => {
    return (
        <section className="grid gap-4 pt-8">
            <div className="grid gap-2 text-left container mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Referrals</h1>
                <p className="text-muted-foreground">Share your unique referral link and earn rewards.</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm container mx-auto max-w-2xl w-full">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Your Referral Link</div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <CopyIcon className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem>
                                <div className="flex items-center gap-2">
                                    <CheckIcon className="h-4 w-4" />
                                    <span>Copied to clipboard!</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="mt-2 flex items-center justify-center rounded-md bg-muted px-3 py-2">
                    <Input
                        readOnly
                        value="https://example.com/referral/abc123"
                        className="w-full bg-transparent text-center font-medium"
                    />
                </div>
            </div>
            <ReferredDataTable />
        </section>
    )
}

const ReferredDataTable = () => {
    const ROWS_PER_PAGE = 2
    const [data, setData] = React.useState<ReferralType[]>([
        {
            id: "1",
            user: "John Doe",
            email: "abc@example.com",
            date: "01/01/2022",
            status: "Active",
            reward: 1
        },
        {
            id: "2",
            user: "Jane Doe",
            email: "xyz@example.com",
            date: "01/01/2022",
            status: "Inactive",
            reward: 0
        },
        {
            id: "3",
            user: "Rahul Das",
            email: "rahul@example.com",
            date: "01/01/2022",
            status: "Purchased",
            reward: 40
        },
    ])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [filters, setFilters] = React.useState<string>('')
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(ROWS_PER_PAGE)
    const [rowsPerPageDropDown, setRowsPerPageDropDown] = React.useState<number>(ROWS_PER_PAGE)
    const [totalRecords, setTotalRecords] = React.useState<number>(0)
    const [hasNext, setHasNext] = React.useState(false)
    const [page, setPage] = React.useState(1)
    const [isFetching, setIsFetching] = React.useState(false)
    const [hasMore, setHasMore] = React.useState(true)

    const rowsOption: (number)[] = [2, 4, 6]

    const columnsList = [
        {
            key: 'user',
            label: "User"
        },
        {
            key: 'email',
            label: "Email"
        },
        {
            key: 'date',
            label: "Data"
        },
        {
            key: 'status',
            label: "Status"
        },
        {
            key: 'reward',
            label: "Reward"
        }
    ]

    const columns: ColumnDef<ReferralType>[] = [
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
    columnsList.forEach((columnName) => {
        columns.push({
            id: columnName.key,
            accessorKey: columnName.key,
            header: ({ column }) => {
                return <Button variant="ghost" className="capitalize"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    {columnName.label}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue(columnName.key)}</div>
            ),
        });
    });

    const table = useReactTable({
        data,
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
        const handler = async () => {
            table.setPageSize(ROWS_PER_PAGE)
            setRowsPerPageDropDown(ROWS_PER_PAGE)
        }
        handler()
    }, [])

    React.useEffect(() => {
        const handler = async () => {
            // fetch next page data
        }
        handler()
    }, [page])

    React.useEffect(() => {
        if (data.length < totalRecords) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }
    }, [data, totalRecords])

    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-4 justify-start">
                            <CardTitle>Purchesed Course</CardTitle>
                            <CardDescription>View all purchesed course.</CardDescription>
                        </div>
                        <div className="flex items-center justify-end gap-4">
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
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                {
                                    table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {
                                                headerGroup.headers.map((header) => {
                                                    return <TableHead key={header.id}>
                                                        {
                                                            header.isPlaceholder ? null : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                        }
                                                    </TableHead>
                                                })
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableHeader>
                            <TableBody>
                                {
                                    isFetching ? <TableRow>
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
                        <div className={'flex items-center justify-center gap-4'}>
                            <Pagination className={'w-fit mx-0'}>
                                <PaginationContent>
                                    <PaginationItem>
                                        {
                                            table.getCanPreviousPage() ? <PaginationPrevious onClick={() => {
                                                if (table.getCanPreviousPage()) {
                                                    setPage(page - 1)
                                                    table.previousPage()
                                                }
                                            }} className="cursor-pointer" /> :
                                                <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 cursor-not-allowed opacity-50">
                                                    <ChevronLeft className="h-4 w-4" />
                                                    Previous
                                                </span>
                                        }
                                    </PaginationItem>
                                    {
                                        Array.from({ length: ((totalRecords / rowsPerPage) + (totalRecords % rowsPerPage === 0 ? 0 : 1)) }, (_, i) => {
                                            return <PaginationItem key={i} onClick={() => {
                                                setPage(i + 1)
                                                table.setPageIndex(i)
                                            }} className="cursor-pointer">
                                                <PaginationLink className={
                                                    page === i + 1 ?
                                                        `bg-secondary-foreground text-white hover:bg-secondary-foreground hover:text-white`
                                                        : ''}>{i + 1}</PaginationLink>
                                            </PaginationItem>
                                        })
                                    }
                                    <PaginationItem>
                                        {
                                            table.getCanNextPage() ? <PaginationNext onClick={() => {
                                                if (table.getCanNextPage() || hasNext) {
                                                    setPage(page + 1)
                                                    table.nextPage()
                                                }
                                            }} className="cursor-pointer" /> :
                                                <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 cursor-not-allowed opacity-50">
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
                                            return <DropdownMenuCheckboxItem
                                                key={option}
                                                className="capitalize"
                                                checked={rowsPerPageDropDown === option}
                                                onCheckedChange={() => {
                                                    table.setPageSize(option)
                                                    setRowsPerPage(option)
                                                    setRowsPerPageDropDown(option)
                                                }}>
                                                {option}
                                            </DropdownMenuCheckboxItem>
                                        })
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export default ReferralsPage;