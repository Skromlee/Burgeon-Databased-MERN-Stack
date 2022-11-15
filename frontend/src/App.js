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
// user pages
import User from "./pages/user/User";
import Parcels from "./pages/user/Parcels";
import Faq from "./pages/user/Faq";
// admin pages
import Admin from "./pages/admin/Admin";
import AdminSignin from "./pages/admin/AdminSignin";
import CreateParcels from "./pages/admin/CreateParcels";
// admin pages => Users
import Users from "./pages/admin/users/Users";
// admin pages => Users => Employees
import Employees from "./pages/admin/users/employees/Employees";
import CreateEmployee from "./pages/admin/users/employees/CreateEmployees";
// admin pages => Users => Customers
import Customers from "./pages/admin/users/customers/Customers";
import CreateCustomer from "./pages/admin/users/customers/CreateCustomer";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<HomeLayout />}>
                        <Route path="/" element={<Home />} />
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
                            path="/admin/createparcels"
                            element={<CreateParcels />}
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
