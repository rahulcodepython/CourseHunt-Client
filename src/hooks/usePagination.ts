"use client"
import { PaginationType } from '@/types';
import axios from 'axios';
import React from 'react';

const usePagination = <T>(data: PaginationType<T>) => {
    const [results, setResults] = React.useState<T[]>(data.results)
    const [nextPageUrl, setnextPageUrl] = React.useState(data.next)
    const [count, setCount] = React.useState(data.count)
    const [is_next, setIsNext] = React.useState(nextPageUrl !== null)
    const [isFetching, setIsFetching] = React.useState(false)


    const fetchNext = async (url: string, isAuthenticated: boolean, access_token: string | undefined) => {
        setIsFetching(true)
        try {
            const response = await axios.get(url, isAuthenticated ? {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            } : {})
            const data: PaginationType<T> = await response.data

            setResults([...results, ...data.results])
            setnextPageUrl(data.next)
            setCount(data.count)
            setIsNext(data.next !== null)
        } catch (error) {

        } finally {
            setIsFetching(false)
        }
    }

    const addData = (data: T) => {
        const newData = [data, ...results]
        const updatedCount = count + 1;

        setResults(newData)
        setCount(updatedCount)
    }

    const removeData = (id: string) => {
        const filteredResults = results.filter((data: any) => data.id !== id);
        const updatedCount = count - 1;

        setResults(filteredResults);
        setCount(updatedCount);
    }

    const updateData = (id: string, data: T) => {
        const index = results.findIndex((data: any) => data.id === id)
        results[index] = data
        setResults([...results])
    }

    return { results, nextPageUrl, count, is_next, fetchNext, isFetching, addData, removeData, updateData };
}

export default usePagination;