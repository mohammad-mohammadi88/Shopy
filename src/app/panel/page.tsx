'use client';

import { removeUserToken } from '@Helpers/userToken';
import useAuth from '@Hooks/useAuth';
import { NextPage } from 'next'
import Link from 'next/link';
import { ReactNode } from 'react'
import { queryClient } from '../layout';

const index:NextPage = () :ReactNode => {
    // const router = useRouter()
    const { user, isLoading, refetch } = useAuth()
    
    if(isLoading){ return <h1>Loading...</h1>}
    const handleLogout = async () => {

        await removeUserToken();
        queryClient.removeQueries({ queryKey: ['user_info'] })
    }
    // console.log(error)
    if(user){
        return (
            <>
                <div>{user?.name}</div>
                <Link href='/'><button onClick={handleLogout}>logout</button></Link>
            </>
        )
    }
}

export default index
