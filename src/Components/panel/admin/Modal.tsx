import { Dialog } from "@headlessui/react";
import { Dispatch, FC, ReactNode, SetStateAction } from 'react'

interface Props{
    showModal:boolean,
    setShowModal:Dispatch<SetStateAction<boolean>>,
    children:ReactNode
}
const Modal:FC<Props> = ({setShowModal,showModal,children}) => {
    return (
        <Dialog
                as='div'
                className='fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 overflow-y-auto'
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <Dialog
                    onClose={() => {}}
                    open={showModal}
                    className='fixed inset-0 bg-black bg-opacity-[.4]'
                />
                <span className='inline-block h-screen align-middle'>
                    &#8203;
                </span>
                <div className={`inline`}>
                    <div className='inline-block w-full max-w-4xl mt-8 mb-20 overflow-hidden p-2 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100'>
                       {children}
                    </div>
                </div>
            </Dialog>
    )
}

export default Modal