"use client"
import { Button } from '@/components/ui/button'
import { enrollCourse } from '@/server/action'
import React from 'react'

const EnrollButton = ({ id, access_token }: {
    id: string,
    access_token: string | undefined
}) => {
    return (
        <Button className="w-full" onClick={() => enrollCourse(id, access_token)}>Enroll Now</Button>
    )
}

export default EnrollButton
