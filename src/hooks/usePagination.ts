"use client";
import { PaginationType } from "@/types";
import axios from "axios";
import React from "react";

const usePagination = <T>(data: PaginationType<T>, defaultPageSize: number = 5) => {
    const [results, setResults] = React.useState<T[]>(data.results);
    const [nextPageUrl, setNextPageUrl] = React.useState(data.next);
    const [count, setCount] = React.useState(data.count);
    const [isNext, setIsNext] = React.useState(nextPageUrl !== null);
    const [isFetching, setIsFetching] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(defaultPageSize);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [loadedPages, setLoadedPages] = React.useState<{ [key: number]: T[] }>({ 1: data.results });

    // Calculate total pages needed
    const totalPages = Math.ceil(count / pageSize);

    const generateUrl = (url: string, page: number = pageNumber, page_size: number = pageSize) => {
        return `${url.split("?")[0]}?page=${page}&page_size=${page_size}`;
    }

    const fetchNext = async (url: string, isAuthenticated: boolean, accessToken: string | undefined, page: number) => {
        setIsFetching(true);
        try {
            const response = await axios.get(url, isAuthenticated ? {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            } : {});
            const data: PaginationType<T> = await response.data;

            setLoadedPages((prevPages) => ({
                ...prevPages,
                [page]: data.results,
            }));
            setResults(data.results);
            setNextPageUrl(data.next);
            setCount(data.count);
            setIsNext(data.next !== null);
        } catch (error) {
            console.error("Failed to fetch next page:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const loadMore = async (url: string, isAuthenticated: boolean, accessToken: string | undefined) => {
        setIsFetching(true);
        try {
            const response = await axios.get(url, isAuthenticated ? {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            } : {});
            const data: PaginationType<T> = await response.data;

            setResults([...results, ...data.results]);
            setNextPageUrl(data.next);
            setCount(data.count);
            setIsNext(data.next !== null);
        } catch (error) {
            console.error("Failed to fetch next page:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const goToPage = async (page: number, isAuthenticated: boolean, accessToken: string | undefined) => {
        if (page < 1 || page > totalPages) return; // Prevent navigating out of bounds
        setPageNumber(page);

        // Check if the page is already loaded
        if (loadedPages[page]) {
            setResults(loadedPages[page]);
        } else if (nextPageUrl && isNext) {
            // If the page isn't loaded and `nextPageUrl` exists, fetch data
            await fetchNext(generateUrl(nextPageUrl, page), isAuthenticated, accessToken, page);
        }
    };

    const addData = (data: T) => {
        const updatedPages = { ...loadedPages };
        const pageSizeLimit = pageSize;

        // Add new data to the first page and shift the rest
        const updatedFirstPage = [data, ...updatedPages[1]].slice(0, pageSizeLimit);
        updatedPages[1] = updatedFirstPage;

        // Reassign shifted data to subsequent pages if needed
        let carryOver = updatedPages[1].slice(pageSizeLimit);
        for (let page = 2; page <= totalPages; page++) {
            if (!carryOver.length) break;
            const currentPage = updatedPages[page] || [];
            updatedPages[page] = [...carryOver, ...currentPage].slice(0, pageSizeLimit);
            carryOver = [...currentPage, ...carryOver].slice(pageSizeLimit);
        }

        // Update the loadedPages and results
        setLoadedPages(updatedPages);
        setResults(updatedPages[pageNumber]);
        setCount((prevCount) => prevCount + 1);
    };


    const removeData = (id: string) => {
        const updatedPages = { ...loadedPages };
        const pageSizeLimit = pageSize;

        // Remove the data from the pages
        let carryOver: T[] = [];
        for (let page = 1; page <= totalPages; page++) {
            const currentPage = (updatedPages[page] || []).filter((data: any) => data.id !== id);
            updatedPages[page] = [...currentPage, ...carryOver].slice(0, pageSizeLimit);
            carryOver = currentPage.slice(pageSizeLimit);
        }

        // Update the loadedPages and results
        setLoadedPages(updatedPages);
        setResults(updatedPages[pageNumber] || []);
        setCount((prevCount) => prevCount - 1);
    };


    const updateData = (id: string, changedData: Partial<T>) => {
        const updatedPages = { ...loadedPages };

        for (let page = 1; page <= totalPages; page++) {
            const pageIndex = updatedPages[page]?.findIndex((data: any) => data.id === id);
            if (pageIndex !== undefined && pageIndex !== -1) {
                const existingData = updatedPages[page][pageIndex];
                updatedPages[page][pageIndex] = { ...existingData, ...changedData }; // Merge updated values
                break;
            }
        }

        // Update the loadedPages and results
        setLoadedPages(updatedPages);
        setResults(updatedPages[pageNumber] || []);
    };


    const refreshPageSize = async (newPageSize: number, isAuthenticated: boolean, accessToken: string | undefined) => {
        setPageSize(newPageSize);
        setPageNumber(1); // Reset to the first page
        setLoadedPages({}); // Clear previously loaded pages

        // Fetch data for the first page with the new page size
        if (nextPageUrl) {
            await fetchNext(generateUrl(nextPageUrl, 1, newPageSize), isAuthenticated, accessToken, 1);
        }
    };

    return {
        results,
        nextPageUrl,
        count,
        isNext,
        fetchNext,
        loadMore,
        isFetching,
        addData,
        removeData,
        updateData,
        refreshPageSize,
        pageSize,
        totalPages,
        pageNumber,
        goToPage,
    };
};

export default usePagination;
