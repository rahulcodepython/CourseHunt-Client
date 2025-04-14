import React from 'react'
import { cn } from '@/lib/utils'

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <section className={cn("container mx-auto w-full flex flex-col", className)}>{children}</section>
    )
}

export default Section