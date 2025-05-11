"use client";

import { productValidationSchema } from "@Contracts/validationSchema";
import AddProductForm from "@Panel/admin/Products/AddProductForm";
import type { ProductFormInterFace } from "@Interfaces/forms";
import { useCreateProduct } from "@Helpers/productApi";
import { queryClient } from "@Index/IndexLayout";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { NextPage } from "next";

const initialValues: ProductFormInterFace = {
    title: "",
    price: 0,
    image: undefined,
    body: "",
    category: "Back-end",
};

const page:NextPage = () => {
    const { mutate } = useCreateProduct();
    const router = useRouter()
    const handleFormSubmit = (values: ProductFormInterFace) => {
        mutate(values);
        queryClient.invalidateQueries({queryKey:['products',"page"]})
        router.push('/panel/admin/products')
    };
    return (
        <>
            <h2 className='text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b'>
                Create Product
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={productValidationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ values, handleChange, handleSubmit, ...props }) => (
                    <AddProductForm
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

export default page;
