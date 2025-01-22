import React from 'react'
import { CardFooter } from '@/components/ui/card'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import usePagination from "@/hooks/usePagination"; // Adjust the path to your hook
import ReturnType from "@/hooks/usePagination";

type PaginationControlsProps<T> = {
    pagination: ReturnType<typeof usePagination<T>>;
    accessToken: string | undefined;
};

const PaginationControl = <T,>({
    pagination,
    accessToken,
}: PaginationControlsProps<T>) => {
    return (
        <CardFooter className='p-0 pt-6 flex justify-between'>
            <p className='text-left'>
                Total Courses: {pagination.count}
            </p>
            <div className='text-center flex items-center gap-4'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href='#' onClick={() => pagination.goToPage(pagination.pageNumber - 1, true, accessToken)}
                                aria-disabled={pagination.pageNumber === 1 || pagination.isFetching} />
                        </PaginationItem>
                        {
                            Array.from({ length: pagination.totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink href="#" onClick={() => pagination.goToPage(i + 1, true, accessToken)}>
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }
                        <PaginationItem>
                            <PaginationNext href='#' onClick={() => pagination.goToPage(pagination.pageNumber + 1, true, accessToken)}
                                aria-disabled={pagination.pageNumber === pagination.totalPages || pagination.isFetching} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div>
                <Select onValueChange={(e) => pagination.refreshPageSize(parseInt(e), true, accessToken)}>
                    <SelectTrigger className='gap-2'>
                        <SelectValue placeholder="Page Size" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            [5, 10, 20, 50].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
        </CardFooter>
    )
}

export default PaginationControl
