import React, { Suspense } from 'react'

const GithubCallbackLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}

export default GithubCallbackLayout
