import Input from "@Contracts/Input";
import { FormikProps } from "formik";
import Link from "next/link";

export interface UserFormValuesInterface{
    name:string,
    phone:string,
    discription:string;
}
const AddProductForm = ({
    values,
    handleChange,
    handleSubmit,
}: FormikProps<UserFormValuesInterface>) => {
    const { phone, name, discription } = values;
    return (
        <form onSubmit={handleSubmit} autoComplete={"off"}>
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

                <div className='sm:col-span-4'>
                    <Input 
                        as="textarea"
                        name="discription"
                        label="Discription"
                        className="resize-y h-auto min-h-10 max-h-32"
                        rows="5"
                        value={discription}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className='p-6 py-4 border-t border-gray-200 flex items-center'>
                <button
                    type='submit'
                    className='mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700 '
                >
                    Create User
                </button>
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

export default AddProductForm;
