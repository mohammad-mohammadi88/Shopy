import { updateToast } from "@/contracts/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

// Read Users
export function useReadUser(page: number = 1) {
    const queryKey = ["users", "page", page];
    const queryFn = async () =>
        (await fetch(`${baseUrl}users?per_page=10&page=${page}`,{next:{revalidate:300}}))?.json();

    return useQuery({
        queryFn,
        queryKey,
    });
}

// Read One user
export function useReadOneUser(id: string) {
    const queryKey = ["users", id];
    const queryFn = async () => (await fetch(`${baseUrl}users/${id}`,{next:{revalidate:300}}))?.json();
    return useQuery({
        queryFn,
        queryKey,
    });
}

// Update User
export function useUpdateUser(id: string) {
    const mutationKey = ["user", "update", id];
    const user: any = useReadOneUser(id)?.data?.user;
    const mutationFn = async (Info: any) => {
        Object.keys(Info).forEach((key: string) => {
            const item = Info[key];
            if (item == "") Info[key] = user[key];
        });

        return await axios.patch(`users/${id}/update`, Info);
    };
    return useMutation({
        mutationKey,
        mutationFn,
        onMutate: () =>
            toast.loading("Updating user...", { toastId: "updateUser" }),
        onSuccess: () =>
            updateToast("updateUser", "User updated successfully!"),
        onError: (e: any) =>
            updateToast(
                "updateUser",
                e?.response?.data?.errors?.phone ?? "Oops! Please try again",
                "error"
            ),
    });
}

// Delete User
export function useDeleteUser() {
    const mutationKey = ["user", "delete"];
    const mutationFn = async (id: string) =>
        await axios.delete(`users/${id}/delete`);

    return useMutation({
        mutationKey,
        mutationFn,
        onMutate: () =>
            toast.loading("Deleting user...", { toastId: "deleteUser" }),
        onSuccess: () =>
            updateToast("deleteUser", "User deleted successfully!"),
        onError: () =>
            updateToast("deleteUser", "Oops! Please try again", "error"),
    });
}
