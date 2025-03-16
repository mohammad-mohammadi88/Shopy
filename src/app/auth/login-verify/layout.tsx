'use client';

import { useAppSelector } from '@Libs/hooks';
import { redirect } from 'next/navigation';
import FormsLayout from "@Auth/FormsLayout";
import { useEffect } from 'react';
import {
    AuthInitialStateInterface,
    authSelector
} from '@Libs/authReducer';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {    
    const authState:AuthInitialStateInterface = useAppSelector(authSelector)
    useEffect(()=>{
        const checkVerifyToken = authState.phoneVerifyToken === undefined
        if( checkVerifyToken ) redirect('login');
    },[authState])
    return (
        <FormsLayout title='Verify the code'>{children}</FormsLayout>
    )
}

export default layout