import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
    buttonTitle:string;
    paragraph:ReactNode,
    href:string
}
const Header: FC<Props> = ({ buttonTitle, paragraph,href }) => {
    return (
        <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
                <p className='mt-2 truncate text-gray-700'>
                    {paragraph}
                </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                <Link href={href}>
                    <button
                        type='button'
                        className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                    >
                        {buttonTitle}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
