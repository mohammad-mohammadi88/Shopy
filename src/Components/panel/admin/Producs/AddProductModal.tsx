import React, { Dispatch, FC, SetStateAction } from "react";
import { Formik } from "formik";
import { number, object, string } from "yup";
import Modal from "../Modal";
import AddProductForm from "./AddProductForm";

interface Props {
    setShowAddProduct: Dispatch<SetStateAction<boolean>>;
    showAddProduct: boolean;
}
export interface ProductFormValuesInterface{
    product:string,
    price:number,
    discription:string
}
const initialValues:ProductFormValuesInterface = {
    product: "",
    price: 0,
    discription: "",
};

const validationSchema = object().shape({
    product: string().required().min(4).max(25),
    price: number().required().min(1),
    discription: string().required().min(5).max(1000),
});

const ProductModal: FC<Props> = ({ setShowAddProduct, showAddProduct }) => {
    const handleSubmit = (values:ProductFormValuesInterface) => {console.log(values)};
    return (
        <Modal showModal={showAddProduct} setShowModal={setShowAddProduct}>
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
                        setShowAddProduct={setShowAddProduct}
                        {...props}
                    />
                )}
            </Formik>
        </Modal>
    );
};

export default ProductModal;
