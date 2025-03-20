
export interface LoginFormValuesInterface {
    phone: string;
}

export interface VerifyFormValuesInterface {
    code: string
}

export interface SignUpFormValuesInterface {
    name: string;
    phone: string;
    isAdmin?: boolean
}

export interface ProductFormInterFace{
    title: string,
    price: number,
    image: any;
    body: string,
    category: string,
}

export interface UserFormInterFace{
    id?:any
    name: string,
    phone: string,
    isAdmin: boolean,
}