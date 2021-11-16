import React, { useState } from "react";
import "./Home.css";
import Register from "../../components/Register/Register";
import { Link } from "react-router-dom";
import Button from "./../../components/LinkButton/LinkButton";
import Login from "../../components/Login/Login";
import {useGlobalContext} from './../../context/context'
import Spin from "react-cssfx-loading/lib/Spin";
const Home = (props) => {
const {login,loggedUser} = useGlobalContext()
  const [register, setRegister] = useState(false);
if(login){
  return (
    <div className="center-loading">
    <Spin color="#e11e42" width="100px" height="100px" duration="2s"/>
    </div>
  )
}
console.log(loggedUser.role)
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
      {register ? <Register setRegister={setRegister} {...props} /> : <Login {...props} />}
    </div>
  );
};

export default Home;
