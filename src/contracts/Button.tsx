'use client';

import { FC, ReactNode } from 'react'
interface Props{
    value:string
}
const Button:FC<Props> = ({value}) :ReactNode => {
    return (
        <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
            {value}
        </button>
    )
}

export default Button