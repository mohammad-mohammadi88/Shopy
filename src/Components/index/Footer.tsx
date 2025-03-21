import { categories, Option } from "@Contracts/categories";
import { SocialIcon } from "react-social-icons";
interface SocialMediaInterface {
    url: string;
    [key: string]: any;
}
const Footer = () => {
    const langs = [
        "JAVA",
        "PHP",
        "C#",
        "JAVASCRIPT",
        "PYTHON",
        "DART",
        "SWIFT",
    ];
    const socialMedia: SocialMediaInterface[] = [
        {
            url: "https://x.com",
        },
        {
            url: "https://youtube.com",
        },
        {
            url: "https://mail.google.com",
        },
        {
            url: "https://instagram.com",
        },
        {
            url: "https://facebook.com",
        },
        {
            url: "https://linkedin.com",
        },
        {
            url: "https://tiktok.com",
        },
    ];
    return (
        <footer className='w-screen mt-24 bg-gray-800'>
            <div className='container py-8 text-white mx-auto flex flex-wrap'>
                <div className='w-full pt-3 border-t md:border-t-0 mt-8 md:mt-0 px-5 flex order-4 md:order-1 flex-col items-center justify-center sm:px-0 md:w-1/3 lg:w-1/4'>
                    <h2 className='text-3xl mb-3'>About us</h2>
                    <p className='text-gray-100'>
                        We build a company to teach and improve your programming
                        skills and make you ready for working with big
                        companies.
                    </p>
                </div>
                <div className=' pl-3 md:order-2 sm:pl-0 w-1/2 md:w-1/3 lg:w-1/4'>
                    <h2 className='text-xl mb-3'>Categories</h2>
                    <ul className='list-disc text-sm text-gray-300 translate-x-4'>
                        {categories.map(({ value }: Option) => (
                            <li
                                className='duration-300 hover:translate-x-2'
                                key={value}
                            >
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='md:order-3 w-1/2 md:w-1/3 pl-3 sm:pl-0 lg:w-1/4'>
                    <h2 className='text-xl mb-3'>languages</h2>
                    <ul className='list-disc text-sm text-gray-300 translate-x-4'>
                        {langs.map((lang: string) => (
                            <li
                                className='duration-300 hover:translate-x-2'
                                key={lang}
                            >
                                {lang}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='w-full mt-4 md:order-4  md:w-full lg:w-1/4'>
                    <div className='flex flex-col h-full justify-center items-center'>
                        <h2 className='text-3xl mb-5'>Contact us</h2>
                        <ul className='flex justify-center flex-wrap'>
                            {socialMedia.map(
                                ({ url, ...props }: SocialMediaInterface) => (
                                    <li className='mx-2'>
                                        <SocialIcon url={url} {...props} />
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
