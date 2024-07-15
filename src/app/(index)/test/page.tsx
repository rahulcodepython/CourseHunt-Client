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
import { ArrowUpDown, ChevronDown } from "lucide-react"
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

export type RecordType = {
    id: string
    "Course Name": string
    "Enrollment Date": string
    "Status": string
    "Progress": string
}

const Home = () => {
    const ROWS_PER_PAGE = 2
    const [data, setData] = React.useState<RecordType[]>([{
        id: "1",
        "Course Name": "Introduction to Programming",
        "Enrollment Date": "2023-01-01",
        "Status": "Active",
        "Progress": "80%"
    },
    {
        id: "2",
        "Course Name": "Advanced Web Development",
        "Enrollment Date": "2023-02-15",
        "Status": "Inactive",
        "Progress": "40%"
    },
    {
        id: "3",
        "Course Name": "Data Structures and Algorithms",
        "Enrollment Date": "2023-03-10",
        "Status": "Active",
        "Progress": "90%"
    },
    {
        id: "4",
        "Course Name": "Machine Learning Basics",
        "Enrollment Date": "2023-04-05",
        "Status": "Active",
        "Progress": "70%"
    }])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [filters, setFilters] = React.useState<string>('')
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(ROWS_PER_PAGE)
    const [totalRecords, setTotalRecords] = React.useState<number>(0)
    const [hasNext, setHasNext] = React.useState(false)
    const [page, setPage] = React.useState(1)
    const [isFetching, setIsFetching] = React.useState(false)
    const [hasMore, setHasMore] = React.useState(true)

    const rowsOption: (number)[] = [2, 4, 6]

    const columnsList: string[] = [
        'Course Name',
        'Enrollment Date',
        'Status',
        'Progress',
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
    columnsList.forEach((columnName) => {
        columns.push({
            id: columnName,
            accessorKey: columnName,
            header: ({ column }) => {
                return <Button variant="ghost" className="px-0 capitalize"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    {columnName}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue(columnName)}</div>
            ),
        });
    });
    columns.push({
        id: "actions",
        accessorKey: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const info = row.original;
            return <div className={'flex items-center gap-2'}>
                <Button>
                    View Details
                </Button>
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
            // await fetch(`${process.env.API_URL}api/get-sessions-regions/`, {
            //     method: "GET",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // }).then((response) => {
            //     if (response.ok) {
            //         return response.json()
            //     }
            // }).then((response) => {
            //     setSessionsList(response.sessions)
            //     setRegionsList(response.regions)

            // }).catch((error) => {
            //     console.error('There has been a problem with your fetch operation:', error)
            // })
        }
        handler()
    }, [])

    React.useEffect(() => {
        const handler = async () => {
            // if (!hasMore) return
            // setIsFetching(true)
            // await fetch(`${process.env.API_URL}api/get-records/?page=${page}`, {
            //     method: "GET",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `JWT ${localStorage.getItem("key")}`
            //     }
            // }).then((response) => {
            //     if (response.ok) {
            //         return response.json()
            //     }
            //     throw new Error('Network response was not ok.')
            // }
            // ).then((response) => {
            //     console.log(response)
            //     setHasNext(response.next)
            //     setTotalRecords(response.count)
            //     setData([...data, ...response.results])
            //     table.setPageIndex(page)
            // }).catch((error) => {
            //     console.error('There has been a problem with your fetch operation:', error)
            // }).finally(() => setIsFetching(false))
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
        <div className="w-full p-4">
            <div className="flex items-center justify-end py-4">
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
                        // onKeyDown={async e => {
                        //     if (e.key === 'Enter') {
                        //         await fetch(``, {
                        //             method: "GET",
                        //             headers: {
                        //                 'Content-Type': 'application/json',
                        //                 'Authorization': `JWT ${localStorage.getItem("key")}`
                        //             },
                        //         }).then((response) => {
                        //             if (response.ok) {
                        //                 return response.json()
                        //             }
                        //         }
                        //         ).then((response) => {
                        //             setData(response)
                        //         }).catch((error) => {
                        //             console.error('There has been a problem with your fetch operation:', error)
                        //         })
                        //     }
                        // }}
                        className="max-w-lg"
                    />
                </div>
            </div>
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
                                            <TableCell key={cell.id}>
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
            <div className={'flex items-center justify-center gap-4'}>
                <Pagination className={'w-fit mx-0'}>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => {
                                if (table.getCanPreviousPage()) {
                                    setPage(page - 1)
                                    table.previousPage()
                                }
                            }} className="cursor-pointer" />
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
                            <PaginationNext onClick={() => {
                                if (table.getCanNextPage() || hasNext) {
                                    setPage(page + 1)
                                    table.nextPage()
                                }
                            }} className="cursor-pointer" />
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
                                        checked={rowsPerPage === option}
                                        onCheckedChange={() => {
                                            table.setPageSize(option)
                                            setRowsPerPage(option)
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
        </div>
    )
}

export default Home