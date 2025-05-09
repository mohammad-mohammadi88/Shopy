import type { Dispatch, FC, SetStateAction } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import NavLink from "@Contracts/NavLink";
import { Fragment } from "react";
import Image from "next/image";
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export interface navigationInterface {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, "ref"> & {
            title?: string;
            titleId?: string;
        } & RefAttributes<SVGSVGElement>
    >;
}
interface Props {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    navigation: navigationInterface[];
}

const MobileSidebar: FC<Props> = ({
    sidebarOpen,
    setSidebarOpen,
    navigation,
}) => (
    <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
            as='div'
            className='relative z-40 md:hidden'
            onClose={setSidebarOpen}
        >
            <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
                <Transition.Child
                    as={Fragment}
                    enter='transition ease-in-out duration-300 transform'
                    enterFrom='-translate-x-full'
                    enterTo='translate-x-0'
                    leave='transition ease-in-out duration-300 transform'
                    leaveFrom='translate-x-0'
                    leaveTo='-translate-x-full'
                >
                    <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 '>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-in-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in-out duration-300'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div className='absolute top-1.5 right-0 -ml-12 pt-2'>
                                <button
                                    type='button'
                                    className='mr-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className='sr-only'>
                                        Close sidebar
                                    </span>

                                    <XMarkIcon
                                        className='h-6 w-6 text-white'
                                        aria-hidden='true'
                                    />
                                </button>
                            </div>
                        </Transition.Child>

                        <div className='flex bg-gray-900 flex-shrink-0 p-5 items-center px-4'>
                            <Image
                                src='https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                                className='text-white'
                                height='32'
                                width='32'
                                alt='Your Company'
                            />
                        </div>

                        <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                            <nav className='space-y-1 px-2'>
                                {navigation.map((item: navigationInterface) => (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        className='text-gray-300 hover:bg-gray-700 sidebar hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                    >
                                        <item.icon
                                            className='mr-2 flex-shrink-0 h-6 w-6'
                                            aria-hidden='true'
                                        />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>

                <div className='w-14 flex-shrink-0' aria-hidden='true'></div>
            </div>
        </Dialog>
    </Transition.Root>
);

export default MobileSidebar;
