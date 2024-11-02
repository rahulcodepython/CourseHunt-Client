"use client";
import React from 'react';
import Loading from '@/components/Loading';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const IndexLayout = ({ children }: { children: React.ReactNode }) => {

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}

export default IndexLayout;