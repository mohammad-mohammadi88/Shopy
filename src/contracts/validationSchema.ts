import { boolean, number, object, string } from "yup";

export const productValidationSchema = object().shape({
    title: string().required().min(4).max(25),
    price: number().required().min(2),
    body: string().required().min(5).max(1000),
    category: string().required(),
});

export const userValidationSchema = object().shape({
    name: string().required().min(2).max(25),
    phone: string()
        .required()
        .matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/, "your mobile is not valid!")
        .min(11)
        .max(15),
    isAdmin: boolean(),
});