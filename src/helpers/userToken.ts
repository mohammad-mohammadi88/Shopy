import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@Index/IndexLayout";
import { updateToast } from "@Contracts/toast";
import { toast } from "react-toastify";
import axios from "axios";

export const useStoreUserToken = (): any => {
    const mutationKey = ["token", "create"];
    const mutationFn = async (token: string, maxDay: number = 10) =>
        await axios.post(`${window.location.origin}/api/login`, { token, maxDay });
    return useMutation({
        mutationFn,
        mutationKey,
        onMutate: () => toast.loading("logging in...", { toastId: "login" }),
        onSuccess: () => updateToast("login", "Welcome to your panel!"),
        onError: () =>
            updateToast(
                "login",
                "Something happend wrong! Please try again!",
                "error"
            ),
    });
};

export const useRemoveUserToken = (): any => {
    const mutationKey = ["token", "delete"];
    const mutationFn = async () =>
        await axios.delete(`${window.location.origin}/api/logout`);
    return useMutation({
        mutationFn,
        mutationKey,
        onMutate: () => toast.loading("loging out...", { toastId: "logout" }),
        onSuccess: () => {
            updateToast("logout", "you logged out successfully!");
            queryClient.invalidateQueries({ queryKey: ["user_info"] });
        },
        onError: () =>
            updateToast(
                "logout",
                "Something happend wrong! Please try again!",
                "error"
            ),
    });
};
export const GetUserToken = async (): Promise<string> => {
    const response = await fetch(`${window.location.origin}/api/getToken`,{cache:"no-store"})
    if(response.ok) return await response.text()
    return ''
};
