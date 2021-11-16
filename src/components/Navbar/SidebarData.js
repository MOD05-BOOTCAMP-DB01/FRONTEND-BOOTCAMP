import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiTask,BiTargetLock } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {FiInfo } from "react-icons/fi";
import {FaRegUserCircle } from "react-icons/fa";


export const SidebarNotLogged = [
  {
    title: "Login",
    path: "/",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  
  {
    title: "Sobre nós",
    path: "/sobre",
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
    title: "Redefinir usuário",
    path: "/editar/usuario",
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
    title: "Redefinir usuário",
    path: "/editar/usuario",
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

export const SidebarManager = [
  {
    title: "Objetivos",
    path: "/objectives",
    icon: <BiTargetLock />,
    cName: "nav-text",
  },
  {
    title: "Adicionar objetivos",
    path: "/objective",
    icon: <BiTargetLock />,
    cName: "nav-text",
  },
   {
    title: "Redefinir usuário",
    path: "/editar/usuario",
    icon: <FaRegUserCircle />,
    cName: "nav-text",
  }, 
  {
    title: "Logout",
    path: "/logout",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
]