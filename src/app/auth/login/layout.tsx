'use client';

import FormsLayout from "@Auth/FormsLayout";
import { redirect } from 'next/navigation';
import useAuth from '@Hooks/useAuth';
import React from 'react';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { user } = useAuth();
    console.log('user',user)
    if(user) redirect('/panel')
    return (
        <FormsLayout title='Login to Shopy'>
            {children}
        </FormsLayout>
    )
}

export default layout