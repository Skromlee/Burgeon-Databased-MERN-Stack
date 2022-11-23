import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// layout
import HomeLayout from "./Layouts/HomeLayout";
import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout";
// common pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Find from "./pages/Find";
// user pages
import User from "./pages/user/User";
import Parcels from "./pages/user/Parcels";
import Faq from "./pages/user/Faq";
// admin pages
import Admin from "./pages/admin/Admin";
import AdminSignin from "./pages/admin/AdminSignin";
// admin pages => Parcels
import ParcelsManage from "./pages/admin/parcels/Parcels";
// admin pages => Users
import Users from "./pages/admin/users/Users";
// admin pages => Users => Employees
import Employees from "./pages/admin/users/employees/Employees";
import CreateEmployee from "./pages/admin/users/employees/CreateEmployees";
// admin pages => Users => Customers
import Customers from "./pages/admin/users/customers/Customers";
import CreateCustomer from "./pages/admin/users/customers/CreateCustomer";
// admin pages => Branch Manager
import Branch from "./pages/admin/branch/Branch";
import CreateBranch from "./pages/admin/branch/CreateBranch";
// admin pages => Group Manager
import Groups from "./pages/admin/group/Groups";
import CreateGroup from "./pages/admin/group/CreateGroup";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<HomeLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Find />} />
                    </Route>
                    {/* User */}
                    <Route element={<UserLayout />}>
                        <Route path="/user" element={<User />} />
                        <Route path="/user/parcels" element={<Parcels />} />
                        <Route path="/user/faq" element={<Faq />} />
                    </Route>
                    {/* Admin */}
                    <Route element={<AdminLayout />}>
                        <Route path="/admin" element={<Admin />} />
                        <Route
                            path="/admin/parcels"
                            element={<ParcelsManage />}
                        />
                        <Route path="/admin/users" element={<Users />} />
                        <Route
                            path="/admin/users/customers"
                            element={<Customers />}
                        />
                        <Route
                            path="/admin/users/employees"
                            element={<Employees />}
                        />
                        <Route
                            path="/admin/users/employees/create"
                            element={<CreateEmployee />}
                        />
                        <Route
                            path="/admin/users/customers/create"
                            element={<CreateCustomer />}
                        />
                        <Route
                            path="/admin/branch/create"
                            element={<CreateBranch />}
                        />
                        <Route path="/admin/branch" element={<Branch />} />
                        <Route path="/admin/groups/" element={<Groups />} />
                        <Route
                            path="/admin/groups/create"
                            element={<CreateGroup />}
                        />
                    </Route>
                    <Route path="/admin/signin" element={<AdminSignin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
