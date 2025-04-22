'use client';

import { type InitialAuthStateInterface, useAuthState } from '@Context/authentication';
import { useStoreUserToken } from '@Helpers/userToken';
import { VerifyPhoneApi } from "@Helpers/authApi";
import { showAuthToast } from '@Contracts/toast';
import { useRouter } from 'next/navigation';
import VerifyForm from '@Auth/signinVerify';
import type { ReactNode } from 'react';
import type { NextPage } from 'next';


const loginVerify: NextPage = () :ReactNode => {
    const router = useRouter()
    const authState:InitialAuthStateInterface = useAuthState()
    const { mutate } = useStoreUserToken()
    async function handleSubmit(code:number) : Promise<void> {
        const verifyToken:string = authState?.phoneVerifyToken ?? ''; 
        const { status, data, errors } = await VerifyPhoneApi(code,verifyToken)
        showAuthToast( false , 'Hello ' + data?.name , status , 200 , errors)
        if(status === 200){
            const { token } = data;
            mutate(token)
            data.isAdmin ? router.push('/panel/admin') : router.push('/panel/user')
        }
    }

    return <VerifyForm handleSubmit={handleSubmit} />
}


export default loginVerify