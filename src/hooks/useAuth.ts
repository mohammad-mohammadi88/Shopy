import { GetUserToken } from "@Helpers/userToken";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const getUser = async () =>( await axios.get(baseUrl+'user',{
    headers: {
        Authorization: await GetUserToken(),
    }
})).data

const useAuth = () => {
    const queryKey = ['user_info'];
    const queryFn = async () => await getUser()
    const res = useQuery({
        queryKey,
        queryFn
    })
    const user = res?.data?.user;
    return {
        user,
        ...res
    }
}

export default useAuth