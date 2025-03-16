'use client';

import type { FC, ReactNode } from 'react'
interface Props{
    value:string;
    className:string
}
const Button:FC<Props> = ({value,className}) :ReactNode => {
    return (
        <button
            type='submit'
            className={className}
        >
            {value}
        </button>
    )
}

export default Button