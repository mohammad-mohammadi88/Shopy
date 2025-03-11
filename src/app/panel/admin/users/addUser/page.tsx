'use client';

import { FC } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import AddUserForm, { UserFormValuesInterface } from "@Panel/admin/Users/AddUserForm";

const initialValues:UserFormValuesInterface = {
    name: "",
    phone: "",
    discription: ""
};

const validationSchema = object().shape({
    name: string().required().min(4).max(25),
    phone:string().required().matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/ ,'your mobile is not valid!').min(11).max(15),
    discription: string().required().min(5).max(200),
});

const AddUser: FC = () => {
    const handleSubmit = (values:UserFormValuesInterface) => {console.log(values)};
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
                {({ values, handleChange, handleSubmit,...props }) => (
                    <AddUserForm
                        handleChange={handleChange}
                        values={values}
                        handleSubmit={handleSubmit}
                        {...props}
                        />
                    )}
            </Formik>
        </>
    );
};

export default AddUser;
