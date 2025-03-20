import type { FC } from "react";
import Navbar from "./Navbar";
import HeroHeader from "./HeroHeader"
import Example from "./Courses";
const HomePage: FC = () => {
    return (
        <>
            <Navbar />
            <HeroHeader />
            <Example />
        </>
    );
};

export default HomePage;
