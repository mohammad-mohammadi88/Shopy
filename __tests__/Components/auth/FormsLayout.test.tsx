import { render, screen } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";
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
        beInDom(
            screen.getByRole("heading", { name: "sign up" })
        );
        beInDom(screen.getByRole("article"));
    });
});
