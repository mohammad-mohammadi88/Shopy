import Input from "@Contracts/Input";
import { FormikProps } from "formik";
import Link from "next/link";

export interface Option{
    value:string,
    children:string
}
const options:Option[] = [
    {value:"Back-end",children:"Back-end"},
    {value:"Front-end",children:"Front-end"},
    {value:"Mobile",children:"Mobile"},
    {value:"Game",children:"Game"},
    {value:"AI",children:"AI"},
    {value:"Data Science",children:"Data Science"},
    {value:"Desktop",children:"Desktop"},
]

export interface ProductFormValuesInterface{
    product:string,
    price:number,
    discription:string;
    category:string
}
const AddProductForm = ({
    values,
    handleChange,
    handleSubmit,
}:FormikProps<ProductFormValuesInterface>) => {
    const { price, product, discription,category } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className='p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-8'>
                <div className='sm:col-span-1'>
                    <Input
                        name='product'
                        value={product}
                        onChange={handleChange}
                        label='Product name'
                    />
                </div>

                <div className='sm:col-span-1'>
                    <Input
                        name='price'
                        value={price}
                        onChange={handleChange}
                        label='Price'
                        inputType="number"
                    />
                </div>

                <div className='sm:col-span-2 xl:col-span-1'>
                    <Input 
                        as="select"
                        name="category"
                        label="Category"
                        selectedvalue="Back-end"
                        className="resize-y h-auto min-h-10 max-h-32"
                        value={category}
                        onChange={handleChange}
                        options={options}
                    />
                </div>

                <div className='sm:col-span-full'>
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
                    Create product
                </button>
                <Link href="/panel/admin/products">
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
