import type { FC, ReactNode } from 'react'

interface Props{
    children: ReactNode,
    header:string
}
const Dashboard :FC<Props> = ({ children,header }) => {
    return (
        <main className='flex-1'>
            <div className='py-6'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                    <h1 className='text-2xl font-semibold text-gray-900'>
                        {header}
                    </h1>
                </div>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default Dashboard