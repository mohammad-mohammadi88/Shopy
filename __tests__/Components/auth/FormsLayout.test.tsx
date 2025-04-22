import { render, screen } from "@testing-library/react";
import FormsLayout from "@Auth/FormsLayout";

// Before Each
beforeEach(() => {
    render(
        <FormsLayout title='sign up'>
            <p role='article'>test article</p>
        </FormsLayout>
    );
});

describe("FormsLayout tests", () => {
    it("displays title and children correctly", () => {
        expect(
            screen.getByRole("heading", { name: "sign up" })
        ).toBeInTheDocument();
        expect(screen.getByRole("article")).toBeInTheDocument();
    });
});
