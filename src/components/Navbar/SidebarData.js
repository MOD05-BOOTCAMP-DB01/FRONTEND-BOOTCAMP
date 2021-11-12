import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {FiInfo } from "react-icons/fi";

export const SidebarNotLogged = [
  {
    title: "Login",
    path: "/",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  
  {
    title: "Sobre nós",
    path: "/#",
    icon: <FiInfo />,
    cName: "nav-text",
  },

];

export const SidebarLogged= [
 
  {
    title: "Objetivos",
    path: "/objectives",
    icon: <BiTask />,
    cName: "nav-text",
  },
  {
    title: "Atualizar dados",
    path: "/atualizar/user",
    icon: <BiTask />,
    cName: "nav-text",
  }, 
  {
    title: "Logout",
    path: "/logout",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
]


export const SidebarAdmin = [
  {
    title: "Objetivos",
    path: "/objectives",
    icon: <BiTask />,
    cName: "nav-text",
  },
  {
    title: "Adicionar objetivos",
    path: "/objectives",
    icon: <BiTask />,
    cName: "nav-text",
  },
  {
    title: "Atualizar dados",
    path: "/atualizar/user",
    icon: <BiTask />,
    cName: "nav-text",
  },
]