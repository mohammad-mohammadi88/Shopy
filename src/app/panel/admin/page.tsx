"use client";

import { useDeleteProduct, useReadUserProducts } from "@Helpers/productApi";
import ProductsPagination from "@Contracts/Pagination";
import ProductInfo from "@Panel/UserAndProductInfo";
import type { Product } from "@Interfaces/product";
import { queryClient } from "@Index/IndexLayout";
import ProductsListHeader from "@Panel/Header";
import capitalize from "@Helpers/capitalize";
import { useEffect, useState } from "react";
import ProductsListBody from "@Panel/Body";
import ProductsTHead from "@Panel/THead";
import Dashboard from "@Panel/Dashboard";
import useAuth from "@Hooks/useAuth";
import type { NextPage } from "next";
import Link from "next/link";
import { RotatingLines } from "react-loader-spinner";

const page: NextPage = () => {
    const { user } = useAuth();
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, refetch, isLoading, isError } =
        useReadUserProducts(page, user.id);
    const { mutate, isSuccess: isDeleted } = useDeleteProduct();

    const handleDelete = async (id: string) => {
        mutate(id);
        queryClient.invalidateQueries({
            queryKey: ["products", "user","page"],
        });
    };
    useEffect(() => {
        refetch();
    }, [isDeleted]);
    return (
        <Dashboard header='Dashboard'>
            <div className='ml-4 sm:ml-6 lg:ml-8 mt-3'>
                Welcome {capitalize(user.name)}
            </div>
            <div className='px-4 sm:px-6 lg:px-8 '>
                <ProductsListHeader paragraph='You can see your products list in this page.'>
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
                        <RotatingLines
                            visible={true}
                            width="96"
                            strokeColor="blue"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
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
                                                canDelete={true}
                                                canEdit={true}
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
        </Dashboard>
    );
};

export default page;
