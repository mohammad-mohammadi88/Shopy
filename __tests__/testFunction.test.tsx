import { render, screen } from "@testing-library/react";

export const beInDom = (element: HTMLElement) =>
    expect(element).toBeInTheDocument();
it('test beInDom function',()=>{
    render(<div>hello world!</div>);

    beInDom(screen.getByText("hello world!"))
})