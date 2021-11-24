import React, { useState } from "react";
import "./Home.css";
import Register from "../../components/Register/Register";
import ModalAcess from "./../../components/ModalAcess/ModalAcess";
import { Link } from "react-router-dom";
import Button from "./../../components/LinkButton/LinkButton";
import Login from "../../components/Login/Login";
const Home = (props) => {
  const [register, setRegister] = useState(false);

  return (
    <div className="home_container">
      <div className="home_container-banner">
        <div className="home_container-headding">
          <h2>{!register ? "Não tem conta?" : "Já tem conta?"}</h2>
          <p>
            {!register
              ? "Cadastre-se e fique sempre conectado"
              : "Entre e acesse a nossa plataforma"}
          </p>

          <Button
            type="text"
            className="button button--outline"
            onClick={() => setRegister(!register)}
          >
            {!register ? "Cadastre-se" : "Entrar"}
          </Button>
        </div>
      </div>
      {register ? (
        <Register setRegister={setRegister} {...props} />
      ) : (
        <Login {...props} />
      )}
    </div>
  );
};

export default Home;
