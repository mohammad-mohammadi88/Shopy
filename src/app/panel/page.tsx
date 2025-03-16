'use client';

import useAuth from '@Hooks/useAuth';
import type { NextPage } from 'next';
import type { ReactNode } from 'react'
import Link from 'next/link';

const page:NextPage = () :ReactNode => {
    const { user } = useAuth()

    return (
        <>
            {user &&
            <>
                <div>{user?.name}</div>
                <Link href="panel/admin">admin</Link><br />
            </>}
        </>
    )
    
}

export default page
