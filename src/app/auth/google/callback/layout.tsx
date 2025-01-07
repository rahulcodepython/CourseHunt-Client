import React, { Suspense } from 'react'

const GoogleCallbackLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}

export default GoogleCallbackLayout
