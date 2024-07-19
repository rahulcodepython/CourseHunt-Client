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
import { ArrowUpDown, CheckIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Field, FieldArray, Form, Formik } from "formik"
import { Label } from "@/components/ui/label"

type RecordType = {
    id: string
    name: string
    date: string
    duration: number
    chapter: string
    price: number
    offer: number
    cuponCode: string
    instructor: string
}
type CourseBasicDataType = {
    name: string
    date: string
    duration: number
    chapter: number
    price: number
    offer: number
    cuponCode: string
    instructor: string
}
type CourseChapterDataType = {
    chapters: { label: string, lessons: string[] }[]
}

const CoursesPage = () => {
    const ROWS_PER_PAGE = 2
    const [data, setData] = React.useState<RecordType[]>([
        {
            id: "1",
            name: "Course 1",
            date: "2021-10-01",
            duration: 10,
            chapter: "Chapter 1",
            price: 100,
            offer: 0,
            cuponCode: "Cupon Code 1",
            instructor: "Instructor 1",
        },
        {
            id: "2",
            name: "Course 2",
            date: "2021-10-02",
            duration: 20,
            chapter: "Chapter 2",
            price: 200,
            offer: 0,
            cuponCode: "Cupon Code 2",
            instructor: "Instructor 2",
        },
        {
            id: "3",
            name: "Course 3",
            date: "2021-10-03",
            duration: 30,
            chapter: "Chapter 3",
            price: 300,
            offer: 0,
            cuponCode: "Cupon Code 3",
            instructor: "Instructor 3",
        },
        {
            id: "4",
            name: "Course 4",
            date: "2021-10-04",
            duration: 40,
            chapter: "Chapter 4",
            price: 400,
            offer: 0,
            cuponCode: "Cupon Code 4",
            instructor: "Instructor 4",
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
        { key: 'name', label: 'Course Name' },
        { key: 'date', label: 'Published Date' },
        { key: 'duration', label: 'Duration' },
        { key: 'chapter', label: 'Chapter' },
        { key: 'price', label: 'Price' },
        { key: 'offer', label: 'Offer' },
        { key: 'cuponCode', label: 'Cupon Code' },
        { key: 'instructor', label: 'Instructor' },
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
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue(columnValue.key)}</div>
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
                    Edit Content
                </Button>
                <Button variant={'destructive'}>
                    Delete
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

    return (
        <div className="w-full p-4">
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
                            <CreateCourse />
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
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

const CreateCourse = () => {
    const [tabValue, setTabValue] = React.useState<string>('course-basic')
    const [tabsList, setTabsList] = React.useState<string[]>(['course-basic', 'course-chapter'])
    const [pageIndex, setPageIndex] = React.useState<number>(0)
    const [totalChapter, setTotalChapter] = React.useState<number>(0)
    const [courseBasicData, setCourseBasicData] = React.useState<CourseBasicDataType>({
        name: '',
        date: '',
        duration: 0,
        chapter: 0,
        price: 0,
        offer: 0,
        cuponCode: '',
        instructor: '',
    })
    const [courseChapterData, setCourseChapterData] = React.useState<CourseChapterDataType | null>(null)

    React.useEffect(() => {
        setTabValue(tabsList[pageIndex])
    }, [pageIndex])

    return <Dialog>
        <DialogTrigger>
            <Button>
                Create Course
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-7xl">
            <DialogHeader className="space-y-0">
                <DialogTitle className="pb-6 text-2xl">Create Course hi {tabsList.length}</DialogTitle>
                <DialogDescription>
                    <Card>
                        <CardContent className="pt-6 max-h-[500px] h-full overflow-y-scroll">
                            <Tabs defaultValue={tabsList[0]} value={tabValue} onValueChange={setTabValue} className="w-full">
                                <TabsContent value="course-basic" className="mt-0">
                                    <CourseBasic setTotalChapter={setTotalChapter} courseBasicData={courseBasicData} setCourseBasicData={setCourseBasicData} setPageIndex={setPageIndex} />
                                </TabsContent>
                                <TabsContent value="course-chapter" className="mt-0">
                                    <CourseChapter totalChapter={totalChapter} setCourseChapterData={setCourseChapterData} setPageIndex={setPageIndex} tabsList={tabsList} />
                                </TabsContent>
                                {
                                    tabsList.slice(2, tabsList.length).map((tab, i) => {
                                        return <TabsContent key={i} value={tab} className="mt-0">
                                            {tab}
                                        </TabsContent>
                                    })
                                }
                            </Tabs>
                        </CardContent>
                        <CardFooter className="border-t p-6 justify-end gap-6">
                            <Button onClick={() => {
                                if (pageIndex > 0) {
                                    setPageIndex(pageIndex - 1)
                                }
                            }} disabled={pageIndex === 0} className="pl-2.5 items-center">
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <Button onClick={() => {
                                console.log("Course Basic Data", courseBasicData)
                                console.log("Course Chapter Data", courseChapterData)
                                if (pageIndex < tabsList.length - 1) {
                                    setPageIndex(pageIndex + 1)
                                }
                            }} disabled={pageIndex === tabsList.length - 1} className="pr-2.5 items-center">
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}

const CourseBasic = ({ setTotalChapter, courseBasicData, setCourseBasicData, setPageIndex }:
    {
        setTotalChapter: React.Dispatch<React.SetStateAction<number>>,
        courseBasicData: CourseBasicDataType,
        setCourseBasicData: React.Dispatch<React.SetStateAction<CourseBasicDataType>>,
        setPageIndex: React.Dispatch<React.SetStateAction<number>>
    }) => {
    const [submited, setSubmited] = React.useState<boolean>(false)

    React.useEffect(() => {
        setTimeout(() => {
            setSubmited(false)
        }, 2000)
    }, [submited])

    return <Formik initialValues={courseBasicData} onSubmit={values => setCourseBasicData?.(values)}>
        {({ values, handleChange, handleSubmit }) => {
            return <Form className="grid grid-cols-1 gap-4">
                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Course Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter course name"
                        className="mt-1"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="date" className="block text-sm font-medium text-muted-foreground">Published Date</Label>
                    <Input
                        type="date"
                        id="date"
                        name="date"
                        className="mt-1"
                        value={values.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="duration" className="block text-sm font-medium text-muted-foreground">Duration</Label>
                    <Input
                        type="number"
                        id="duration"
                        name="duration"
                        placeholder="Enter duration"
                        className="mt-1"
                        value={values.duration}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="chapter" className="block text-sm font-medium text-muted-foreground">Chapter</Label>
                    <Input
                        type="text"
                        id="chapter"
                        name="chapter"
                        placeholder="Enter chapter"
                        className="mt-1"
                        value={values.chapter}
                        onChange={(e) => {
                            setTotalChapter(parseInt(e.target.value))
                            handleChange(e)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="price" className="block text-sm font-medium text-muted-foreground">Price</Label>
                    <Input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        className="mt-1"
                        value={values.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="offer" className="block text-sm font-medium text-muted-foreground">Offer</Label>
                    <Input
                        type="number"
                        id="offer"
                        name="offer"
                        placeholder="Enter offer"
                        className="mt-1"
                        value={values.offer}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="cuponCode" className="block text-sm font-medium text-muted-foreground">Cupon Code</Label>
                    <Input
                        type="text"
                        id="cuponCode"
                        name="cuponCode"
                        placeholder="Enter cupon code"
                        className="mt-1"
                        value={values.cuponCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="instructor" className="block text-sm font-medium text-muted-foreground">Instructor</Label>
                    <Input
                        type="text"
                        id="instructor"
                        name="instructor"
                        placeholder="Enter instructor"
                        className="mt-1"
                        value={values.instructor}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end">
                    {
                        submited ? <Button type="button">
                            <CheckIcon className="h-4 w-4 mr-2" />
                            Saved Changes
                        </Button> : <Button onClick={() => {
                            handleSubmit()
                            setSubmited(true)
                            setPageIndex(pre => pre + 1)
                        }} type="submit">
                            Save Changes
                        </Button>
                    }
                </div>
            </Form>
        }}
    </Formik>
}

const CourseChapter = ({ totalChapter, setCourseChapterData, setPageIndex, tabsList }:
    {
        totalChapter: number,
        setCourseChapterData: React.Dispatch<React.SetStateAction<CourseChapterDataType | null>>,
        setPageIndex: React.Dispatch<React.SetStateAction<number>>,
        tabsList: string[]
    }) => {
    const [lessonValue, setLessonValue] = React.useState<string>('')
    const [submited, setSubmited] = React.useState<boolean>(false)

    React.useEffect(() => {
        setTimeout(() => {
            setSubmited(false)
        }, 2000)
    }, [submited])

    const AddChapterLessonsInTabsList = (values: {
        chapters: {
            label: string;
            lessons: never[];
        }[];
    }) => {
        values.chapters.map((value, i) => {
            value.lessons.map((lesson, j) => {
                tabsList.push(`chapter-${i + 1}-lessson-${j + 1}`)
            })
        })
    }

    return <Formik initialValues={{
        chapters: Array.from({ length: totalChapter }, () => ({ label: '', lessons: [] }))
    }} onSubmit={values => {
        setCourseChapterData?.(values)
        setSubmited(true)
        setPageIndex(pre => pre + 1)
        AddChapterLessonsInTabsList(values)
    }}>
        {
            ({ values, handleSubmit }) => {
                return <Form>
                    <FieldArray name="chapters">
                        {
                            ({ push, remove }) => {
                                return <Accordion type="single" collapsible className="w-full">
                                    {
                                        values.chapters.map((_, i) => {
                                            return <AccordionItem key={i} value={`item-${i + 1}`} className="last:border-b-0">
                                                <AccordionTrigger className="hover:no-underline">
                                                    <CustomField name={`chapters.${i}.label`} placeholder={'Lesson Name'} />
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6">
                                                    <FieldArray name={`chapters.${i}.lessons`}>
                                                        {({ push, remove }) => {
                                                            return <div className="flex flex-col gap-4">
                                                                <div className="flex items-center gap-6">
                                                                    <Input value={lessonValue} onChange={e => setLessonValue(e.target.value)} />
                                                                    <Button onClick={() => {
                                                                        if (lessonValue.length > 0) {
                                                                            push(lessonValue)
                                                                            setLessonValue('')
                                                                        }
                                                                    }} type="button">
                                                                        Add Lesson
                                                                    </Button>
                                                                </div>
                                                                <div className="flex flex-col gap-4">
                                                                    {
                                                                        values.chapters[i].lessons.map((lesson, j) => {
                                                                            return <div key={j} className="flex items-center gap-6">
                                                                                <p className="w-full bg-accent rounded-md p-2">{lesson}</p>
                                                                                <Button onClick={() => {
                                                                                    remove(j)
                                                                                }} type="button">
                                                                                    Remove Lesson
                                                                                </Button>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        }}
                                                    </FieldArray>
                                                </AccordionContent>
                                            </AccordionItem>
                                        })
                                    }
                                    <div className="flex justify-end items-center pt-4">
                                        {
                                            submited ? <Button type="button">
                                                <CheckIcon className="h-4 w-4 mr-2" />
                                                Saved Changes
                                            </Button> : <Button
                                                onClick={() => handleSubmit()} type="submit">
                                                Save Changes
                                            </Button>
                                        }
                                    </div>
                                </Accordion>
                            }
                        }
                    </FieldArray>
                </Form>
            }
        }
    </Formik>
}

const CustomField = ({ ...props }) => {
    return <Field {...props} className="flex h-10 w-full bg-accent rounded-md px-3 py-2 mr-6 text-sm placeholder:text-muted-foreground focus:outline-none" />
}

const EditCourse = () => {
    return (
        <div>
            Edit Course
        </div>
    )
}

export default CoursesPage