'use client';

import type { LoginFormValuesInterface } from "@Interfaces/forms";
import { showAuthToast } from "@Contracts/toast";
import { LoginApi } from "@Helpers/authApi";
import { useRouter } from "next/navigation";
import SignInLayout from '@Auth/signin';
import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import { addPhoneVerifyToken, useAuthDispatch } from "@Context/authentication";

const login: NextPage = () :ReactNode => {
    const router = useRouter()
    const dispatch:any = useAuthDispatch()
    const handleSubmit = async (values:LoginFormValuesInterface) :Promise<void> => {
        const { data, status, errors } = await LoginApi(values)
        showAuthToast( true , 'Your verify code is ' + data?.code , status , 200  , errors )
        if(status === 200){
            dispatch(addPhoneVerifyToken(data.token));
            router.push('login-verify')
        }
    }
    return (
        <SignInLayout handleSubmit={handleSubmit}/>
    )
}

export default login