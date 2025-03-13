
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
    product: string,
    price: number,
    discription: string,
    category: string,
}