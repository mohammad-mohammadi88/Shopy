import { Dispatch, SetStateAction } from "react";
import Input from "@Contracts/Input";
import { FormikProps } from "formik";
import type { UserFormValuesInterface } from "./AddUserModal";

interface Props {
    setShowAddUser: Dispatch<SetStateAction<boolean>>;
}
const AddProductForm = ({
    setShowAddUser,
    values,
    handleChange,
    handleSubmit,
}: Props & FormikProps<UserFormValuesInterface>) => {
    const { phone, name, discription } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className='p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-8'>
                <div className='sm:col-span-2'>
                    <Input
                        name='userName'
                        value={name}
                        setValue={handleChange}
                        label='User name'
                    />
                </div>

                <div className='sm:col-span-2'>
                    <Input
                        name='phone'
                        value={phone}
                        setValue={handleChange}
                        label='Phone'
                        inputType="string"
                    />
                </div>

                <div className='sm:col-span-4'>
                    <Input 
                        as="textarea"
                        name="discription"
                        label="Discription"
                        className="resize-y h-auto min-h-10 max-h-32"
                        rows="5"
                        value={discription}
                        setValue={handleChange}
                    />
                </div>
            </div>

            <div className='p-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center'>
                <button
                    type='submit'
                    className='mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700 '
                >
                    Create User
                </button>
                <button
                    onClick={() => setShowAddUser(false)}
                    type='button'
                    className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AddProductForm;
