import { FC } from 'react';
import Navbar from './NavBar';
import Main from './Main';
import Footer from '@Index/Footer';

interface Props{
    productId:string
}

const ProductPage :FC<Props> = ({productId}) => {
    return (
        <>
            <Navbar />
            <Main productId={productId}/>
            <Footer />
        </>
    )
}

export default ProductPage