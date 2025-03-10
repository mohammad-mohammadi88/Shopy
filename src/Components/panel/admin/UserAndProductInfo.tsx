import { FC } from "react";

interface Props {
    title: string;
    name: string;
}
const UserAndProductInfo: FC<Props> = ({ name, title }) => {
    return (
        <tr className="table-auto justify-between sm:table-row">
            <td className='max-w-36 lg:max-w-52 truncate py-4 pr-4 pl-3 text-sm font-medium text-gray-900 sm:pr-6' title={name}>
                {name}
            </td>
            <td className='hidden sm:block max-w-40 lg:max-w-52 truncate px-3 py-4 text-sm text-gray-500' title={title}>
                {title}
            </td>
            <td className='relative whitespace-nowrap py-4 pr-3 pl-4 text-right text-sm font-medium sm:pl-6'>
                <a
                    href='#'
                    className='text-indigo-600 hover:text-indigo-900 mr-4'
                >
                    Edit
                </a>
                <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                    Delete
                </a>
            </td>
        </tr>
    );
};

export default UserAndProductInfo;
