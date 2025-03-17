import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useStoreUserToken = () :any => {
    const mutationKey = ['token','create']
    const mutationFn = async (token:string,maxDay:number = 10) => await axios.post('http://localhost:3000/api/login',{token,maxDay})
    return useMutation({
        mutationFn,
        mutationKey
    })
}

export const useRemoveUserToken = () :any => {
    const mutationKey = ['token','delete']
    const mutationFn = async () => await axios.delete('http://localhost:3000/api/logout')
    return useMutation({
        mutationFn,
        mutationKey
    })
}