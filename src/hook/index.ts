"use client"
import React from 'react';

export const useFnCall = (fn: (...args: any[]) => Promise<any>) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<any>(null);

    const call = async (...args: any[]) => {
        setIsLoading(true);
        setIsError(false);
        setError(null);

        try {
            const response = await fn(...args);
            setData(response.data);
        } catch (error: any) {
            setError(error.message || 'An error occurred');
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, isError, error, data, call };
}
