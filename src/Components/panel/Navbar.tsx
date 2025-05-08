"use client";

import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import type { Dispatch, FC, SetStateAction } from "react";
import { useRemoveUserToken } from "@Helpers/userToken";
import { showAuthToast } from "@Contracts/toast";
import { useDeleteUser } from "@Helpers/userApi";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import useAuth from "@Hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import {
    Transition,
    MenuButton,
    MenuItems,
    MenuItem,
    Menu,
} from "@headlessui/react";
import { queryClient } from "../index/IndexLayout";

interface Props {
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    userNavigation: userNavigationInterface[];
}

export interface userNavigationInterface {
    name: string;
    href: string;
}
const Navbar: FC<Props> = ({ setSidebarOpen, userNavigation }) => {
    const { refetch, user:{id} } = useAuth();
    const router = useRouter();
    const { mutate, isSuccess } = useRemoveUserToken();
    const {
        mutate: DeleteMyAcount,
        isSuccess: isDeleted,
        error,
    } = useDeleteUser();
    const handleDelete = () => {
        DeleteMyAcount(id);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        showAuthToast(
            false,
            "Your Account deleted successfully!",
            isDeleted ? 200 : 500,
            200,
            error
        );
    };
    const handleLogout = () => mutate();
    useEffect(() => {
        refetch();
        if (isDeleted || isSuccess) router.push("/");
    }, [isDeleted, isSuccess]);
    return (
        <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow'>
            <button
                type='button'
                className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
                onClick={() => setSidebarOpen(true)}
            >
                <span className='sr-only'>Open sidebar</span>

                <Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' />
            </button>

            <div className='flex flex-1 justify-between px-4'>
                <div className='flex flex-1'>
                    <form
                        className='flex w-full md:ml-0'
                        action='#'
                        method='GET'
                    >
                        <label htmlFor='search-field' className='sr-only'>
                            Search
                        </label>

                        <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
                                <MagnifyingGlassIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                />
                            </div>

                            <input
                                id='search-field'
                                className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm'
                                placeholder='Search'
                                type='search'
                                name='search'
                            />
                        </div>
                    </form>
                </div>

                <div className='ml-6 flex items-center md:ml-8'>
                    {/* Profile dropdown */}

                    <Menu as='div' className='relative mr-3'>
                        <div>
                            <MenuButton className='flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                                <span className='sr-only'>Open user menu</span>

                                <Image
                                    className='rounded-full'
                                    src='https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                                    alt='your image'
                                    height='32'
                                    width='32'
                                />
                            </MenuButton>
                        </div>

                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                <MenuItem>
                                    {({ active }) => (
                                        <div
                                            className={`${
                                                active && "bg-gray-100"
                                            } block px-4 py-2 text-sm text-gray-700 cursor-pointer`}
                                        >
                                            <button onClick={handleDelete}>
                                                Delete Account
                                            </button>
                                        </div>
                                    )}
                                </MenuItem>
                                {userNavigation.map((item) => (
                                    <MenuItem key={item.name}>
                                        {({ active }) => (
                                            <Link
                                                className={`${
                                                    active && "bg-gray-100"
                                                } block px-4 py-2 text-sm text-gray-700`}
                                                href={item.href}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </MenuItem>
                                ))}
                                <MenuItem>
                                    {({ active }) => (
                                        <div
                                            className={`${
                                                active && "bg-gray-100"
                                            } block px-4 py-2 text-sm text-gray-700 cursor-pointer`}
                                        >
                                            <button onClick={handleLogout}>
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
