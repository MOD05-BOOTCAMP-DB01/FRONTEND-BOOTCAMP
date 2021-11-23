import React,{useState} from "react";
import { BiUser } from "react-icons/bi";
import { MdOutlineLockOpen } from "react-icons/md";
import { IconContext } from "react-icons";
import { Api } from "../../Api/Api";
import { JwtHandler } from "../../jwt-handler/JwtHandler";
import LinkButton from "../LinkButton/LinkButton";
import { useHistory } from "react-router";
import {useGlobalContext} from './../../context/context'
import "./Login.css";

export default function Login() {
  const {setLogin,setError,error} = useGlobalContext()
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLogin(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    const payload = {
      email,
      password,
    };
    try{
    const response = await Api.buildApiPostRequest(Api.loginUrl(), payload);
    const body = await response.json();
    
    if (response.status === 201) {
      const accessToken = body.token;
      const userID = body.userId;
      JwtHandler.setJwt(accessToken);
      localStorage.setItem("USER_ID", userID);
      setLogin(false);
      history.push(`/objectives`);
  }
  if(response.status===401){
    console.log('vixe')
  }
}catch(error){
  setError(true);
  console.log('oi');
}
  }

if(error){
  history.push(`/ERROR500`);
}
  return (
    <div className="form">
      <div>
        <IconContext.Provider value={{ className: "icons__login" }}>
          <h1 className="form__h1">Faça seu login</h1>
          <form className="form__card" onSubmit={handleSubmit}>
            <div className="form__card--input">
              <span className="form__card--icon">
                <BiUser />
              </span>

              <input
                type="text"
                name="email"
                id="email"
                placeholder="E-mail"
              />
            </div>
            <div className="form__card--input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Senha"
              />
              <span className="form__card--icon-left">
                <MdOutlineLockOpen />
              </span>
            </div>

            <div>
              <LinkButton type="submit" className="button button--purple">
                Entrar
              </LinkButton>
            </div>
          </form>
        </IconContext.Provider>
      </div>
    </div>
  );
}
