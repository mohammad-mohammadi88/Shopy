import fetchHandler from "@Index/fetcher";
import Courses, { ActionTypes } from "@Index/Courses";
import { render, screen } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";
import { ToastContainer } from "react-toastify";
import useWindowWidth from "@Hooks/useWindowWidth";

interface SimpleCourseInterface{
    id:number,
    title:string,
    category:string,
    body:string
}
const simpleCourses:SimpleCourseInterface[] = [
    {
        id: 1,
        title: "Backend",
        category: "Back-end",
        body: "Back-end course",
    },
    {
        id: 2,
        title: "frontend",
        category: "Front-end",
        body: "Front-end course",
    },
    {
        id: 3,
        title: "Frontend Advanced",
        category: "Front-end",
        body: "Front-end course",
    },
    {
        id: 4,
        title: "Advanced backend course",
        category: "Back-end",
        body: "Back-end course",
    },
    {
        id: 5,
        title: "Advanced AI course",
        category: "AI",
        body: "AI course",
    },
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
    {
        id: 8,
        title: "AI course",
        category: "AI",
        body: "AI course",
    },
    {
        id: 9,
        title: "gamecourse",
        category: "Game",
        body: "Game course",
    },
];

jest.mock("@hooks/useWindowWidth",() => ({
    __esModule:true,
    default: jest.fn().mockImplementation(()=>600)
}));
jest.mock("@index/fetcher");

describe("Courses tests", () => {
    it("displays loading when getting courses list", () => {
        // arrange
        (fetchHandler as jest.Mock).mockImplementationOnce((dispatch) => {
            dispatch({
                type: ActionTypes.FETCH,
            });
        });
        render(<Courses />);

        // assert
        beInDom(screen.getByLabelText("rotating-lines-loading"));
    });
    it("displays empty message when there is no course", () => {
        // arrange
        (fetchHandler as jest.Mock).mockImplementationOnce((dispatch) => {
            dispatch({
                type: ActionTypes.SUCCESS,
                payload: { total_page: 0 },
            });
        });
        render(<Courses />);

        // assert
        beInDom(screen.getByText(/There is no product on the database!/));
    });
    it("displays error message if something go wrong while fetching data", () => {
        // arrange
        (fetchHandler as jest.Mock).mockImplementationOnce((dispatch) => {
            dispatch({
                type: ActionTypes.ERROR,
                payload: "error",
            });
        });
        render(
            <>
                <Courses />
                <ToastContainer />
            </>
        );

        // assert
        beInDom(
            screen.getByText(/Oops! Please refresh the page to see products/)
        );
    });
    it("displays 8 course and 2 page pagination when window width is less than 1024px", () => {
        // arrange
        (fetchHandler as jest.Mock).mockImplementationOnce((dispatch) => {
            dispatch({
                type: ActionTypes.SUCCESS,
                payload: {
                    total_page:2,
                    products:simpleCourses.slice(0,8)
                },
            });
        });
        render(<Courses />);

        // assert
        expect(fetchHandler).toHaveBeenCalledWith(expect.anything(),8,1)
        expect(screen.getAllByRole("contentinfo")).toHaveLength(8);
        expect(screen.getAllByRole('button', { name: /pagePaginate/i })).toHaveLength(2)
    });
    it("displays 9 course and 1 page pagination when window width is more and equal to 1024px", () => {
        // arrange
        (fetchHandler as jest.Mock).mockImplementationOnce((dispatch) => {
            dispatch({
                type: ActionTypes.SUCCESS,
                payload: {
                    total_page:1,
                    products:simpleCourses.slice(0,9)
                },
            });
        });
        (useWindowWidth as jest.Mock).mockImplementationOnce(() => 1500)
        render(<Courses />);

        // assert
        expect(fetchHandler).toHaveBeenCalledWith(expect.anything(),9,1)
        expect(screen.getAllByRole("contentinfo")).toHaveLength(9);
        expect(screen.getAllByRole('button', { name: /pagePaginate/i })).toHaveLength(1)
    });
});
