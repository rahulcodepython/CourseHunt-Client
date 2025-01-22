"use client";
import React from "react";
import axios, { AxiosRequestConfig } from "axios";

const useMutation = () => {
    const [mutationIsLoading, setMutationIsLoading] = React.useState<boolean>(false);
    const [mutationIsError, setMutationIsError] = React.useState<boolean>(false);
    const [mutationError, setMutationError] = React.useState<string | null>(null);
    const [mutationData, setMutationData] = React.useState<any>(null);
    const [mutationState, setMutationState] = React.useState<"stable" | "fetching" | "done">("stable");
    let onSuccessCallback: ((data: any) => void) | null = null;
    let onErrorCallback: ((error: any) => void) | null = null;

    const mutate = async (options: AxiosRequestConfig) => {
        setMutationIsLoading(true);
        setMutationIsError(false);
        setMutationError(null);
        setMutationState("fetching");

        try {
            const response = await axios.request(options);
            setMutationData(response.data);

            // Execute the onSuccess callback if it is set
            if (onSuccessCallback) {
                onSuccessCallback(response.data);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "An error occurred";
            setMutationError(errorMessage);
            setMutationIsError(true);

            // Execute the onError callback if it is set
            if (onErrorCallback) {
                onErrorCallback(errorMessage);
            }
        } finally {
            setMutationIsLoading(false);
            setMutationState("done");
        }
    };

    // Set the onSuccess callback
    const onSuccess = (callback: (data: any) => void) => {
        onSuccessCallback = callback;
    };

    // Set the onError callback
    const onError = (callback: (error: any) => void) => {
        onErrorCallback = callback;
    };

    return {
        mutate,
        onSuccess,
        onError,
        mutationIsLoading,
        mutationIsError,
        mutationError,
        mutationData,
        mutationState,
    };
};

export default useMutation;
