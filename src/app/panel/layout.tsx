'use client';

import { showAuthToast } from '@Contracts/toast';
import { redirect } from 'next/navigation';
import useAuth from '@Hooks/useAuth';
import React from 'react';


const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const {user,error,isPending,isSuccess} = useAuth();
    if(error && !user){
        showAuthToast(false,'',0,1,'Please login first')
        redirect('/auth/login')
    }
   
    return (
        <>
            {isPending && <h2>Loading...</h2>}
            {isSuccess && children}
        </>
    )
}

export default layout