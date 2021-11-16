import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SidebarData,SidebarLogged, SidebarNotLogged,SidebarManager, SidebarAdmin } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { JwtHandler } from "../../jwt-handler/JwtHandler";
import { useGlobalContext } from "../../context/context";

export default function Navbar() {
  const {loggedUser} = useGlobalContext();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [isLogged, setIsLogged] = useState('');

  useEffect(() => {
    const handleOnJwtChange = () => {
        setIsLogged(!JwtHandler.isJwtValid());
    };

    window.addEventListener("onJwtChange", handleOnJwtChange);

    return () => {
        window.removeEventListener("onJwtChange", handleOnJwtChange);
    };
  }, []);
 console.log(loggedUser);
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
            {loggedUser.role ==="USER" && 
              (SidebarLogged.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="span-name">{item.title}</span>
                  </Link>
                </li>
              );
            })
            ) }
            
            {!loggedUser.role &&
            (
              SidebarNotLogged.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="span-name">{item.title}</span>
                  </Link>
                </li>)})
            )}

            {loggedUser.role ==="MANAGER" &&
            (
              SidebarManager.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="span-name">{item.title}</span>
                  </Link>
                </li>)})
            )}

            {loggedUser.role ==="ADMIN" &&
            (
              SidebarAdmin.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="span-name">{item.title}</span>
                  </Link>
                </li>)})
            )}



          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
