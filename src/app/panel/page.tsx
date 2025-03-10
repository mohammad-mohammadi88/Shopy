'use client';

import { removeUserToken } from '@Helpers/userToken';
import useAuth from '@Hooks/useAuth';
import { NextPage } from 'next'
import Link from 'next/link';
import { ReactNode } from 'react'
import { queryClient } from '../layout';

const page:NextPage = () :ReactNode => {
    const { user, refetch } = useAuth()
    // const handleLogout = async () => {
    //     await removeUserToken();
    //     queryClient.removeQueries({ queryKey: ['user_info'] })
    //     await refetch()
    // }
    return (
        <>
            {user &&
            <>
                <div>{user?.name}</div>
                <Link href="panel/admin">admin</Link><br />
                {/* <Link href='/'><button onClick={handleLogout}>logout</button></Link> */}
            </>}
        </>
    )
    
}

export default page
