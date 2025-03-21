import { lazy, type FC } from "react";
import Navbar from "./Navbar";
import HeroHeader from "./HeroHeader"
import Courses from "./Courses";
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
