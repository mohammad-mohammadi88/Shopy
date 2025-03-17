import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductFormInterFace } from "@Interfaces/forms";
import { updateToast } from "@Contracts/toast";
import { toast } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

// Create Product
export function useCreateProduct() {
    const mutationKey = ["product", "create"];
    const mutationFn = async (Info: ProductFormInterFace) =>
        await axios.post("/products/create", Info);

    return useMutation({
        mutationKey,
        mutationFn,
        onMutate: () =>
            toast.loading("Creating product...", { toastId: "createProduct" }),
        onSuccess: () => updateToast("createProduct", "New product creaated!"),
        onError: () => updateToast("createProduct", "Oops! Please try again!"),
    });
}

// Read All Products
export function useReadProduct(page: number = 1) {
    const queryKey = ["products", "page", page];
    const queryFn = async () =>
        (await axios.get(`products?per_page=10&page=${page}`)).data;
    return useQuery({
        queryFn,
        queryKey,
    });
}

// Read Admin Products
export function useReadUserProducts(page: number = 1,user_id:number) {
    const queryKey = ["products","user", "page", page];
    const queryFn = async () =>
        (await axios.get(`products/userProducts/${user_id}?per_page=10&page=${page}`)).data;
    return useQuery({
        queryFn,
        queryKey,
    });
}

// Read One Product
export function useReadOneProduct(id: string) {
    const queryKey = ["products", id];
    const queryFn = async () => (await axios.get(`products/${id}`)).data;
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
        return await axios.patch(`products/${id}/update`, Info);
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
        await axios.delete(`products/${id}/delete`);
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
