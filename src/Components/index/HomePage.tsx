import { lazy, type FC } from "react";
import HeroHeader from "./HeroHeader"
import Courses from "./Courses";
import Navbar from "./Navbar";

const HomePage: FC = () => {
    const Footer = lazy(()=> import('./Footer'))
    return (
        <>
            <Navbar />
            <HeroHeader />
            <Courses />
            <Footer />
        </>
    );
};

export default HomePage;
