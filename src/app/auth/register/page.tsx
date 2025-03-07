'use server';

import SignInLayout from "@Auth/signup";
import type { NextPage } from "next";
import FormsLayout from "@Auth/FormsLayout"
import { ReactNode } from "react";
import { SignUpFormValuesInterface } from "@Contracts/auth";
import { signUpApi } from "@Helpers/api";
import { showToast } from "@/contracts/auth/toast";

const register: NextPage = () :ReactNode => {
    const handleSubmit = async (values:SignUpFormValuesInterface) :Promise<void> =>{
        const { status, errors } = await signUpApi(values)
        showToast( false , 'Your new account created!' , status , 201  , errors)
        if(status === 201) ''
    }
    return (
        <FormsLayout title="Sign up to Shopy">
            <SignInLayout handleSubmit={handleSubmit}/>
        </FormsLayout>
    );
};

export default register;
