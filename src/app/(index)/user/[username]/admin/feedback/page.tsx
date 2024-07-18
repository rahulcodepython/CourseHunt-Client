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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { StarIcon } from "@/utils/icons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type RecordType = {
    id: string
    username: string
    date: string
    message: string
    star: number
}

const FeedbackPage = () => {
    const ROWS_PER_PAGE = 2
    const [data, setData] = React.useState<RecordType[]>([
        {
            id: '1',
            username: 'John Doe',
            date: '2021-08-12',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, lacinia ipsum. Fusce ut nunc nec mi dapibus ultricies. Donec in mi ac libero lacinia ultrices. Sed nec lacus nec odio fermentum scelerisque. Ut nec velit et libero ultricies fermentum. In hac habitasse platea dictumst. Nam nec semper turpis. Sed nec lacus nec odio fermentum scelerisque. Ut nec velit et libero ultricies fermentum. In hac habitasse platea dictumst. Nam nec semper turpis.',
            star: 4
        },
        {
            id: '2',
            username: 'Jane Doe',
            date: '2021-08-12',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, lacinia ipsum. Fusce ut nunc nec mi dapibus ultricies. Donec in mi ac libero lacinia ultrices. Sed nec lacus nec odio fermentum scelerisque. Ut nec velit et libero ultricies fermentum. In hac habitasse platea dictumst. Nam nec semper turpis. Sed nec lacus nec odio fermentum scelerisque. Ut nec velit et libero ultricies fermentum. In hac habitasse platea dictumst. Nam nec semper turpis.',
            star: 3
        }
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
            key: "username",
            label: 'Username'
        },
        {
            key: "date",
            label: 'Date'
        },
        {
            key: "message",
            label: 'Message'
        },
        {
            key: "star",
            label: 'Star'
        },
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
        columns.push({
            id: columnValue.key,
            accessorKey: columnValue.key,
            header: ({ column }) => {
                return <Button variant="ghost" className="capitalize"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    {columnValue.label}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            },
            cell: ({ row }) => {
                return <div className="capitalize">
                    {
                        columnValue.key === 'message' ?
                            truncate(row.getValue(columnValue.key)) :
                            columnValue.key === 'star' ?
                                ratingStart(row.getValue(columnValue.key)) : row.getValue(columnValue.key)
                    }
                </div>
            },
        });
    });
    columns.push({
        id: "actions",
        accessorKey: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const info = row.original;
            return <div className={'flex items-center gap-2'}>
                <Dialog>
                    <DialogTrigger>
                        <Button>
                            Show Details
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>{info.username}</DialogTitle>
                            <DialogDescription className="pt-4">
                                {info.message}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        },
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

    const truncate = (str: string) => {
        return str.length > 50 ? str.substring(0, 50) + '...' : str
    }

    const ratingStart = (rating: number) => {
        return <div className="flex gap-1">
            {
                Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                        key={index}
                        className={`w-5 h-5 ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                    />
                ))
            }
        </div>
    }

    return (
        <div className="w-full p-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between py-4">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>
                                All Feedback
                            </CardTitle>
                            <CardDescription>
                                Inspect your feedback and stay on top of important updates.
                            </CardDescription>
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
                                                    <TableCell key={cell.id} className={`${cell.column.columnDef.id === 'select' || cell.column.columnDef.id === 'actions' ? "px-4" : "px-8"}`}>
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
                <CardFooter className="justify-center gap-4">
                    <Pagination className={'w-fit mx-0'}>
                        <PaginationContent>
                            <PaginationItem>
                                {
                                    table.getCanPreviousPage() ? <PaginationPrevious onClick={() => {
                                        if (table.getCanPreviousPage()) {
                                            setPage(page - 1)
                                            table.previousPage()
                                        }
                                    }} className="cursor-pointer" /> : <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 cursor-not-allowed opacity-50">
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </span>
                                }
                            </PaginationItem>
                            {
                                Array.from({ length: ((totalRecords / rowsPerPage) + (totalRecords % rowsPerPage === 0 ? 0 : 1)) }, (_, i) => {
                                    return (
                                        <PaginationItem key={i} onClick={() => {
                                            setPage(i + 1)
                                            table.setPageIndex(i)
                                        }} className="cursor-pointer">
                                            <PaginationLink className={
                                                page === i + 1 ?
                                                    `bg-secondary-foreground text-white hover:bg-secondary-foreground hover:text-white`
                                                    : ''}>{i + 1}</PaginationLink>
                                        </PaginationItem>
                                    )
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
                </CardFooter>
            </Card>
        </div>
    )
}

export default FeedbackPage;