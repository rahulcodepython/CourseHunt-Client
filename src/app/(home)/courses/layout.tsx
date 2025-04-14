import Main from '@/components/main'
import React from 'react'

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Main>
            {children}
        </Main>
    )
}

export default CourseLayout