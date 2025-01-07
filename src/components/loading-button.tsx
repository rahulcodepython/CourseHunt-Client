import React from 'react'
import { Button } from './ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

const LoadingButton = ({
    loading,
    children,
    loadingText = 'Loading...',
    classname,
    ...props
}: {
    loading: boolean
    children: React.ReactNode
    loadingText?: string
    classname?: string
    props?: any
}) => {
    return (
        loading ? (
            <Button disabled className={`gap-2 ${classname}`} {...props}>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
            </Button>
        ) : children
    )
}

export default LoadingButton