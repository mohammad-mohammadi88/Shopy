'use client'

import { useDeleteProduct, useReadUserProducts } from "@Helpers/productApi";
import ProductInfo from "@Panel/admin/UserAndProductInfo";
import ProductsPagination from "@Panel/admin/Pagination";
import ProductsListHeader from "@Panel/admin/Header";
import ProductsListBody from "@Panel/admin/Body";
import ProductsTHead from "@Panel/admin/THead";
import type { Product } from "@Interfaces/product";
import { useEffect, useState } from "react";
import { queryClient } from "@App/layout";
import capitalize from '@Helpers/capitalize';
import Dashboard from '@Panel/Dashboard';
import useAuth from '@Hooks/useAuth';
import type { NextPage } from 'next';

const page:NextPage = () => {
    const { user } = useAuth()
    const [ page, setPage ] = useState<number>(1);
    const { data, isSuccess, refetch, isLoading, isError } = useReadUserProducts(page,user.id); 
    const { data:response, mutate,isSuccess:isDeleted} = useDeleteProduct()

    const handleDelete = async (id:string) => {
        mutate(id)
        console.log(response)
        queryClient.invalidateQueries({queryKey:['products',"user","page"]})
    }
    useEffect(()=>{
        refetch()
    },[isDeleted])
    return (
        
        <Dashboard header='Dashboard'>
            <div className='ml-4 sm:ml-6 lg:ml-8 mt-3'>Welcome {capitalize(user.name)}</div>
            <div className='px-4 sm:px-6 lg:px-8 '>
            <ProductsListHeader
                buttonTitle='Add Product'
                href='products/add'
                paragraph='You can see your products list in this page.'
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
                                            canDelete={true}
                                            canEdit={true}
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
        </Dashboard>
    )
}

export default page