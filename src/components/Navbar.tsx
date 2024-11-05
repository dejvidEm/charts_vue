import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";

const Navbar: React.FC = () => {
    const [burgerClass, setBurgerClass] = useState<string>("burger-bar unclicked");
    const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);

    const updateMenu = () => {
        setIsMenuClicked(!isMenuClicked);
        setBurgerClass(isMenuClicked ? "burger-bar unclicked" : "burger-bar clicked");
    };

    return (
        <div className="w-full h-auto fixed top-0 left-0 z-[9999999]">
            <nav className="w-full h-20 bg-gray-800 flex justify-start p-4 z-10">
                <div className="burger-menu ml-4 h-full w-12 flex flex-col items-start justify-between cursor-pointer" onClick={updateMenu}>
                    <div className={`${burgerClass} w-12 h-2 bg-blue-500 rounded transition-transform duration-500`} />
                    <div className={`${burgerClass} w-12 h-2 bg-blue-500 rounded transition-transform duration-500`} />
                    <div className={`${burgerClass} w-12 h-2 bg-blue-500 rounded transition-transform duration-500`} />
                </div>
                <h1 className="font-bold text-white text-center flex-1 text-3xl">
                    GraphApp
                </h1>
                <div className="w-16"></div>
            </nav>

            <div className={`menu w-1/3 md:w-1/6 h-screen bg-indigo-300 absolute top-0 left-0 mt-20 transition-transform duration-500 ease-in-out ${isMenuClicked ? 'translate-x-0 z-20' : '-translate-x-full z-0'}`}>
                <ul className="flex flex-col items-start p-4 space-y-4">
                    <li>
                        <Link to="/" className="text-white" onClick={updateMenu}>Domov</Link>
                    </li>
                    <li>
                        <Link to="/stranka1" className="text-white" onClick={updateMenu}>Stranka 1</Link>
                    </li>
                    <li>
                        <Link to="/stranka2" className="text-white" onClick={updateMenu}>Stranka 2</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;