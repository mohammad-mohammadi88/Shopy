"use client";

import AddProductForm from "@Panel/admin/Products/AddProductForm";
import { ProductFormInterFace } from "@Interfaces/forms";
import { useCreateProduct } from "@Helpers/productApi";
import { number, object, string } from "yup";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { NextPage } from "next";
import { queryClient } from "@/app/layout";

const initialValues: ProductFormInterFace = {
    product: "",
    price: 0,
    discription: "",
    category: "Back-end",
};

const validationSchema = object().shape({
    product: string().required().min(4).max(25),
    price: number().required().min(1),
    discription: string().required().min(5).max(1000),
    category: string().required(),
});

const AddProduct: NextPage = () => {
    const { mutate } = useCreateProduct();
    const router = useRouter()
    const handleSubmit = (values: ProductFormInterFace) => {
        mutate(values);
        queryClient.invalidateQueries({queryKey:['products',"page",1]})
        router.push('/panel/admin/products')
    };
    return (
        <>
            <h2 className='text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b'>
                Create Product
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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

export default AddProduct;
