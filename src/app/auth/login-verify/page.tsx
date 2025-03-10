'use client';

import { storeUserToken } from '@Helpers/userToken';
import { showToast } from '@Contracts/auth/toast';
import { VerifyPhoneApi } from "@Helpers/authApi";
import { useAppSelector } from '@Libs/hooks';
import { useRouter } from 'next/navigation';
import VerifyForm from '@Auth/signinVerify';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import {
    AuthInitialStateInterface,
    authSelector
} from '@Libs/authReducer';

const loginVerify: NextPage = () :ReactNode => {
    const router = useRouter()
    const authState:AuthInitialStateInterface = useAppSelector(authSelector)

    async function handleSubmit(code:number) : Promise<void> {
        const verifyToken:string = authState.phoneVerifyToken ?? ''; 
        const { status, data, errors } = await VerifyPhoneApi(code,verifyToken)
        showToast( false , 'Hello ' + data?.name , status , 200 , errors)
        if(status === 200){
            const { token } = data;
            storeUserToken(token)
            router.push('/panel')
        }
    }

    return (
        <VerifyForm handleSubmit={handleSubmit} />
    )
}


export default loginVerify