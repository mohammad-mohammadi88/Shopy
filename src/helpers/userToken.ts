import { queryClient } from "@Index/IndexLayout"
import { updateToast } from "@Contracts/toast"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"

export const useStoreUserToken = () :any => {
    const mutationKey = ['token','create']
    const mutationFn = async (token:string,maxDay:number = 10) => await axios.post('http://localhost:3000/api/login',{token,maxDay})
    return useMutation({
        mutationFn,
        mutationKey,
        onMutate:() => toast.loading('logging in...',{toastId:'login'}),
        onSuccess:() => updateToast('login','Welcome to your panel!'),
        onError:() => updateToast('login','Something happend wrong! Please try again!')
    })
}

export const useRemoveUserToken = () :any => {
    const mutationKey = ['token','delete']
    const mutationFn = async () => await axios.delete('http://localhost:3000/api/logout')
    return useMutation({
        mutationFn,
        mutationKey,
        onMutate:() => toast.loading('loging out...',{toastId:'logout'}),
        onSuccess:() =>{
            updateToast('logout','you logged out successfully!');
            queryClient.invalidateQueries({queryKey: ['user_info']})
        },
        onError:() => updateToast('logout','Something happend wrong! Please try again!')
    })
}