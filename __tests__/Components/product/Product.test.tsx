import type { Product } from '@/interfaces/product';
import Course from '@Product/Main/Product';
import { render, screen } from '@testing-library/react';
import { beInDom } from '@Tests/testFunction.test';

beforeEach(() => {
    const product:Product = {
        id:1,
        category:"Front-end",
        title:"javascript",
        body:"javascript course",
        price:54,
        created_at:1543451531,
        user_id:1,
    }
    render(<Course product={product}/>)
})

describe('product tests',() => {
    it('displays course Information correctly', () => {
        beInDom(screen.getByText("Javascript"));
        beInDom(screen.getByText("Javascript course"));
        beInDom(screen.getByAltText('javascript'));
        expect(screen.getByText("Javascript course")).toHaveAttribute('title',"Javascript course")
        beInDom(screen.getByText(/Category: Front-end/));
        beInDom(screen.getByText(/54\$/));
        beInDom(screen.getByText(/Buy/))
    })
})