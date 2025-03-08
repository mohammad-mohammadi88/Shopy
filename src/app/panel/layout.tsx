'use client';

import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import useAuth from '@Hooks/useAuth';


const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const {user,error} = useAuth();
    const router = useRouter()
    if(error && !user){
        redirect('/auth/login')
    }
   
    return (
        <>{children}</>
    )
}

export default layout