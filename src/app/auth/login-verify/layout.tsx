'use client';

import { redirect } from 'next/navigation';
import FormsLayout from "@Auth/FormsLayout";
import { useEffect } from 'react';
import { InitialAuthStateInterface, useAuthState } from '@Context/authentication';


const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {    
    const authState:InitialAuthStateInterface | undefined = useAuthState()
    useEffect(()=>{
        if( authState?.phoneVerifyToken === undefined ) redirect('login');
    },[authState])
    return (
        <FormsLayout title='Verify the code'>{children}</FormsLayout>
    )
}

export default layout