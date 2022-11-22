import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../../features/admin/adminSlice";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { admin } = useSelector((state) => state.admin);
    useEffect(() => {
        if (!admin) {
            navigate("/admin/signin");
        }
    }, [admin, navigate]);

    const onLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="mx-auto text-center my-auto h-screen flex flex-col justify-center space-y-20">
            <h1 className="text-7xl">Welcome to Admin Section ...</h1>
            <h1 className="text-7xl">OF BURGEON SYSTEM</h1>
            <div>
                <p>Email : {admin && admin.email}</p>
                <p>Role : {admin && admin.role}</p>
                <button onClick={onLogout}>Log Out</button>
            </div>
        </div>
    );
};
export default Admin;
