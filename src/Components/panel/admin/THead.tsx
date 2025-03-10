import { FC } from 'react';
interface Props{
    title:string,
    discription:string
}
const usersTHead:FC<Props> = ({title,discription}) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="py-3.5 max-w-40 sm:max-w-52 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                    {title}
                </th>
                <th scope="col" className="px-3 py-3.5 text-gray-50 sm:text-gray-900 text-left text-sm font-semibold ">
                    {discription}
                </th>
                <th scope="col" className="relative w-32 py-3.5 px-3 pr-8 pl-4 sm:pl-6"></th>
            </tr>
        </thead>
    )
}

export default usersTHead