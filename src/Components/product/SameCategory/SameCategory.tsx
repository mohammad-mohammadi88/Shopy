"use client";

import {
    fetchProduct,
    fetchSameCategory,
    initialSameCategory,
    SameCategoryResInterface,
} from "@Helpers/productApi";
import { Suspense, useEffect, useLayoutEffect, useState, type FC } from "react";
import Pagination from "@Contracts/Pagination";
import Course from "@Index/Courses/Course";

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
    ] = useState({ data: { category: "Front-end" } });
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
            <h2 className='font-bold pl-3 text-3xl '>Other Products</h2>
            <div className='flex flex-wrap 2xl:px-28 mt-4'>
                {!isError && !isSuccess && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        Loading products...
                    </div>
                )}
                {total_page == 0 && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        There is no product on the database!
                    </div>
                )}
                {isError && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        Ops! We have Error
                    </div>
                )}
                <Suspense fallback={<></>}>
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
                </Suspense>
            </div>
        </section>
    );
};

export default SameCategory;
