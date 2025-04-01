import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import type { Product } from '@Interfaces/product';
import RandomImage from '@Contracts/RandomImage';
import capitalize from '@Helpers/capitalize';
import type { FC } from 'react';
import Image from 'next/image';
import "./style.css";
interface Props{
    product:Product
}

const Product :FC<Props> = ({product}) => {
    const {category,title,price,body} = product;
    const imageSrc = RandomImage(category)
    return (
        <div className="shadow-2xl bg-white container p-8 rounded-xl">
            <section className="w-full flex flex-wrap flex-col md:flex-row justify-center md:justify-normal md:h-full ">
                <div className="w-full md:w-2/5 relative h-full">
                    <Image src={imageSrc} className='pr-4 product-image' layout='fill' alt={title} />
                </div>
                <div className="w-full md:w-3/5">
                    <h1 className="text-3xl mb-4">{capitalize(title)}</h1>
                    <h2 className='text-xl mb-3'>Category: {category}</h2>
                    <p className="mb-3 line-clamp-3" title={capitalize(body)}>{capitalize(body)}</p>
                    <h2 className="text-3xl font-semibold">{price}$</h2>
                    <button type="button" className="text-white bg-rose-500 text-2xl w-full mt-8 flex justify-center rounded-lg py-3"><ShoppingCartIcon height={32}/>&ensp;<div className="-translate-y-1">Buy</div></button>
                </div>
            </section>
        </div>
    )
}

export default Product