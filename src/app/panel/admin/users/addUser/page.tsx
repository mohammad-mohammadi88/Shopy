'use client';

import { SignUpFormValuesInterface } from "@Interfaces/forms";
import AddUserForm from "@Panel/admin/Users/AddUserForm";
import { showAuthToast } from "@/contracts/toast";
import { boolean, object, string } from "yup";
import { signUpApi } from "@Helpers/authApi";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { FC } from "react";

const initialValues:SignUpFormValuesInterface = {
    name: "",
    phone: "",
    isAdmin: false
};

const validationSchema = object().shape({
    name: string().required().min(2).max(25),
    phone:string().required().matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/ ,'your mobile is not valid!').min(11).max(15),
    isAdmin: boolean().required(),
});

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
                validationSchema={validationSchema}
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
