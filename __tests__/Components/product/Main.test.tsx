import { fetchProduct } from "@/helpers/productApi";
import Main from "@Product/Main";
import { render, screen, waitFor } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";

jest.mock("@helpers/productApi", () => ({
    fetchProduct: jest.fn(),
}));

describe("Main tests", () => {
    it("displays product successfully", async () => {
        (fetchProduct as jest.Mock).mockImplementationOnce((productId: string) => ({
            data: {
                id: productId,
                title: "Backend",
                category: "Back-end",
                body: "this is an advanced C# Game course for advanced Students to test and improve there C# and python skills.The mentor of this course is Mr.Mohammadi the senior JavaScript full-stack developer.",
                price: 545,
                user_id: 1,
                created_at: 1742471479435,
            },
            isError: false,
            isSuccess: true,
        }))
        render(await Main({ productId: "1" }));

        await waitFor(() => {
            beInDom(screen.getByRole("contentinfo"));
        });
    });
    it("displays error message in rejected request", async () => {
        (fetchProduct as jest.Mock).mockImplementationOnce((productId: string) => ({
            data: "",
            isError: true,
            isSuccess: false,
        }))
        render(await Main({ productId: "1" }));

        await waitFor(() => {
            beInDom(screen.getByText('Error! Please refresh the page or check your connection!'));
        });
    });
});
