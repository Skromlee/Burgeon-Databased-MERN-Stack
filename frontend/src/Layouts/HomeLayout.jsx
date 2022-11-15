import { Outlet } from "react-router-dom";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
export default HomeLayout;
