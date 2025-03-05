import { NextPage } from 'next'
import FormsLayout from "@Auth/FormsLayout"
import VerifyForm from '@Auth/signinVerify'
import { useAppSelector } from '@Libs/hooks'
import { authSelector } from '@Libs/authReducer'
import Router from 'next/router'
import { Bounce, toast } from "react-toastify";
import { VerifyPhoneApi } from "@Apis/api";
import { useLayoutEffect } from 'react'

function handleToasts(status:number,data:any){
    if(status === 200){
        toast.success('Hello '+ data.name, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        Router.push('/dashboard')
    } else {
        toast.error(status === 400 ? data : data.errors.email, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
}
const loginVerify: NextPage = () => {
    const authState = useAppSelector(authSelector)
    useLayoutEffect(()=>{

        if(typeof window !== 'undefined' && authState.phoneVerifyToken === undefined) Router.push('login');
    },[authState])

    async function handleSubmit({code}:any){
        const verifyToken:any = authState.phoneVerifyToken; 
        const { status, data } = await VerifyPhoneApi(code,verifyToken)
        handleToasts(status,data)
    }

    return (
        <FormsLayout title='Verify the code'>
            <VerifyForm handleSubmit={handleSubmit} />
        </FormsLayout>
    )
}

export default loginVerify