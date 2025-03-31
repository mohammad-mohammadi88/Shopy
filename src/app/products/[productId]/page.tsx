import fetchProduct from '@Product/fetchProduct'
import ProductPage from '@Product/ProductPage';
import type { Metadata, NextPage } from 'next';
interface Props{
    params:Promise<{productId:string}>,
    searchParams:Promise<any>,
}
export const generateMetadata = async ({params}:Props) :Promise<Metadata>  => {
    const productId = (await params).productId;
    const result = await fetchProduct(productId)
    let { title, body } = result.data
    const description = body.slice(0,120)
    title += ' course'
    return {
        title,
        description
    }
}
const page: NextPage<Props> = async ({params}) => <ProductPage productId={(await params).productId}/>

export default page