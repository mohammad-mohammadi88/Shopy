"use client";

import { useEffect, useState, type FC } from "react";
import { RotatingLines } from "react-loader-spinner";
import Pagination from "@Contracts/Pagination";
import Course from "@Index/Course/Course";
import {
    type SameCategoryResInterface,
    initialSameCategory,
    fetchSameCategory,
    fetchProduct,
} from "@Helpers/productApi";

interface Props {
    productId: string;
}

const SameCategory: FC<Props> = ({ productId }) => {
    const [page, setPage] = useState(1);
    const [
        {
            data: { category },
        },
        setCategory,
    ] = useState({ data: { category: "" } });
    const [
        {
            data: { total_page, data: products },
            isError,
            isSuccess,
        },
        setState,
    ] = useState<SameCategoryResInterface>(initialSameCategory);
    useEffect(() => {
        async function fetcher() {
            setCategory(await fetchProduct(productId));
        }
        fetcher();
    }, []);

    useEffect(() => {
        async function fetcher() {
            setState(await fetchSameCategory(category, productId, page, 3));
        }
        fetcher();
    }, []);

    return (
        <section className='container mt-16 xl:px-24 mx-auto'>
            <h2 className='font-bold pl-3 text-3xl'>Other Products</h2>
            <div className='flex flex-wrap 2xl:px-28 mt-4'>
                {!isError && !isSuccess && (
                    <div className='mt-6 flex justify-center text-3xl font-bold text-center'>
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
                {total_page == 0 && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        There is no other course with this category on the database!
                    </div>
                )}
                {isError && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        Ops! We have Error
                    </div>
                )}
                {isSuccess && total_page && (
                    <>
                        {products.map(({ body, title, category, id }) => (
                            <Course
                                key={id}
                                body={body}
                                title={title}
                                category={category}
                                id={id}
                            />
                        ))}
                        <div className='w-full'>
                            <Pagination
                                totalPages={total_page}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default SameCategory;
