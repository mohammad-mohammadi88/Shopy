'use client';

import { SignUpFormValuesInterface } from "@Interfaces/forms";
import { showAuthToast } from "@Contracts/toast";
import { signUpApi } from "@Helpers/authApi";
import { useRouter } from "next/navigation";
import SignInLayout from "@Auth/signup";
import type { NextPage } from "next";
import { ReactNode } from "react";

const register: NextPage = () :ReactNode => {
    const router = useRouter()
    const handleSubmit = async (values:SignUpFormValuesInterface) :Promise<void> =>{
        const { status, errors } = await signUpApi(values)
        showAuthToast( false , 'Your new account created!' , status , 201  , errors)
        if(status === 201) router.push('login')
    }
    return <SignInLayout handleSubmit={handleSubmit}/>
};

export default register;
