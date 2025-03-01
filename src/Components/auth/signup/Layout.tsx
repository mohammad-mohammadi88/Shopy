import Image from 'next/image'
import { FC } from 'react'
import SignUpForm from './SignUpForm'

const Layout:FC = () => {
    return (
        <div className='flex flex-col justify-center items-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <Image
                    className='mx-auto h-10 w-auto'
                    src='https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                    alt='Your Company'
                    height="50"
                    width="50"
                />
                <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
                    Sign up to Shopy
                </h2>
            </div>
            <SignUpForm />
        </div>
    )
}

export default Layout