import { LoginFormValuesInterface, SignUpFormValuesInterface } from "@Contracts/auth";
import axios, { AxiosResponse } from "axios";
import { storeLoginToken } from "./loginToken";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

interface ReturnTypesInterface{
    status:number,
    data?:any,
    errors?:string[]
}

export const signUpApi = async (values:SignUpFormValuesInterface) :Promise<ReturnTypesInterface> => {
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

export const LoginApi = async (values:LoginFormValuesInterface) :Promise<ReturnTypesInterface> => {
    try{
        const { data, status }: AxiosResponse = await axios.post('auth/login',values)
        return { data, status }
    } catch(err:any){
        console.log(err)
        const errors:string[] = Object.values(err.response.data.errors)
        const { status } = err
        return { errors, status }
    }
}

export const VerifyPhoneApi = async (code:number,token:string,maxAge:number=10) :Promise<ReturnTypesInterface> => {
    try{
        
        const { data, status }: AxiosResponse = await axios.post('auth/login/verify-phone',{
            code,
            token
        });
        storeLoginToken(data?.user?.token)
        return {
            data:data.user,
            status
        }
    } catch(err:any){
        console.log(err)
        const errors:string[] = Object.values(err.response.data.errors);
        const { status } = err
        return { errors, status }
    }
}