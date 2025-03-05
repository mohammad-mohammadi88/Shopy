import { LoginFormValuesInterface, SignUpFormValuesInterface } from "@Contracts/auth";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const signUpApi = async (values:SignUpFormValuesInterface) => {
    try{
        const { status }:AxiosResponse = await axios.post('auth/register',values)
        return {
            status
        }
    } catch(err:any){
        const errors:string[] = Object.values(err.response.data.errors);
        const { status } = err;
        return { status, errors }
    }
}

export const LoginApi = async (values:LoginFormValuesInterface) => {
    try{
        const { data, status }: AxiosResponse = await axios.post('auth/login',values)
        return { data, status }
    } catch(err:any){
        const { data } = err.response
        const { status } = err
        return { data, status }
    }
}

export const VerifyPhoneApi = async (code:string,verifyToken:string) => {
    try{
        const { data, status}: AxiosResponse = await axios.post('auth/login/verify-phone',{
            code,
            token:verifyToken
        });
        return {
            data:data.user,
            status
        }
    } catch(err:any){
        console.log(err)
        const { data } = err.response
        const { status } = err
        return { data, status }
    }
}