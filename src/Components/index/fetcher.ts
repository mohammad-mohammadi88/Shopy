import type { Product } from "@Interfaces/product";
import { type ActionInterface, ActionTypes, type initialStateInterface } from "./Courses";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
interface Response {
    data: Product[];
    status: string;
    total_page: number;
}
const FetchDispatch = () :ActionInterface => ({ type: ActionTypes.FETCH });
const SuccessDispatch = (total_page: number, products: Product[]) :ActionInterface => ({
    type: ActionTypes.SUCCESS,
    payload: { total_page, products },
});
const ErrorDispatch = (error: any) :ActionInterface => ({
    type: ActionTypes.ERROR,
    payload: error,
});
const fetchHanler = async (dispatch:any,perPage:number,page:number,state:initialStateInterface) => {
    dispatch(FetchDispatch())
    try {
        const response = await fetch(
            `${baseUrl}products?per_page=${perPage}&page=${page}`,
            {next:{revalidate:300}}
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

export default fetchHanler