import { Link } from "react-router-dom";

const Footer = () => {
    return (
        // <!-- Footer -->
        <footer className="bg-veryDarkBlue">
            {/* <!-- Flex Container --> */}
            <div className="container mx-auto flex flex-col-reverse justify-between space-y-8 px-6 py-10 md:flex-row md:space-y-0">
                {/* <!-- Logo and siocail Links container --> */}
                <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:items-start md:space-y-0">
                    <Link
                        to="/admin"
                        className="md:hidden px-6 py-2 text-sm text-slate-500"
                    >
                        Admin Section
                    </Link>
                    <div className="mx-auto my-6 text-center text-white md:hidden  items-center">
                        Copyright &copy; 2022, All Rights Reserved
                    </div>
                    {/* <!-- Logo --> */}
                    <div className="flex space-x-4 items-center">
                        <img
                            src="/logo/Burgeon_white.svg"
                            alt="Burgeon Logo"
                            className="max-h-10"
                        />
                        <h1 className="text-2xl text-white font-medium  items-center">
                            BURGEON
                        </h1>
                    </div>
                </div>

                {/* <!-- List Container --> */}
                <div className="flex justify-around space-x-32">
                    <div className="hidden text-white md:block align-middle my-auto">
                        Copyright &copy; 2022, All Rights Reserved
                    </div>
                </div>
                {/* <!-- Input Container --> */}
                <div className="flex flex-col justify-center items-center">
                    <Link
                        to="/admin"
                        className="hidden md:block px-6 py-2 text-sm text-slate-500"
                    >
                        Admin Section
                    </Link>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
