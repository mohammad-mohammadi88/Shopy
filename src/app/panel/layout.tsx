'use client';

import { showAuthToast } from '@Contracts/toast';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import useAuth from '@Hooks/useAuth';

const layout = ({
    children,
}: Readonly<{
    children: ReactNode;
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