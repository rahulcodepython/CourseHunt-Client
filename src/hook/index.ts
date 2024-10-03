"use client"
import axios from 'axios';
import React from 'react';

interface MutationProps {
    url: string
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    headers?: {
        'Authorization'?: string
    }
    data?: any
}

export const useMutation = () => {
    const [mutationIsLoading, setMutationIsLoading] = React.useState<boolean>(false);
    const [mutationIsError, setMutationIsError] = React.useState<boolean>(false);
    const [mutationError, setMutationError] = React.useState<string | null>(null);
    const [mutationData, setMutationData] = React.useState<any>(null);
    const [mutationState, setMutationState] = React.useState<'stable' | 'fetching' | 'done'>('stable');

    const mutate = async (props: MutationProps) => {
        setMutationIsLoading(true);
        setMutationIsError(false);
        setMutationError(null);
        setMutationState('fetching');

        try {
            const response = await axios.request(props);
            setMutationData(response.data);
        } catch (error: any) {
            setMutationError(error.message || 'An error occurred');
            setMutationIsError(true);
        } finally {
            setMutationIsLoading(false);
            setMutationState('done');
        }
    }

    return { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState };
}
