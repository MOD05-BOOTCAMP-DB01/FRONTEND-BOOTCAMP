import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { JwtHandler } from "../jwt-handler/JwtHandler";


export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [isLogged, setIsLogged] = useState(JwtHandler.isJwtValid);

  useEffect(() => {
    const handleOnJwtChange = () => {
        setIsLogged(!JwtHandler.isJwtValid());
    };

    window.addEventListener("onJwtChange", handleOnJwtChange);

    return () => {
        window.removeEventListener("onJwtChange", handleOnJwtChange);
    };
  }, []);
 
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {isLogged ? (<li className="nav-text" onClick={() => setIsLogged(!isLogged)}>
                  <Link to="/logout" >
                    <AiFillHome />
                    <span className="span-name">Logout</span>
                  </Link>
                </li>) : 
                (<li className="nav-text" onClick={() => setIsLogged(isLogged)}>
                  <Link to="/">
                    <AiFillHome />
                    <span className="span-name">Login</span>
                  </Link>
                </li>)}

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="span-name">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
};