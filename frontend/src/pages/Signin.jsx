import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/common/Spinner";

const initailFormValue = {
    email: "",
    password: "",
};

const Signin = () => {
    const [formData, setFormData] = useState(initailFormValue);

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
            setFormData(initailFormValue);
        }

        if (isSuccess || user) {
            navigate("/user");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClick = () => {
        navigate("/signup");
    };

    const handleExit = () => {
        navigate("/");
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="p-6 px-12 flex justify-between">
                <Link to="/">
                    <img
                        src="/logo/Burgeon.svg"
                        className="max-h-14"
                        alt="Burgeon"
                    />
                </Link>
                <div
                    className="text-4xl hover:cursor-pointer"
                    onClick={handleExit}
                >
                    <AiOutlineClose />
                </div>
            </div>
            <div className="space-y-6 flex flex-col items-center container justify-center h-[calc(100vh-104px)] mx-auto">
                <div className="space-y-6 flex flex-col items-center mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold">Sign In</h1>
                    <p>
                        Don't have an account?{" "}
                        <span
                            className="text-brightRed hover:cursor-pointer"
                            onClick={handleClick}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
                <div>
                    <form className="space-y-8 text-xl" onSubmit={onSubmit}>
                        <div className="relative border-b-2 my-4 focus-within:border-brightRedLight w-96">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder=" "
                                className="block px-1 w-full focus:outline-none bg-transparent"
                                onChange={onChange}
                            />
                            <label
                                className="absolute top-0 -z-1 duration-300 origin-0"
                                htmlFor="email"
                            >
                                Email
                            </label>
                        </div>

                        <div className="relative border-b-2 my-4 focus-within:border-brightRedLight w-96">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder=" "
                                className="block px-1 w-full focus:outline-none bg-transparent"
                                onChange={onChange}
                            />
                            <label
                                className="absolute top-0 -z-1 duration-300 origin-0"
                                htmlFor="password"
                            >
                                Password
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="border-brightRed border-2  rounded-full p-2 px-6 text-brightRed hover:bg-brightRed hover:text-white duration-75"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Signin;
