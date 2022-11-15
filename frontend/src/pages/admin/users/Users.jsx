import { Link } from "react-router-dom";

const Users = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">USERS</h1>
            <div className="flex flex-col space-y-4">
                <Link to="/admin/users/employees">Employees</Link>
                <Link to="/admin/users/customers">Customers</Link>
            </div>
        </div>
    );
};
export default Users;
