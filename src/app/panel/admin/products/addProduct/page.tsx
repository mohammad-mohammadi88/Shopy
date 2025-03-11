'use client';
import { FC } from "react";
import { Formik } from "formik";
import { number, object, string } from "yup";
import AddProductForm, { ProductFormValuesInterface } from "@Panel/admin/Products/AddProductForm";



const initialValues:ProductFormValuesInterface = {
    product: "",
    price: 0,
    discription: "",
    category: "Back-end"
};

const validationSchema = object().shape({
    product: string().required().min(4).max(25),
    price: number().required().min(1),
    discription: string().required().min(5).max(1000),
    category: string().required(),
});

const AddProduct: FC = () => {
    const handleSubmit = (values:ProductFormValuesInterface) => {console.log(values)};
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
                {({ values, handleChange, handleSubmit,...props }) => (
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
