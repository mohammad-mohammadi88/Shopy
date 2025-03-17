"use client";

import { useReadOneUser, useUpdateUser } from "@Helpers/userApi";
import UpdateUserForm from "@Panel/UpdateUserForm";
import { useParams, useRouter } from "next/navigation";
import { boolean, object, string } from "yup";
import { queryClient } from "@App/layout";
import { Formik } from "formik";
import type { NextPage } from "next";
import Dashboard from "@Panel/Dashboard";

const validationSchema = object().shape({
    name: string().min(2).max(25),
    phone: string()
        .matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/, "your mobile is not valid!")
        .min(11)
        .max(15),
    isAdmin: boolean(),
});

const UpdateUser: NextPage = () => {
    const params: any = useParams();
    const router = useRouter();
    const { data } = useReadOneUser(params?.id);
    const { mutate } = useUpdateUser(params?.id);
    const handleSubmit = (values: any) => {
        mutate(values);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        router.push("/panel/admin/users");
    };
    if (data && data.user) {
        const initialValues = data.user;
        return (
            <Dashboard header='Your acount'>
                <h2 className='text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b'>
                    Update User
                </h2>
                {initialValues && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, ...props }) => (
                            <UpdateUserForm
                                handleChange={handleChange}
                                values={{ ...values, isAdmin: undefined }}
                                {...props}
                            />
                        )}
                    </Formik>
                )}
            </Dashboard>
        );
    } else {
        return (
            <div className='mt-6 text-3xl font-bold text-center'>
                Loading User...
            </div>
        );
    }
};

export default UpdateUser;
