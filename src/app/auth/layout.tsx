'use client';

import { ReactNode, useLayoutEffect } from 'react'
import { redirect } from 'next/navigation';
import useAuth from '@Hooks/useAuth';

const layout = ({children}:{children:Readonly<ReactNode>}) => {
    const {user} = useAuth();
    useLayoutEffect(()=>{
        if(user){
            if(user.isAdmin) redirect('/panel/admin')
            else redirect('/panel/user')
        }
    },[user])
    return (
        <>{children}</>
    )
}

export default layout