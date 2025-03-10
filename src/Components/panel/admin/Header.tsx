import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    buttonTitle:string;
    paragraph:ReactNode
}
const Header: FC<Props> = ({ setShowModal,buttonTitle,paragraph }) => {
    return (
        <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
                <p className='mt-2 truncate text-gray-700'>
                    {paragraph}
                </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                <button
                    onClick={() => setShowModal(true)}
                    type='button'
                    className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                >
                    {buttonTitle}
                </button>
            </div>
        </div>
    );
};

export default Header;
