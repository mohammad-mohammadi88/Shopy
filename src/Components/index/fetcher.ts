import type { Product } from "@Interfaces/product";
import { type ActionInterface, ActionTypes } from "./Courses";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
interface Response {
    data: Product[];
    status: string;
    total_page: number;
}
export const FetchDispatch = (): ActionInterface => ({
    type: ActionTypes.FETCH,
});
export const SuccessDispatch = (
    total_page: number,
    products: Product[]
): ActionInterface => ({
    type: ActionTypes.SUCCESS,
    payload: { total_page, products },
});
export const ErrorDispatch = (error: any): ActionInterface => ({
    type: ActionTypes.ERROR,
    payload: error,
});
const fetchHandler = async (dispatch: any, perPage: number, page: number) => {
    dispatch(FetchDispatch());
    try {
        const response = await fetch(
            `${baseUrl}products?per_page=${perPage}&page=${page}`,
            { next: { revalidate: 300 } }
        );
        if (response.ok) {
            const data: Response = await response.json();
            dispatch(SuccessDispatch(data.total_page, data.data));
        } else {
            throw new Error("Oops! Please refresh");
        }
    } catch (err: any) {
        dispatch(ErrorDispatch(err));
    }
};

export default fetchHandler;
