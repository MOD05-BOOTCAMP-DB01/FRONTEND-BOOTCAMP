import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useGlobalContext } from "../../context/context";
import { JwtHandler } from "../../jwt-handler/JwtHandler";

export default function Logout() {
    const {setLoggedUser} = useGlobalContext();
    useEffect(() => {
        JwtHandler.clearJwt();
        setLoggedUser('')
    });

    return <Redirect to="/"/>;
}