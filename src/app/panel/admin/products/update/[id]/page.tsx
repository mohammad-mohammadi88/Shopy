"use client";

import UpdateProductForm from "@Panel/admin/Products/UpdateProductForm";
import { ProductFormInterFace } from "@Interfaces/forms";
import { useCreateProduct, useReadOneProduct, useUpdateProduct } from "@Helpers/productApi";
import { number, object, string } from "yup";
import { useParams, useRouter } from "next/navigation";
import { Formik } from "formik";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { queryClient } from "@/app/layout";


const validationSchema = object().shape({
    title: string().required().min(4).max(25),
    price: number().required().min(1),
    body: string().required().min(5).max(1000),
    category: string().required()
});

const UpdateProduct:NextPage = () => {
    const params:any = useParams()
    const router = useRouter()
    const { data } = useReadOneProduct(params?.id)
    const { mutate, error } = useUpdateProduct(params?.id);
    console.log("🚀 ~ error:", error)
    const handleSubmit = (values: any) => {
        mutate(values);
        queryClient.invalidateQueries({queryKey:['products',"page"]})
        router.push('/panel/admin/products')
    };
    if(data && data.product){
        const initialValues = data.product
        
        return (
            <>
                <h2 className='text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b'>
                    Update Product
                </h2>
                {initialValues &&
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleSubmit, ...props }) => (
                        <UpdateProductForm
                            handleChange={handleChange}
                            values={values}
                            handleSubmit={handleSubmit}
                            {...props}
                            />
                    )}
                </Formik>}
            </>
        );
    } else {
        return <div className='mt-6 text-3xl font-bold text-center'>
            Loading product...
        </div>
    }
};

export default UpdateProduct;
