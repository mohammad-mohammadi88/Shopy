import { fetchProduct } from '@Helpers/productApi';
import Product from './Main/Product';
import type { FC } from 'react';

interface Props{
    productId:string
}

const Main :FC<Props> = async ({productId}) => {
    const {data,isError,isSuccess} = await fetchProduct(productId)    
    return (
        <main className="w-screen justify-center flex mt-8">
            {isSuccess && <Product product={data}/>}
            {isError && <div className='mt-6 text-3xl font-bold text-center'>Error! Please refresh the page or check your connection!</div>}
        </main>
    )
}

export default Main