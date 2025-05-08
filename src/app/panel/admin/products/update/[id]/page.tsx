"use client";

import { useReadOneProduct, useUpdateProduct } from "@Helpers/productApi";
import UpdateProductForm from "@Panel/admin/Products/UpdateProductForm";
import { useParams, useRouter } from "next/navigation";
import { queryClient } from "@Index/IndexLayout";
import { number, object, string } from "yup";
import { Bars } from "react-loader-spinner";
import type { NextPage } from "next";
import { Formik } from "formik";
import { productValidationSchema } from "../../add/page";

const UpdateProduct:NextPage = () => {
    const params:any = useParams()
    const router = useRouter()
    const { data } = useReadOneProduct(params?.id)
    const { mutate, error } = useUpdateProduct(params?.id);
    console.log("🚀 ~ error:", error)
    const handleFormSubmit = (values: any) => {
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
                    validationSchema={productValidationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, handleChange, ...props }) => (
                        <UpdateProductForm
                            handleChange={handleChange}
                            values={values}
                            {...props}
                        />
                    )}
                </Formik>}
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

export default UpdateProduct;
