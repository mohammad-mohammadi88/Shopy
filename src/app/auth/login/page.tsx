'use client';

import { LoginFormValuesInterface } from "@Contracts/auth";
import { addPhoneVerifyToken } from "@Libs/authReducer";
import { showToast } from "@Contracts/auth/toast";
import { useAppDispatch } from '@Libs/hooks';
import { LoginApi } from "@/helpers/authApi";
import { useRouter } from "next/navigation";
import { Dispatch } from '@reduxjs/toolkit';
import SignInLayout from '@Auth/signin';
import type { NextPage } from 'next';
import { ReactNode } from 'react';

const login: NextPage = () :ReactNode => {
    const router = useRouter()
    const dispatch:Dispatch = useAppDispatch()
    const handleSubmit = async (values:LoginFormValuesInterface) :Promise<void> => {
        const { data, status, errors } = await LoginApi(values)
        showToast( true , 'Your verify code is ' + data?.code , status , 200  , errors )
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