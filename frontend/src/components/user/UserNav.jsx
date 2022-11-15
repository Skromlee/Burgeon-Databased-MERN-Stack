import { Link } from "react-router-dom";

import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const NAV_OPEN_WIDTH = "w-52";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const UserNav = ({ navItems }) => {
    const navRef = useRef(null);
    const [visible, setVisible] = useState(true);

    const toggleNav = (visibility) => {
        const currentNav = navRef.current;
        if (!currentNav) return;

        const { classList } = currentNav;
        if (visibility) {
            // hide our nav if true
            classList.remove(NAV_OPEN_WIDTH);
            classList.add(NAV_CLOSE_WIDTH);
        } else {
            // shwo our nav if false
            classList.remove(NAV_CLOSE_WIDTH);
            classList.add(NAV_OPEN_WIDTH);
        }
    };

    const updateNavState = () => {
        toggleNav(visible);
        const newState = !visible;
        setVisible(newState);
        localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
    };

    useEffect(() => {
        const navState = localStorage.getItem(NAV_VISIBILITY);
        if (navState !== null) {
            const newState = JSON.parse(navState);
            setVisible(newState);
            toggleNav(!newState);
        } else {
            setVisible(true);
        }
    }, []);

    return (
        <nav
            className="h-screen w-52 shadow-sm bg-brightRed flex flex-col justify-between sticky top-0 transition-width overflow-hidden"
            ref={navRef}
        >
            <div>
                {/* Logo */}
                <Link
                    to="/user"
                    className="flex items-center space-x-3 p-3 mb-10"
                >
                    <img
                        src="/logo/Burgeon_white.svg"
                        alt="Burgeon Logo"
                        className="h-6"
                    />
                    {visible && (
                        <span className="text-white text-xl font-semibold leading-none">
                            USER
                        </span>
                    )}
                </Link>
                {/* nav items */}
                <div className="space-y-6">
                    {navItems.map((item) => {
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="flex items-center text-white text-xl p-3 hover:scale-[0.98] transition"
                            >
                                <item.icon size={24} />
                                {visible && (
                                    <span className="ml-2 leading-none">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* nav toggler (button) */}
            <button
                onClick={updateNavState}
                className="text-white p-3 hover:scale-[0.98] transition self-end"
            >
                {visible ? (
                    <RiMenuFoldFill size={30} />
                ) : (
                    <RiMenuUnfoldFill size={30} />
                )}
            </button>
        </nav>
    );
};
export default UserNav;
