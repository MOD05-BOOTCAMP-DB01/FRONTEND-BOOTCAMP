import React, { useState } from "react";
import "./Home.css";
import Register from "../Register/Register";
import { Link } from "react-router-dom";
import Button from "./../../components/LinkButton/LinkButton";
import Login from "./../Login/Login";

const Home = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="home_container">
      <div className="home_container-banner">
        <div className="home_container-headding">
          <h2>Não tem conta?</h2>
          <p>Cadastre-se e fique sempre conectado</p>

          <Button type="text" className="button button--outline" onClick={() => setRegister(!register)}>
            Cadastre-se
          </Button>
        </div>
      </div>
      {register ? <Register /> : <Login />}
    </div>
  );
};

export default Home;