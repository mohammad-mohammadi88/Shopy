import type { FC } from "react";
import Link from "next/link";

const HeroHeader: FC = () => {
    return (
        <header className='px-6 z-10 lg:px-8'>
            <div className='mx-auto max-w-2xl py-24 sm:py-40'>
                <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
                    <div className=' rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                        Shopy is a school for learning how to code.{" "}
                        <Link
                            href='/about'
                            className='font-semibold text-indigo-600'
                        >
                            Read more <span aria-hidden='true'>&rarr;</span>
                        </Link>
                    </div>
                </div>
                <div className='text-center'>
                    <h1 className='text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl'>
                        Shopy Programming School
                    </h1>
                    <p role="article" className='mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
                        Shopy is a great choice to learn programming with known professors and always update courses.
                    </p>
                    <div className='mt-10 flex items-center justify-center gap-x-6'>
                        <Link
                            href='#courses'
                            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Get started
                        </Link>
                        <Link
                            href='/about'
                            className='text-sm/6 font-semibold text-gray-900'
                        >
                            Learn more <span aria-hidden='true'>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeroHeader;
