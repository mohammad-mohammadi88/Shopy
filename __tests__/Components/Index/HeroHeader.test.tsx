import { render, screen } from '@testing-library/react';
import { beInDom } from "@Tests/testFunction.test";
import HeroHeader from '@Index/HeroHeader';

beforeEach(() => {
    render(<HeroHeader />)
})

describe('HeroHeader tests',() => {
    it('displays Shopy information', () => {
        beInDom(screen.getByText("Shopy is a school for learning how to code."));
        beInDom(screen.getByRole('heading',{name:"Shopy Programming School"}));
        expect(screen.getByRole('link',{name:"Read more"})).toHaveAttribute('href',"/about")
        expect(screen.getByRole('link',{name:"Get started"})).toHaveAttribute('href',"#courses")
        expect(screen.getByRole('article')).toHaveTextContent("Shopy is a great choice to learn")
    })
})