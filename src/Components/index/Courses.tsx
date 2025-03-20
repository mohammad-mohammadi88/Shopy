"use client";

import { Suspense, useEffect, useReducer, useState, type FC } from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import useWindowWidth from "@Hooks/useWindowWidth";
import type { Product } from "@Interfaces/product";
import { Bounce, toast } from "react-toastify";
import Pagination from "@Contracts/Pagination";
import Course from "./Courses/Course";

interface Response {
    data: Product[];
    status: string;
    total_page: number;
}

interface ActionInterface {
    type: string;
    payload?: any;
}

interface initialStateInterface {
    isLoading: boolean;
    products: Product[];
    total_page: number | undefined;
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

enum ActionTypes {
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
const FetchDispatch = () :ActionInterface => ({ type: ActionTypes.FETCH });
const SuccessDispatch = (total_page: number, products: Product[]) :ActionInterface => ({
    type: ActionTypes.SUCCESS,
    payload: { total_page, products },
});
const ErrorDispatch = (error: any) :ActionInterface => ({
    type: ActionTypes.ERROR,
    payload: error,
});
const Courses: FC = () => {
    const windowWidth = useWindowWidth()
    const [perPage, setPerPage] = useState(windowWidth < 1024 ? 8 : 9)
    const [page, setPage] = useState<number>(1);
    const [
        { isError, isLoading, isSuccess, error, products, total_page },
        dispatch,
    ] = useReducer(reducer, initialState);

    const fetchHanler = async () => {
        dispatch(FetchDispatch())
        try {
            const response = await fetch(
                `http://localhost:5000/api/products?per_page=${perPage}&page=${page}`
            );
            if(response.ok){
                const data: Response = await response.json();
                dispatch(SuccessDispatch(data.total_page,data.data))
                const statusCode = 200;
                return {
                    data,
                    statusCode,
                };
            } else {
                throw new Error('Oops! Please refresh')
            }
        } catch (err: any) {
            console.log(err);
            dispatch(ErrorDispatch(err))
            const data = err;
            const statusCode = 500;
            return {
                data,
                statusCode,
            };
        }
    };
    useEffect(()=>{
        fetchHanler()
    },[isError])
    useEffect(() => {
        fetchHanler();
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
