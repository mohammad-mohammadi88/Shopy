import Checkbox from "@Contracts/Checkbox";
import type { FormikProps } from "formik";
import Button from "@Contracts/Button";
import Input from "@Contracts/Input";
import Link from "next/link";

const UpdateProductForm = ({
    values,
    handleChange,
    handleSubmit
}:FormikProps<any>) => {
    const { phone, name, isAdmin } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className='p-6 grid  grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-8'>
                <div className='sm:col-span-2'>
                    <Input
                        name='name'
                        value={name}
                        onChange={handleChange}
                        label='User name'
                    />
                </div>

                <div className='sm:col-span-2'>
                    <Input
                        name='phone'
                        value={phone}
                        onChange={handleChange}
                        label='Phone'
                    />
                </div>
                {isAdmin === true && 
                    <div className='col-span-full'>
                        <Checkbox 
                            label="Is this user an admin (not admin)"
                            name="isAdmin"
                            defaultChecked={isAdmin}
                            />
                    </div>
                }
            </div>

            <div className='p-6 py-4 border-t border-gray-200 flex items-center'>
                <Button
                    className='mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700'
                    value="Update User"
                />
                   
                <Link href="/panel/admin/users">
                    <button
                        type='button'
                        className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Cancel
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default UpdateProductForm;
