'use client';

import { storeUserToken } from '@Helpers/userToken';
import { showAuthToast } from '@Contracts/toast';
import { VerifyPhoneApi } from "@Helpers/authApi";
import { useRouter } from 'next/navigation';
import VerifyForm from '@Auth/signinVerify';
import type { NextPage } from 'next';
import { ReactNode } from 'react';
import { InitialAuthStateInterface, useAuthState } from '@Context/authentication';
import useAuth from '@Hooks/useAuth';


const loginVerify: NextPage = () :ReactNode => {
    const router = useRouter()
    const authState:InitialAuthStateInterface | undefined = useAuthState()
    async function handleSubmit(code:number) : Promise<void> {
        const verifyToken:string = authState?.phoneVerifyToken ?? ''; 
        const { status, data, errors } = await VerifyPhoneApi(code,verifyToken)
        showAuthToast( false , 'Hello ' + data?.name , status , 200 , errors)
        if(status === 200){
            const { token } = data;
            storeUserToken(token)
            data.isAdmin ? router.push('/panel/admin') : router.push('/panel/user')
        }
    }

    return (
        <VerifyForm handleSubmit={handleSubmit} />
    )
}


export default loginVerify