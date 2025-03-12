'use client'

import useWindowWidth from '@Hooks/useWindowWidth';
import { FC } from 'react';
interface Props{
    title:string,
    about:string;
    info:string
}

const usersTHead:FC<Props> = ({title,about,info}) => {
    const windowWidth = useWindowWidth()
    
    return (
        <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pr-6" title={title}>
                    {title}
                </th>
                {windowWidth >= 640 && <th scope="col" className="px-3 py-3.5 text-gray-50 sm:text-gray-900 text-left text-sm font-semibold" title={about}>
                    {about}
                </th>}
                {windowWidth >= 1024 && <th scope="col" className="px-3 py-3.5 text-gray-50 sm:text-gray-900 text-left text-sm font-semibold" title={info}>
                    {info}
                </th>}
                <th scope="col" className="relative text-right py-3.5 px-3 pr-8 pl-4 sm:pl-6"></th>
            </tr>
        </thead>
    )
}

export default usersTHead