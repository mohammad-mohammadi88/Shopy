"use client";

import NavLink from '@Contracts/NavLink';
import type { navigationInterface } from './admin/AdminPanel';
import Image from "next/image";
import { FC } from "react";

interface Props{
    navigation:navigationInterface[]
}

const DesktopSidebar:FC<Props> = ({navigation}) => {
    return (
        <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
            <div className='flex min-h-0 flex-1 flex-col bg-gray-800'>
                <div className='flex h-16 flex-shrink-0 items-center bg-gray-900 px-4'>
                    <Image
                        src='https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                        className='text-white'
                        alt='Your Company'
                        height='32'
                        width='32'
                    />
                </div>

                <div className='flex flex-1 flex-col overflow-y-auto'>
                    <nav className='flex-1 space-y-1 px-2 py-4'>
                        {navigation.map((item:navigationInterface) => (
                            <NavLink
                                key={item.name}
                                href={item.href}
                                className="sidebar text-slate-500 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                <item.icon
                                    className="mr-3 flex-shrink-0 h-6 w-6"
                                    aria-hidden='true'
                                />

                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                        
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default DesktopSidebar