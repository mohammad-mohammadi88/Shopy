import type { NavigationInterface } from "./NavbarContainer";
import type { FC } from "react";
import Image from "next/image";

interface Props {
    navigation: NavigationInterface[];
}
const DesktopLeftSideMenu: FC<Props> = ({ navigation }) => {
    return (
        <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='hidden sm:flex shrink-0 items-center'>
                <Image
                    alt='Your Company'
                    src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
                    width={32}
                    height={32}
                />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                    {navigation.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            className='text-backk duration-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium'
                        >
                            {name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DesktopLeftSideMenu;
