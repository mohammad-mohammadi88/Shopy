import { LoginFormValuesInterface, SignUpFormValuesInterface } from "@/interfaces/forms";
import axios, { AxiosResponse } from "axios";

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
        const errors:string[] | any = typeof err === "object" ?  Object.values(err?.response?.data?.errors) : err;
        const { status } = err;
        return { status, errors }
    }
}

export const LoginApi = async (values:LoginFormValuesInterface) :Promise<ReturnTypesInterface> => {
    try{
        const { data, status }: AxiosResponse = await axios.post('auth/login',values)
        return { data, status }
    } catch(err:any){
        const errors:string[] = typeof err === "object" ?  Object.values(err?.response?.data?.errors) : err
        const { status } = err
        return { errors, status }
    }
}

export const VerifyPhoneApi = async (code:number,token:string) :Promise<ReturnTypesInterface> => {
    try{
        const { data, status }: AxiosResponse = await axios.post('auth/login/verify-phone',{
            code,
            token
        });
        return {
            data:data?.user,
            status
        }
    } catch(err:any){
        const errors:string[] = typeof err === "object" ?  Object.values(err?.response?.data?.errors) : err;
        const { status } = err
        return { errors, status }
    }
}