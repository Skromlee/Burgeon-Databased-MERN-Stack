import { Outlet } from "react-router-dom";
import AdminNav from "../components/admin/AdminNav";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbBuildingFactory2 } from "react-icons/tb";

const navItems = [
    { href: "/admin", icon: AiOutlineDashboard, label: "Dashboard" },
    { href: "/admin/parcels", icon: BsBoxSeam, label: "Total Parcels" },
    {
        href: "/admin/users/employees",
        icon: AiOutlineUsergroupAdd,
        label: "Emp. Manager",
    },
    {
        href: "/admin/users/customers",
        icon: AiOutlineUsergroupAdd,
        label: "Cus. Manager",
    },
    {
        href: "/admin/branch",
        icon: TbBuildingFactory2,
        label: "Branch Manager",
    },
];

const AdminLayout = () => {
    return (
        <>
            <div className="flex">
                <AdminNav navItems={navItems} />
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
export default AdminLayout;
