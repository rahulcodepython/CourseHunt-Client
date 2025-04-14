import React from 'react'
import { cn } from '@/lib/utils'

const Main = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <main className={cn("flex flex-col min-h-[100dvh] pt-14", className)}>
            {children}
        </main>
    )
}

export default Main