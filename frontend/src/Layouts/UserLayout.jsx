import { Outlet } from "react-router-dom";
import UserNav from "../components/user/UserNav";
import { BsMailbox } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";

const navItems = [
    { href: "/user", icon: AiOutlineDashboard, label: "Dashboard" },
    { href: "/user/parcels", icon: BsMailbox, label: "Parcels" },
    { href: "/user/faq", icon: FaQuestionCircle, label: "FAQ" },
];

const UserLayout = () => {
    return (
        <>
            <div className="flex">
                <UserNav navItems={navItems} />
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
export default UserLayout;
