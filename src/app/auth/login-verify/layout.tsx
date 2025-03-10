'use client';

import { useAppSelector } from '@Libs/hooks';
import { useRouter } from 'next/navigation';
import FormsLayout from "@Auth/FormsLayout";
import React, {useEffect } from 'react';
import useAuth from '@Hooks/useAuth';
import {
    AuthInitialStateInterface,
    authSelector
} from '@Libs/authReducer';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter()
    const {user} = useAuth();
    useEffect(()=>{
        if(user){
            router.push('/panel')
        }
    },[user])
    
    const authState:AuthInitialStateInterface = useAppSelector(authSelector)
    useEffect(()=>{
        const checkVerifyToken = authState.phoneVerifyToken === undefined
        if( checkVerifyToken ) router.push('login');
    },[authState])
    return (
        <FormsLayout title='Verify the code'>{children}</FormsLayout>
    )
}

export default layout