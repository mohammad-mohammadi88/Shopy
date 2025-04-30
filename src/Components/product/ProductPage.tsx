import SameCategory from './SameCategory';
import Footer from '@Index/Footer';
import type { FC } from 'react';
import Navbar from './NavBar';
import Main from './Main';

interface Props{
    productId:string
}

const ProductPage :FC<Props> = ({productId}) => {
    return (
        <>
            <Navbar />
            <Main productId={productId}/>
            <SameCategory productId={productId} />
            <Footer />
        </>
    )
}

export default ProductPage