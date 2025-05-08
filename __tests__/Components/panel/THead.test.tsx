import { beInDom, notBeInDom } from "@Tests/testFunction.test";
import { render, screen } from "@testing-library/react";
import useWindowWidth from "@/hooks/useWindowWidth";
import THead from "@Panel/THead";

// mocking
jest.mock("@hooks/useWindowWidth", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const simpleComponent = <table>
    <THead info='Price' title='ProductName' about='Category' />
</table>
describe("THead tests", () => {
    it("display one in less then 640px", () => {
        // arrange
        (useWindowWidth as jest.Mock).mockImplementationOnce(() => 500);
        render(simpleComponent);
        
        // assert
        beInDom(screen.getByText('ProductName'));
        notBeInDom(screen.queryByText('Category'));
        notBeInDom(screen.queryByText('Price'));
    });
    it("display two between 640px and 1024px", () => {
        // arrange
        (useWindowWidth as jest.Mock).mockImplementationOnce(() => 800);
        render(simpleComponent);

        // assert
        beInDom(screen.getByText('ProductName'));
        beInDom(screen.getByText('Category'));
        notBeInDom(screen.queryByText('Price'));
    });
    it("display one in more then 1024px", () => {
        // arrange
        (useWindowWidth as jest.Mock).mockImplementationOnce(() => 1300);
        render(simpleComponent);

        // assert
        beInDom(screen.getByText('ProductName'));
        beInDom(screen.getByText('Category'));
        beInDom(screen.getByText('Price'));
    });
});
