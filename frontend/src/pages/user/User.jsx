import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    logout,
    getUserDetails,
    updateUserDetails,
} from "../../features/auth/authSlice";
import EditDialog from "../../components/user/EditDialog";
import Spinner from "../../components/common/Spinner";

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );
    const {
        _id,
        email,
        firstname,
        lastname,
        phone,
        citizen,
        addressNo,
        province,
        district,
        subdistrict,
        postcode,
        dob,
    } = user;

    const [visibility, setVisibility] = useState(false);

    const [formDetails, setFormDetails] = useState({
        _id,
        email: email,
        firstname: "",
        lastname: "",
        phone: "",
        citizen: citizen,
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
        dob: "",
    });

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (citizen && !firstname) {
            setVisibility(true);
        } else {
            setVisibility(false);
        }

        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate, citizen, firstname, isError, message, dispatch]);

    const onLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const isEditing = () => {
        setVisibility((prev) => !prev);
        dispatch(getUserDetails());
    };
    const editingHandler = () => {};
    const exitHandler = () => {};
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails(formDetails));
    };
    const onChange = (e) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    return (
        <>
            {visibility && (
                <EditDialog
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    exitHandler={exitHandler}
                    submitHandler={submitHandler}
                    emp={formDetails}
                    onChange={onChange}
                />
            )}

            <div>
                <h1>Account Protected Page</h1>
                <button onClick={onLogout}>Log Out</button>
                <button onClick={() => setVisibility(true)}>Log Out</button>
            </div>
        </>
    );
};
export default User;
