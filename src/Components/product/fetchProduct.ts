import { Product } from "@Interfaces/product";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

interface Response{
    data:Product | any,
    isSuccess:boolean,
    isError:boolean
}
const fetchProduct = async (productId:string) :Promise<Response | any> => {
    try{
        const result = await fetch(`${baseUrl}products/${productId}`,{next:{revalidate:300}});
        if(result.ok){
            const data = (await result.json())?.product;
            return {
                data,
                isError:false,
                isSuccess:true
            }
        }
    } catch (data: any) {
        return {
            data,
            isError:true,
            isSuccess:false
        }
    }
}
export default fetchProduct