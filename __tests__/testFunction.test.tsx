import { render, screen } from "@testing-library/react";

export const beInDom = (element: HTMLElement) =>
    expect(element).toBeInTheDocument();

export const notBeInDom = (element: HTMLElement | null) =>
    expect(element).not.toBeInTheDocument();

it('test beInDom function',()=>{
    // arrange
    render(<div>hello world!</div>);

    // assert
    beInDom(screen.getByText("hello world!"))
})
it('test notBeInDom function',()=>{
    // arrange
    render(<div>hello world!</div>);

    // assert
    notBeInDom(screen.queryByText("bye world!"))
})