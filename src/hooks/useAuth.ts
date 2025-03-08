import { getUser } from "@Helpers/userApi";
import { useQuery } from "@tanstack/react-query"
//, () => getUser()
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