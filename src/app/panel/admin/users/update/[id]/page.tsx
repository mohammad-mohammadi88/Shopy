"use client";

import { userValidationSchema } from "@Contracts/validationSchema";
import { useReadOneUser, useUpdateUser } from "@Helpers/userApi";
import { useParams, useRouter } from "next/navigation";
import UpdateUserForm from "@Panel/UpdateUserForm";
import { queryClient } from "@Index/IndexLayout";
import { Bars } from "react-loader-spinner";
import type { NextPage } from "next";
import { Formik } from "formik";


const UpdateUser:NextPage = () => {
    const params:any = useParams()
    const router = useRouter()
    const { data } = useReadOneUser(params?.id)
    const { mutate } = useUpdateUser(params?.id);
    const handleSubmit = (values: any) => {
        mutate(values);
        queryClient.invalidateQueries({queryKey:['users']})
        router.push('/panel/admin/users')
    };
    if(data && data.user){
        const initialValues = data.user
        return (
            <>
                <h2 className='text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b'>
                    Update User
                </h2>
                {initialValues &&
                    <Formik
                        initialValues={initialValues}
                        validationSchema={userValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, ...props }) => (
                            <UpdateUserForm
                                handleChange={handleChange}
                                values={values}
                                {...props}
                            />
                        )}
                    </Formik>
                }
            </>
        );
    } else {
        return <div className='mt-6 text-3xl font-bold text-center'>
            <Bars
                height="80"
                width="80"
                color="blue"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
};

export default UpdateUser;