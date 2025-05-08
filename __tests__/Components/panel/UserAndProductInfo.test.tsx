import { render, screen, waitFor } from "@testing-library/react";
import { beInDom, notBeInDom } from "@Tests/testFunction.test";
import UserAndProductInfo from "@Panel/UserAndProductInfo";
import userEvent from "@testing-library/user-event";
import useWindowWidth from "@Hooks/useWindowWidth";

// mocking
jest.mock("@hooks/useWindowWidth", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const handleDelete = jest.fn();
const sampleComponent = (
    canDelete: boolean = true,
    canEdit: boolean = true
) => (
    <table>
        <tbody>
            <UserAndProductInfo
                about='Category'
                info='Price'
                title='ProductName'
                canDelete={canDelete}
                canEdit={canEdit}
                handleDelete={handleDelete}
                updateHref='/panel/admin/users/update/1'
            />
        </tbody>
    </table>
);
describe("THead tests", () => {
    it("display one in less then 640px", () => {
        // arrange
        (useWindowWidth as jest.Mock).mockImplementationOnce(() => 500);
        render(sampleComponent());

        // assert
        beInDom(screen.getByText("ProductName"));
        notBeInDom(screen.queryByText("Category"));
        notBeInDom(screen.queryByText("Price"));
    });
    it("display two between 640px and 1024px", () => {
        // arrange
        (useWindowWidth as jest.Mock).mockImplementationOnce(() => 800);
        render(sampleComponent());

        // assert
        beInDom(screen.getByText("ProductName"));
        beInDom(screen.getByText("Category"));
        notBeInDom(screen.queryByText("Price"));
    });
    it("display one in more then 1024px", () => {
        // arrange
        (useWindowWidth as jest.Mock).mockImplementationOnce(() => 1300);
        render(sampleComponent());

        // assert
        beInDom(screen.getByText("ProductName"));
        beInDom(screen.getByText("Category"));
        beInDom(screen.getByText("Price"));
    });
    it("displays edit button", () => {
        // arrange
        render(sampleComponent());

        // assert
        beInDom(screen.getByRole("link", { name: "Edit" }));
        expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
            "href",
            "/panel/admin/users/update/1"
        );
    });
    it("doesn't display edit button", () => {
        // arrange
        render(sampleComponent(true, false));

        // assert
        notBeInDom(screen.queryByRole("link", { name: "Edit" }));
    });
    it("displays delete button", async () => {
        // arrange
        render(sampleComponent());

        // assert
        beInDom(screen.getByRole("button", { name: "Delete" }));
        
        // act
        await userEvent.click(screen.getByRole("button", { name: "Delete" }));

        // assert
        await waitFor(() => {
            expect(handleDelete).toHaveBeenCalled()
        })
    });
    it("doesn't display delete button", () => {
        // arrange
        render(sampleComponent(false, false));

        // assert
        notBeInDom(screen.queryByRole("button", { name: "Delete" }));
    });
});
