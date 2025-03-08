'use client';

import React from 'react'
import useAuth from '@Hooks/useAuth';
import { redirect, useRouter } from 'next/navigation';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { user } = useAuth();
    console.log('user',user)
    const router = useRouter()
    if(user) redirect('/panel')
    return (
        <>{children}</>
    )
}

export default layout