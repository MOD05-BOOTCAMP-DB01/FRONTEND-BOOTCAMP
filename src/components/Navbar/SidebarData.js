import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { GiArchiveRegister } from "react-icons/gi";

export const SidebarData = [
  {
    title: "Login",
    path: "/",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Cadastro",
    path: "/register",
    icon: <GiArchiveRegister />,
    cName: "nav-text",
  },
  {
    title: "Objetivos",
    path: "/objectives",
    icon: <BiTask />,
    cName: "nav-text",
  },
];
