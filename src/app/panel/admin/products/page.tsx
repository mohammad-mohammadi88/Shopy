"use client";

import ProductInfo from "@Panel/admin/UserAndProductInfo";
import ProductsPagination from "@Panel/admin/Pagination";
import ProductsListHeader from "@Panel/admin/Header";
import ProductsTHead from "@Panel/admin/THead";
import ProductsListBody from "@Panel/admin/Body";
import { NextPage } from "next";
import { useReadProduct } from "@Helpers/productApi";

import { Product } from "@/interfaces/product";
import { useState } from "react";

const page: NextPage = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, isLoading, isError, error } = useReadProduct(page);

    if (error) console.log(error);
    return (
        <>
            <div className='px-4 sm:px-6 lg:px-8 '>
                <ProductsListHeader
                    buttonTitle='Add Product'
                    href='products/addProduct'
                    paragraph='You can see products list in this page.'
                />
                {isLoading && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        Loading products...
                    </div>
                )}
                {data?.total_page < 1 && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        There is no product on the database!
                    </div>
                )}
                {isError && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        Ops! We have Error
                    </div>
                )}
                {isSuccess && data?.total_page > 0 && (
                    <ProductsListBody>
                        <table className='w-full divide-y divide-gray-300'>
                            <ProductsTHead
                                info='Price'
                                title='ProductName'
                                about='Category'
                            />
                            <tbody className='divide-y divide-gray-200 bg-white'>
                                {isSuccess &&
                                    data &&
                                    data?.data?.map(
                                        ({
                                            id,
                                            price,
                                            title,
                                            category,
                                        }: Product) => (
                                            <ProductInfo
                                                key={id}
                                                info={price + "$"}
                                                name={title}
                                                // id={id}
                                                about={category}
                                            />
                                        )
                                    )}
                            </tbody>
                        </table>
                        <ProductsPagination
                            page={page}
                            setPage={setPage}
                            totalPages={data?.total_page}
                        />
                    </ProductsListBody>
                )}
            </div>
        </>
    );
};

export default page;
