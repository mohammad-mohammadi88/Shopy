"use client";

import ProductInfo from "@Panel/admin/UserAndProductInfo";
import ProductsPagination from "@Panel/admin/Pagination";
import ProductsListHeader from "@Panel/admin/Header";
import { useDeleteProduct, useReadProduct } from "@Helpers/productApi";
import ProductsListBody from "@Panel/admin/Body";
import ProductsTHead from "@Panel/admin/THead";
import { Product } from "@Interfaces/product";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { showToast } from "@Contracts/toast";
import { queryClient } from "@App/layout";

const page: NextPage = () => {
    const [ page, setPage ] = useState<number>(1);
    const { data, isSuccess, refetch, isLoading, isError } = useReadProduct(page);
    const { data:response, mutate,isSuccess:isDeleted,error } = useDeleteProduct()
    const handleDelete = (id:string) => {
        mutate(id)
        console.log(response)
        queryClient.invalidateQueries({queryKey:['products',"page"]})
        showToast(false,'This Product deleted successfully!', isDeleted ? 200 : 500,200,error)
    }
    useEffect(()=>{
        refetch()
    },[isDeleted])
    return (
        <div className='px-4 sm:px-6 lg:px-8 '>
            <ProductsListHeader
                buttonTitle='Add Product'
                href='products/add'
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
                                            id={id}
                                            handleDelete={() => handleDelete(id)}
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
