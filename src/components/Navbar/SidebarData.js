import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export const SidebarData = [
  {
    title: "Meus objetivos",
    path: "/objectives",
    icon: <BiTask />,
    cName: "nav-text",
  },
  {
    title: "Configurações",
    path: "/",
    icon: <FiSettings />,
    cName: "nav-text",
  }
];

// export const SidebarLogged= [
//   {
//     title: "Meus objetivos",
//     path: "/objectives",
//     icon: <BiTask />,
//     cName: "nav-text",
//   },
// ]