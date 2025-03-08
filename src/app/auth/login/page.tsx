'use client';

import { addPhoneVerifyToken } from "@Libs/authReducer";
import { showToast } from "@Contracts/auth/toast";
import { useAppDispatch } from '@Libs/hooks';
import FormsLayout from "@Auth/FormsLayout";
import { Dispatch } from '@reduxjs/toolkit';
import { LoginApi } from "@/helpers/authApi";
import SignInLayout from '@Auth/signin';
import type { NextPage } from 'next';
import { ReactNode } from 'react';
import { LoginFormValuesInterface } from "@Contracts/auth";
import { useRouter } from "next/navigation";

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
        <FormsLayout title='Login to Shopy'>
            <SignInLayout handleSubmit={handleSubmit}/>
        </FormsLayout>
    )
}

export default login