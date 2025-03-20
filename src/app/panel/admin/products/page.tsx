"use client";

import { useDeleteProduct, useReadProduct } from "@Helpers/productApi";
import ProductInfo from "@/Components/panel/UserAndProductInfo";
import ProductsPagination from "@/contracts/Pagination";
import ProductsListHeader from "@/Components/panel/Header";
import ProductsListBody from "@/Components/panel/Body";
import ProductsTHead from "@/Components/panel/THead";
import type { Product } from "@Interfaces/product";
import { useEffect, useState } from "react";
import { queryClient } from "@Index/IndexLayout";
import type { NextPage } from "next";
import Link from "next/link";

const page: NextPage = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, refetch, isLoading, isError } =
        useReadProduct(page);
    const { data: response, mutate, isSuccess: isDeleted } = useDeleteProduct();

    const handleDelete = async (id: string) => {
        mutate(id);
        console.log(response);
        queryClient.invalidateQueries({ queryKey: ["products", "page"] });
    };
    useEffect(() => {
        refetch();
    }, [isDeleted]);
    return (
        <div className='px-4 sm:px-6 lg:px-8 '>
            <ProductsListHeader paragraph='You can see all products list in this page.'>
                <div className='mt-4 sm:mt-0 sm:ml-16 md:ml-0 sm:flex-none'>
                    <Link href='/panel/admin/products/add'>
                        <button
                            type='button'
                            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                        >
                            Add Product
                        </button>
                    </Link>
                </div>
            </ProductsListHeader>
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
                                            id={id}
                                            canDelete={false}
                                            canEdit={false}
                                            handleDelete={() =>
                                                handleDelete(id)
                                            }
                                            updateHref={`/panel/admin/products/update/${id}`}
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
    );
};

export default page;
