import RandomImage from '@Contracts/RandomImage'
import capitalize from '@Helpers/capitalize'
import type { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CategoryType } from '@Contracts/categories'

interface Props{
    body:string,
    title:string,
    category:CategoryType,
    id:any
}

const Course:FC<Props> = ({body,title,category,id}) => {
    const image = RandomImage(category)
    return (
        <div className='p-3 sm:w-1/2 lg:w-1/3' role="contentinfo">
            <div className="w-full flex flex-col cursor-pointer rounded-lg sm:hover:bg-gray-100 duration-300 border p-2">
                <div className='w-full h-40 relative'>
                    <Image
                        layout="fill"
                        src={image}
                        alt={`${category} course image`}
                    />
                </div>
                <div className='mt-3'>
                    <h3 className='text-xl font-bold'>{capitalize(title)}</h3>
                </div>
                <div className='text-lg mt-3'>
                    <h4>category: {category}</h4>
                </div>
                <div className='my-3'>
                    <p className='line-clamp-3' role="article" title={body}>{body}</p>
                </div>
                <div className='border-t pt-3 '>
                    <Link className='text-black duration-300 hover:text-blue-700  font-bold' href={`/products/${id}`}>See Product →</Link>
                </div>
            </div>
        </div>
    )
}

export default Course