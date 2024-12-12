"use client"
import React from 'react';

const useMutation = () => {
    const [mutationIsLoading, setMutationIsLoading] = React.useState<boolean>(false);
    const [mutationIsError, setMutationIsError] = React.useState<boolean>(false);
    const [mutationError, setMutationError] = React.useState<string | null>(null);
    const [mutationData, setMutationData] = React.useState<any>(null);
    const [mutationState, setMutationState] = React.useState<'stable' | 'fetching' | 'done'>('stable');

    const mutate = async (actionFunc: () => Promise<any>) => {
        setMutationIsLoading(true);
        setMutationIsError(false);
        setMutationError(null);
        setMutationState('fetching');

        try {
            const response = await actionFunc();
            setMutationData(response.data);
        } catch (error: any) {
            setMutationError(error.response?.data?.error);
            setMutationIsError(true);
        } finally {
            setMutationIsLoading(false);
            setMutationState('done');
        }
    }
    return { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState };
}

export default useMutation;