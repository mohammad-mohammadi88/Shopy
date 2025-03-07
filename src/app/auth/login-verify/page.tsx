'use client';

import { useAppDispatch, useAppSelector } from '@Libs/hooks'
import { VerifyPhoneApi } from "@Helpers/api";
import FormsLayout from "@Auth/FormsLayout"
import VerifyForm from '@Auth/signinVerify'
import { Dispatch } from '@reduxjs/toolkit'
import { ReactNode, useLayoutEffect } from 'react'
import { NextPage } from 'next'
import {
    AuthInitialStateInterface,
    addUserName,
    authSelector
} from '@Libs/authReducer'
import { showToast } from '@Contracts/auth/toast';
import { useRouter } from 'next/navigation';

const loginVerify: NextPage = () :ReactNode => {
    const authState:AuthInitialStateInterface = useAppSelector(authSelector)
    const dispatch:Dispatch = useAppDispatch()
    const router = useRouter()
    useLayoutEffect(()=>{
        const checkVerifyToken = typeof window !== 'undefined' && authState.phoneVerifyToken === undefined
        if( checkVerifyToken ) router.push('login');
    },[authState])

    async function handleSubmit(code:number) : Promise<void> {
        const verifyToken:string = authState.phoneVerifyToken ?? ''; 
        const { status, data, errors } = await VerifyPhoneApi(code,verifyToken)
        const { token, name:userName } = data
        dispatch(addUserName(userName))
        showToast( false , 'Hello ' + data.name , status , 200 , errors)
        if(status === 200) router.push('/panel')
    }

    return (
        <FormsLayout title='Verify the code'>
            <VerifyForm handleSubmit={handleSubmit} />
        </FormsLayout>
    )
}


export default loginVerify