import React from 'react'
import Main from '@/components/main'

const BlogsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Main>
            {children}
        </Main>
    )
}

export default BlogsLayout