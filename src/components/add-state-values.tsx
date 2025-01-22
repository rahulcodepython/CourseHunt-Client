"use client"
import { useAuthStore } from '@/context/AuthStore'
import React from 'react'

const AddStateValues = ({ access, refresh }: {
    access: string | undefined
    refresh: string | undefined
}) => {
    const loggedInUser = useAuthStore(state => state.LoggedInUser)
    loggedInUser(access, refresh)
    return <></>
}

export default AddStateValues
