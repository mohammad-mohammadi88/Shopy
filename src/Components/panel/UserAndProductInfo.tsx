import useWindowWidth from "@Hooks/useWindowWidth";
import Link from "next/link";
import type { FC } from "react";

interface Props {
    about: any;
    title: string;
    info: string;
    canEdit?: boolean;
    canDelete?: boolean;
    handleDelete?: () => void;
    updateHref?: string;
}
const UserAndProductInfo: FC<Props> = ({
    updateHref,
    title,
    canEdit = false,
    canDelete = false,
    about,
    handleDelete,
    info,
}) => {
    const windowWidth = useWindowWidth();
    return (
        <tr className='table-auto justify-between sm:table-row'>
            <td
                className='max-w-36 lg:max-w-52 truncate py-4 pr-4 pl-3 text-sm font-medium text-gray-900 sm:pr-6'
                title={title}
            >
                {title}
            </td>
            {windowWidth >= 640 && (
                <td
                    className='invisible sm:visible max-w-40 lg:max-w-52 truncate px-3 py-4 text-sm text-gray-500'
                    title={String(about)}
                >
                    {String(about)}
                </td>
            )}
            {windowWidth >= 1024 && (
                <td
                    className='invisible md:visible max-w-40 lg:max-w-52 truncate px-3 py-4 text-sm text-gray-500'
                    title={info}
                >
                    {info}
                </td>
            )}
            <td className=' relative py-4 pr-3 pl-4 text-right text-sm font-medium sm:pl-6'>
                {canEdit && updateHref && (
                    <Link
                        href={updateHref}
                        className='text-indigo-600 hover:text-indigo-900 mr-4'
                    >
                        Edit
                    </Link>
                )}
                {canDelete && handleDelete && (
                    <button
                        type='button'
                        onClick={handleDelete}
                        className='text-indigo-600 hover:text-indigo-900'
                    >
                        Delete
                    </button>
                )}
            </td>
        </tr>
    );
};

export default UserAndProductInfo;
