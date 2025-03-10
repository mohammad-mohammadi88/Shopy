'use client';

import { showToast } from '@Contracts/auth/toast';
import { useRouter } from 'next/navigation';
import useAuth from '@Hooks/useAuth';
import React from 'react';


const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const {user,error,isPending,isSuccess} = useAuth();
    const router = useRouter()
    if(error && !user){
        showToast(false,'',0,1,'Please login first')
        router.push('/auth/login')
    }
   
    return (

        <>
            {isPending && <h2>Loading...</h2>}
            {isSuccess && children}
        </>
    )
}

export default layout