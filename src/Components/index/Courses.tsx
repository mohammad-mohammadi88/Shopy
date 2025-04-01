"use client";

import { Suspense, useEffect, useReducer, useState, type FC } from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import useWindowWidth from "@Hooks/useWindowWidth";
import type { Product } from "@Interfaces/product";
import { Bounce, toast } from "react-toastify";
import Pagination from "@Contracts/Pagination";
import Course from "./Courses/Course";
import fetchHanler from "./fetcher";


export interface ActionInterface {
    type: string;
    payload?: any;
}

export interface initialStateInterface {
    isLoading: boolean;
    products: Product[];
    total_page?: number;
    error: any;
    isError: boolean;
    isSuccess: boolean;
}

const initialState: initialStateInterface = {
    isLoading: false,
    products: [],
    total_page: undefined,
    error: null,
    isError: false,
    isSuccess: false,
};

export enum ActionTypes {
    FETCH = "course/fetch",
    SUCCESS = "course/success",
    ERROR = "course/error",
}
const reducer = (
    state: initialStateInterface,
    action: ActionInterface
): initialStateInterface => {
    switch (action.type) {
        case ActionTypes.FETCH:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            };
        case ActionTypes.SUCCESS:
            const { total_page, products } = action.payload;
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                isError: false,
                total_page,
                products,
            };
        case ActionTypes.ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
                isSuccess: false,
            };
        default:
            return state;
    }
};

const Courses: FC = () => {
    const windowWidth = useWindowWidth()
    const [perPage, setPerPage] = useState(windowWidth < 1024 ? 8 : 9)
    const [page, setPage] = useState<number>(1);
    const [
        state,
        dispatch,
    ] = useReducer(reducer, initialState);

    const { isError, isLoading, isSuccess, products, total_page } = state;
    useEffect(()=>{
        fetchHanler(dispatch,perPage,page)
    },[isError])
    useEffect(() => {
        fetchHanler(dispatch,perPage,page);
    },[page,perPage]);
    useEffect(() => {
        const newPerPage = windowWidth < 1024 ? 8 : 9
        if(newPerPage !== perPage) setPerPage(newPerPage) 
    },[windowWidth]);
    useEffect(()=>{
        isError && toast.error('Oops! Please refresh the page to see products', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
        })
    },[isError])
    return (
        <main className='container xl:px-24 mx-auto'>
            <div className='flex px-2  items-center' id='courses'>
                <h2 className='text-3xl inline'>Courses</h2> &ensp;
                <CodeBracketIcon height={32} />
            </div>
            <div className='flex flex-wrap 2xl:px-28 mt-4'>
                {isLoading && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        Loading products...
                    </div>
                )}
                {total_page && total_page < 1 && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        There is no product on the database!
                    </div>
                )}
                {isError && (
                    <div className='mt-6 text-3xl font-bold text-center'>
                        Ops! We have Error
                    </div>
                )}
                <Suspense fallback={<div className='mt-6 text-3xl font-bold text-center'>
                    Loading products...
                </div>}>
                    {isSuccess && total_page && !isLoading && <>
                        {products.map(({body,title,category,id})=><Course key={id} body={body} title={title} category={category} id={id}/>)}
                        <div className="w-full">
                            <Pagination totalPages={total_page} page={page} setPage={setPage}/>
                        </div>
                    </>}
                </Suspense>
            </div>
        </main>
    );
};

export default Courses;
