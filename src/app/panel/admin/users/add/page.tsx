'use client';

import type { SignUpFormValuesInterface } from "@Interfaces/forms";
import AddUserForm from "@Panel/admin/Users/AddUserForm";
import { showAuthToast } from "@Contracts/toast";
import { boolean, object, string } from "yup";
import { signUpApi } from "@Helpers/authApi";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import type { FC } from "react";
import { userValidationSchema } from "@/app/panel/user/update/[id]/page";

const initialValues:SignUpFormValuesInterface = {
    name: "",
    phone: "",
    isAdmin: false
};

const AddUser: FC = () => {
    const router = useRouter()
    const handleSubmit = async (values:SignUpFormValuesInterface) :Promise<void> =>{
        const { status, errors } = await signUpApi(values)
        showAuthToast( false , 'New user account created!' , status , 201  , errors)
        if(status === 201) router.push('/panel/admin/users')
    }
    return (
        <>
            <h2 className='text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b'>
                Create User
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={userValidationSchema}
                onSubmit={handleSubmit}
                >
                {({ values, handleChange,...props }) => (
                    <AddUserForm
                        handleChange={handleChange}
                        values={values}
                        {...props}
                    />
                )}
            </Formik>
        </>
    );
};

export default AddUser;
