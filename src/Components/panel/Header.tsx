import type { FC, ReactNode } from "react";

interface Props {
    paragraph:ReactNode,
    children?:ReactNode
}
const Header: FC<Props> = ({ paragraph,children }) => {
    return (
        <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
                <p className='mt-2 truncate text-gray-700'>
                    {paragraph}
                </p>
            </div>
            {children ?? ''}
        </div>
    );
};

export default Header;
