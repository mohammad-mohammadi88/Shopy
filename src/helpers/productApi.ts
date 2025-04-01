import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductFormInterFace } from "@Interfaces/forms";
import { updateToast } from "@Contracts/toast";
import { Product } from "@Interfaces/product";
import { GetUserToken } from "./userToken";
import { toast } from "react-toastify";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

// Create Product
export function useCreateProduct() {
    const mutationKey = ["product", "create"];
    const mutationFn = async (Info: ProductFormInterFace) =>
        await axios.post("products/create", Info, {
            headers: {
                Authorization: await GetUserToken(),
            },
        });

    return useMutation({
        mutationKey,
        mutationFn,
        onMutate: () =>
            toast.loading("Creating product...", { toastId: "createProduct" }),
        onSuccess: () => updateToast("createProduct", "New product creaated!"),
        onError: () =>
            updateToast("createProduct", "Oops! Please try again!", "error"),
    });
}

// Read All Products
export function useReadProduct(page: number = 1) {
    const queryKey = ["products", "page", page];
    const queryFn = async () =>
        (
            await fetch(`${baseUrl}products?per_page=10&page=${page}`, {
                next: { revalidate: 300 },
            })
        )?.json();
    return useQuery({
        queryFn,
        queryKey,
    });
}

// Read Admin Products
export function useReadUserProducts( user_id: number,page: number = 1) {
    const queryKey = ["products", "user", "page", page];
    const queryFn = async () =>
        (
            await fetch(
                `${baseUrl}products/userProducts/${user_id}?per_page=10&page=${page}`,
                { next: { revalidate: 300 } }
            )
        )?.json();
    return useQuery({
        queryFn,
        queryKey,
    });
}

// Read One Product
export function useReadOneProduct(id: string) {
    const queryKey = ["products", id];
    const queryFn = async () =>
        (
            await fetch(`${baseUrl}products/${id}`, {
                next: { revalidate: 300 },
            })
        )?.json();
    return useQuery({
        queryFn,
        queryKey,
    });
}

// Update Product
export function useUpdateProduct(id: string) {
    const mutationKey = ["product", "update", id];
    const product: any = useReadOneProduct(id)?.data?.product;
    const mutationFn = async (Info: any) => {
        Object.keys(Info).forEach((key: string) => {
            const item = Info[key];
            if (item == "") Info[key] = product[key];
        });
        return await axios.patch(`products/${id}/update`, Info,{
            headers: {
                Authorization: await GetUserToken(),
            },
        });
    };
    return useMutation({
        mutationKey,
        mutationFn,
        onMutate() {
            return toast.loading("Updating product...", {
                toastId: "updateProduct",
            });
        },
        onSuccess: () =>
            updateToast("updateProduct", "Product updated successfully!"),
        onError: () =>
            updateToast("updateProduct", "Oops! Please try again!", "error"),
    });
}

// Delete Product
export function useDeleteProduct() {
    const mutationKey = ["product", "delete"];
    const mutationFn = async (id: string) =>
        await axios.delete(`products/${id}/delete`,{
            headers: {
                Authorization: await GetUserToken(),
            },
        });
    return useMutation({
        mutationKey,
        mutationFn,
        onMutate: () =>
            toast.loading("Deleting product...", { toastId: "deleteProduct" }),
        onSuccess: () =>
            updateToast("deleteProduct", "Product deleted successfully"),
        onError: () =>
            updateToast("deleteProduct", "Oops! Please try again!", "error"),
    });
}


interface Response<T>{
    data:T,
    isSuccess:boolean,
    isError:boolean
}
// Read Product From Server
export const fetchProduct = async (productId:string) :Promise<Response<Product>> => {
    try{
        const result = await fetch(`${baseUrl}products/${productId}`,{next:{revalidate:300}});
        if(result.ok){
            const data = (await result.json())?.product;
            return {
                data,
                isError:false,
                isSuccess:true
            }
        }
        throw new Error('Something went wrong while getting product')
    } catch (data: any) {
        return {
            data,
            isError:true,
            isSuccess:false
        }
    }
}

// Read Product With Same Category From Server
interface SameCategoryRes{
    data:Product[];
    total_page?:number;
    status:string
}
export type SameCategoryResInterface = Response<SameCategoryRes>
export const initialSameCategory:SameCategoryResInterface = {
    data:{data:[],status:'pending'},
    isError:false,
    isSuccess:false
}
export const fetchSameCategory = async (category:string,productId:string,page:number=1,per_page:number=10) :Promise<SameCategoryResInterface> => {
    try{
        const result = await fetch(`${baseUrl}products?category=${category}&productId=${productId}&page=${page}&per_page=${per_page}`,{next:{revalidate:300}});
        if(result.ok){
            const data = (await result.json());
            return {
                data,
                isError:false,
                isSuccess:true
            }
        }
        throw new Error('Something went wrong while getting products')
    } catch (data: any) {
        return {
            data,
            isError:true,
            isSuccess:false
        }
    }
}
