import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import {
  SidebarLogged,
  SidebarNotLogged,
  SidebarManager,
  SidebarAdmin,
} from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

import { useGlobalContext } from "../../context/context";
import logo from "./../../Assets/logo-side.png";
import navLogo from "./../../Assets/logo-nav.png";
export default function Navbar() {
  const id = localStorage.getItem("USER_ID");
  const { loggedUser, loadUniqueUser,isLogged } = useGlobalContext();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    if(isLogged){
   loadUniqueUser(id)
    }
 
  });

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>
          <img className="navbar-logo" src={navLogo} alt="imagem-logo" />
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <img src={logo} alt="" width="100px" />
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {loggedUser?.role === "USER" &&
              SidebarLogged.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="span-name">{item.title}</span>
                    </Link>
                  </li>
                );
              })}

            {!loggedUser?.role &&
              SidebarNotLogged.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="span-name">{item.title}</span>
                    </Link>
                  </li>
                );
              })}

            {loggedUser?.role === "MANAGER" &&
              SidebarManager.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="span-name">{item.title}</span>
                    </Link>
                  </li>
                );
              })}

            {loggedUser?.role === "ADMIN" &&
              SidebarAdmin.map((item, index) => {
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
  );
}
