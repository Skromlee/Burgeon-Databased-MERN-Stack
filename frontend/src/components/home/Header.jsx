import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src="/logo/Burgeon.svg"
                        alt="Burgeon Logo"
                        className="max-h-10"
                    />
                    <h1 className="text-2xl font-medium">BURGEON</h1>
                </Link>

                <div className="hidden space-x-6 md:flex">
                    <NavLink
                        to="/"
                        className={(navData) =>
                            navData.isActive
                                ? `hover:text-gray-500 text-brightRed`
                                : `hover:text-gray-500`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={(navData) =>
                            navData.isActive
                                ? `hover:text-gray-500 text-brightRed`
                                : `hover:text-gray-500`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/our-teams"
                        className={(navData) =>
                            navData.isActive
                                ? `hover:text-gray-500 text-brightRed`
                                : `hover:text-gray-500`
                        }
                    >
                        Our Teams
                    </NavLink>
                    <NavLink
                        to="/my-customers"
                        className={(navData) =>
                            navData.isActive
                                ? `hover:text-gray-500 text-brightRed`
                                : `hover:text-gray-500`
                        }
                    >
                        My Customers
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={(navData) =>
                            navData.isActive
                                ? `hover:text-gray-500 text-brightRed`
                                : `hover:text-gray-500`
                        }
                    >
                        Contact
                    </NavLink>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex justify-center md:justify-start">
                        <div className="flex items-center space-x-4">
                            <div>
                                <Link
                                    to="/signin"
                                    className="hover:text-gray-500"
                                >
                                    Log in
                                </Link>
                            </div>
                            <Link
                                to="/signup"
                                className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full hover:bg-brightRedLight md:block"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Header;
