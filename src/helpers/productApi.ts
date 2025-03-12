import { ProductFormValuesInterface } from "@Panel/admin/Products/AddProductForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export function createProduct() {
    const mutationFn = async (Info: ProductFormValuesInterface) => {
        const { discription: body, product: title } = Info;
        return await axios.post("/products/create", { ...Info, body, title });
    };
    return useMutation({
        mutationFn,
    });
}
export function useReadProduct(page:number = 1) {
    const queryKey = ['products',page]
    const queryFn = async () => (await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}products?per_page=10&page=${page}`)).data
  
    return useQuery({
        queryFn,
        queryKey
    });
}
