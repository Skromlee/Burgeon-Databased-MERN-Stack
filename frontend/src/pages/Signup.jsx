import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/common/Spinner";

const initailFormValue = {
    email: "",
    email2: "",
    password: "",
    password2: "",
    citizen: "",
};

const Signup = () => {
    const [formData, setFormData] = useState(initailFormValue);

    const { email, email2, password, password2, citizen } = formData;

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
        navigate("/signin");
    };

    const handleExit = () => {
        navigate("/");
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (email !== email2 || password !== password2) {
            toast.error("Email or Password do not match");
        } else {
            const userData = {
                email,
                password,
                citizen,
            };

            dispatch(register(userData));
        }
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
                    <h1 className="text-4xl md:text-5xl font-bold">Sign Up</h1>
                    <p>
                        Already have an account?{" "}
                        <span
                            className="text-brightRed hover:cursor-pointer"
                            onClick={handleClick}
                        >
                            Log In
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
                                type="email"
                                id="email2"
                                name="email2"
                                value={email2}
                                placeholder=" "
                                className="block px-1 w-full focus:outline-none bg-transparent"
                                onChange={onChange}
                            />
                            <label
                                className="absolute top-0 -z-1 duration-300 origin-0"
                                htmlFor="email2"
                            >
                                Type your email again
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

                        <div className="relative border-b-2 my-4 focus-within:border-brightRedLight w-96">
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={password2}
                                placeholder=" "
                                className="block px-1 w-full focus:outline-none bg-transparent"
                                onChange={onChange}
                            />
                            <label
                                className="absolute top-0 -z-1 duration-300 origin-0"
                                htmlFor="email"
                            >
                                Type your password again
                            </label>
                        </div>

                        <div className="relative border-b-2 my-4 focus-within:border-brightRedLight w-96">
                            <input
                                type="number"
                                id="citizen"
                                name="citizen"
                                value={citizen}
                                placeholder=" "
                                className="block px-1 w-full focus:outline-none bg-transparent"
                                onChange={onChange}
                            />
                            <label
                                className="absolute top-0 -z-1 duration-300 origin-0"
                                htmlFor="email"
                            >
                                Citizen
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="border-brightRed border-2  rounded-full p-2 px-6 text-brightRed hover:bg-brightRed hover:text-white duration-75"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Signup;
