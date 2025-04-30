import { fetchProduct, fetchSameCategory } from "@/helpers/productApi";
import SameCategory from "@Product/SameCategory";
import { render, screen, waitFor } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";

const DesktopCourses = [
    {
        id: 6,
        title: "Advanced Desktop course",
        category: "Desktop",
        body: "Desktop course",
    },
    {
        id: 7,
        title: "Desktop course",
        category: "Desktop",
        body: "Desktop coure",
    },
]
jest.mock("@helpers/productApi", () => ({
    fetchSameCategory: jest.fn(),
    initialSameCategory: {
        data: { data: [], total_page: 0 },
        isError: true,
        isSuccess: false,
    },
    fetchProduct: jest.fn().mockImplementation(() => ({
        data: { category: "Desktop" },
    })),
}));

describe("SameCategory tests", () => {
    it("displays loading", async () => {
        // arrange
        (fetchSameCategory as jest.Mock).mockImplementation(() => ({
            data: { data: [], total_page: 0 },
            isError: false,
            isSuccess: false,
        }));
        render(<SameCategory productId='1' />);

        // assert
        await waitFor(() => {
            beInDom(screen.getByLabelText("rotating-lines-loading"));
        });
    });
    it("displays empty message when there is no other product with same category", async () => {
        // arrange
        (fetchSameCategory as jest.Mock).mockImplementation(() => ({
            data: { data: [], total_page: 0 },
            isError: false,
            isSuccess: true,
        }));
        render(<SameCategory productId='1' />);

        // assert
        await waitFor(() => {
            beInDom(screen.getByText("There is no other course with this category on the database!"));
        });
    });
    it("displays error message if something goes wrong while fetching", async () => {
        // arrange
        (fetchSameCategory as jest.Mock).mockImplementation(() => ({
            data: { data: [], total_page: 0 },
            isError: true,
            isSuccess: false,
        }));
        render(<SameCategory productId='1' />);

        // assert
        await waitFor(() => {
            beInDom(screen.getByText("Ops! We have Error"));
        });
    });
    it("displays desktop courses and pagination", async () => {
        // arrange
        (fetchSameCategory as jest.Mock).mockImplementation(() => ({
            data: { data: DesktopCourses, total_page: 1 },
            isError: false,
            isSuccess: true,
        }));
        render(<SameCategory productId='1' />);

        // assert
        await waitFor(() => {
            expect(screen.getAllByRole("contentinfo")).toHaveLength(2)
        });
        expect(screen.getAllByRole('button', { name: /pagePaginate/i })).toHaveLength(1)
    });
});
