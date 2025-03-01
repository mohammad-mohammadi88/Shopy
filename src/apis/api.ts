import { LoginFormValuesInterface, SignUpFormValuesInterface } from "@/contracts/auth";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const signUpApi = async (values:SignUpFormValuesInterface) => {
    try{
        const { status, data }:AxiosResponse = await axios.post('auth/register',values)
        const { status:message } = data
        return {
            status,
            message
        }
    } catch(err:any){
        console.log(err)
        const { phone:message } = err.response.data.errors
        const { status } = err;
        return { status, message }
    }
}
export const LoginApi = async (values:LoginFormValuesInterface) => {
    try{
        const { data, status }:AxiosResponse = await axios.post('auth/login',values)
        return { data, status }
    } catch(err:any){
        const { data } = err.response
        const { status } = err
        return { data, status }
    }
}