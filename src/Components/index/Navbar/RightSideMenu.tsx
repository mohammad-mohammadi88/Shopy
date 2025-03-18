import type { NavigationInterface } from "./NavbarContainer";
import { useRemoveUserToken } from "@Helpers/userToken";
import { queryClient } from "@Index/IndexLayout";
import capitalize from "@Helpers/capitalize";
import { useRouter } from "next/navigation";
import useAuth from "@Hooks/useAuth";
import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";

const RightSideMenu: FC = () => {
    const { user, refetch } = useAuth();
    const { isAdmin, name, id } = user;
    const router = useRouter();
    const { mutate } = useRemoveUserToken();
    const handleLogout = () => {
        mutate();
        queryClient.removeQueries({ queryKey: ["user_info"] });
        refetch();
        router.push("/");
    };
    const userNavigation: NavigationInterface[] = user && [
        {
            name: "Your Profile",
            href: `/panel/${isAdmin ? "admin" : "user"}`,
        },
        {
            name: "Edit Profile",
            href: `/panel/${isAdmin ? "admin/users" : "user"}/update/${id}`,
        },
    ];
    return (
        <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <h2 className='mr-2 text-xl max-w-40 truncate text-right'>
                Hello {capitalize(name)}
            </h2>
            <Menu as='div' className='relative ml-3'>
                <MenuButton className='relative flex rounded-full  text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400 focus:outline-hidden'>
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>Open user menu</span>
                    <Image
                        alt='your image'
                        src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
                        width={32}
                        height={32}
                    />
                </MenuButton>
                <Transition
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'>
                        {userNavigation.map(
                            ({ name, href }: NavigationInterface) => (
                                <MenuItem key={name}>
                                    {({ active }) => (
                                        <Link
                                            href={href}
                                            className={`${
                                                active && "bg-gray-100"
                                            } block px-4 py-2 text-sm text-gray-700 cursor-pointer`}
                                        >
                                            {name}
                                        </Link>
                                    )}
                                </MenuItem>
                            )
                        )}
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
    );
};

export default RightSideMenu;
