'use client';

import { type InitialAuthStateInterface, useAuthState } from '@Context/authentication';
import FormsLayout from "@Auth/FormsLayout";
import { redirect } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

const layout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {    
    const authState:InitialAuthStateInterface | undefined = useAuthState()
    useEffect(()=>{
        if( authState?.phoneVerifyToken === undefined ) redirect('login');
    },[authState])
    return <FormsLayout title='Verify the code'>{children}</FormsLayout>
}

export default layout