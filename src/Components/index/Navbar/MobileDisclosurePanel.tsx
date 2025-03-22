import type { NavigationInterface } from "./NavbarContainer";
import type { FC } from "react";
import Image from "next/image";
import {
    DisclosureButton,
    DisclosurePanel,
    Transition,
} from "@headlessui/react";
import Link from "next/link";

interface Props {
    navigation: NavigationInterface[];
}
const MobileDisclosurePanel: FC<Props> = ({ navigation }) => {
    return (
        <Transition
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
        >
            <DisclosurePanel className='sm:hidden pt-3 border-t'>
                <div className='block ml-5'>
                    <Image
                        alt='Your Company'
                        src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
                        width={40}
                        height={40}
                    />
                </div>
                <div className='space-y-1 px-2 pt-2 pb-3'>
                    {navigation.map(({ name, href }) => (
                        <DisclosureButton
                            key={name}
                            as={Link}
                            href={href}
                            className='text-black hover:bg-gray-700 
                            duration-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                        >
                            {name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Transition>
    );
};

export default MobileDisclosurePanel;
