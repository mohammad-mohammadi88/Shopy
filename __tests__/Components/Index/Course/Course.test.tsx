import { render, screen } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";
import Course from "@Index/Course";

// before each
beforeEach(() => {
    render(
        <Course
            body='Front end course description'
            category='Front-end'
            title='front end course'
            id={1}
        />
    );
});

describe("Course tests", () => {
    it("displays course information", () => {
        // article
        const article = screen.getByRole('article',{name:"Front end course description"})
        beInDom(article);
        expect(article).toHaveAttribute("title","Front end course description")

        // image
        beInDom(screen.getByAltText("Front-end course image"));

        // headings (category, title)
        beInDom(screen.getByRole('heading',{name:"category: Front-end"}));
        beInDom(screen.getByRole('heading',{name:"Front end course"}));
        
        // link
        expect(screen.getByRole('link',{name:"See Product →"})).toHaveAttribute('href',"/products/1");
    });
});
