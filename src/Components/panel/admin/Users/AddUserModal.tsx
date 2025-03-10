import React, { Dispatch, FC, SetStateAction } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import Modal from "../Modal";
import AddUserForm from "./AddUserForm";

interface Props {
    setShowAddUser: Dispatch<SetStateAction<boolean>>;
    showAddUser: boolean;
}
export interface UserFormValuesInterface{
    name:string,
    phone:string,
    discription:string
}
const initialValues:UserFormValuesInterface = {
    name: "",
    phone: "",
    discription: "",
};

const validationSchema = object().shape({
    User: string().required().min(4).max(25),
    price:string().required().min(11).max(15).matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/ ,'your mobile is not valid!'),
    discription: string().required().min(5).max(200),
});

const UserModal: FC<Props> = ({ setShowAddUser, showAddUser }) => {
    const handleSubmit = (values:UserFormValuesInterface) => {console.log(values)};
    return (
        <Modal showModal={showAddUser} setShowModal={setShowAddUser}>
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
                        setShowAddUser={setShowAddUser}
                        {...props}
                    />
                )}
            </Formik>
        </Modal>
    );
};

export default UserModal;
