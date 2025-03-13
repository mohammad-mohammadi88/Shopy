import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductFormInterFace } from "@Interfaces/forms";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

// Create Product
export function useCreateProduct() {
    const mutationKey = ['product','create']

    const mutationFn = async (Info: ProductFormInterFace) => {
        const { discription: body, product: title } = Info;
        return await axios.post("/products/create", { ...Info, body, title });
    };
    return useMutation({
        mutationKey,
        mutationFn,
    });
}

// Read Products
export function useReadProduct(page:number = 1) {
    const queryKey = ['products',"page",page]
    const queryFn = async () => (await axios.get(`products?per_page=10&page=${page}`)).data
  
    return useQuery({
        queryFn,
        queryKey
    });
}

// Read One Product
export function useReadOneProduct(id:string) {
    const queryKey = ['products',id]
    const queryFn = async () => (await axios.get(`products/${id}`)).data
    return useQuery({
        queryFn,
        queryKey
    });
}

// Update Product
export function useUpdateProduct(id:string) {
    const mutationKey = ['product','update',id]
    const product:any = useReadOneProduct(id)?.data?.product
    const mutationFn = async (Info: any) => {
        console.log(product,Info)
        Object.keys(Info).forEach((key:string)=>{
            const item = Info[key]
            if(item == "") Info[key] = product[key]
        })

        return await axios.patch(`products/${id}/update`, Info);
    };
    return useMutation({
        mutationKey,
        mutationFn,
    });
}

// Delete Product
export function useDeleteProduct() {
    const mutationFn = async (id: string) => {
        return await axios.delete(`products/${id}/delete`);
    };
    return useMutation({
        mutationFn,
    });
}