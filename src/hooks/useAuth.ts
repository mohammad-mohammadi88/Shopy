import { useQuery } from "@tanstack/react-query"
import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const getUser = () => {
    return axios.get('/user')
}

const useAuth = () => {
    const queryKey = ['user_info'];
    const queryFn = () => getUser()
    const res = useQuery({
        queryKey,
        queryFn
    })
    const user = res?.data?.data?.user;
    return {
        user,
        ...res
    }
}

export default useAuth