"use client";

import ProductInfo from "@Panel/admin/UserAndProductInfo";
import ProductsPagination from "@Panel/admin/Pagination";
import ProductsListHeader from "@Panel/admin/Header";
import ProductsTHead from "@/Components/panel/admin/THead";
import ProductsListBody from "@Panel/admin/Body";
import { NextPage } from "next";

const products = [
    {
        id: "1",
        product: "ASUS Computer",
        discription: "ASUS Computer for Front-end Developer",
        category: "Computer",
        price: 112,
    },
    {
        id: "2",
        product: "Samsung TV",
        discription: "Full HD Television",
        category: "Electronic",
        price: "1100",
    },
];

const page: NextPage = () => {
    return (
        <>
            <div className='px-4 sm:px-6 lg:px-8 '>
                <ProductsListHeader
                    buttonTitle='Add Product'
                    href='products/addProduct'
                    paragraph='You can see products list in this page.'
                />
                <ProductsListBody>
                    <table className='w-full divide-y divide-gray-300'>
                        <ProductsTHead
                            info="Price"
                            title='ProductName'
                            about='Category'
                        />
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {products.map(
                                ({ product, category, price, id }) => (
                                    <ProductInfo
                                        key={id}
                                        info={price + "$"}
                                        name={product}
                                        // id={id}
                                        about={category}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                    <ProductsPagination />
                </ProductsListBody>
            </div>
        </>
    );
};

export default page;
