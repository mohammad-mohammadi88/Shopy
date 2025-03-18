import type { FC } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { DisclosureButton } from "@headlessui/react";

const MobileDisclosureButton: FC = () => {
    return (
        <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 duration-300 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'>
                <span className='absolute -inset-0.5' />
                <Bars3Icon className='block size-6' />
            </DisclosureButton>
        </div>
    );
};

export default MobileDisclosureButton;
