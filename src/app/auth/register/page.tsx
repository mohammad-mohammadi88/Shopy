'use client';

import SignInLayout from "@Auth/signup";
import type { NextPage } from "next";
import FormsLayout from "@Auth/FormsLayout"
import { ReactNode } from "react";
import { SignUpFormValuesInterface } from "@Contracts/auth";
import { signUpApi } from "@/helpers/authApi";
import { showToast } from "@/contracts/auth/toast";
import { useRouter } from "next/navigation";

const register: NextPage = () :ReactNode => {
    const router = useRouter()
    const handleSubmit = async (values:SignUpFormValuesInterface) :Promise<void> =>{
        const { status, errors } = await signUpApi(values)
        showToast( false , 'Your new account created!' , status , 201  , errors)
        if(status === 201) router.push('login')
    }
    return (
        <FormsLayout title="Sign up to Shopy">
            <SignInLayout handleSubmit={handleSubmit}/>
        </FormsLayout>
    );
};

export default register;
