"use client";
import { userValidationSchema } from "@Contracts/validationSchema";
import { useReadOneUser, useUpdateUser } from "@Helpers/userApi";
import { useParams, useRouter } from "next/navigation";
import UpdateUserForm from "@Panel/UpdateUserForm";
import { queryClient } from "@Index/IndexLayout";
import Dashboard from "@Panel/Dashboard";
import type { NextPage } from "next";
import { Formik } from "formik";

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
