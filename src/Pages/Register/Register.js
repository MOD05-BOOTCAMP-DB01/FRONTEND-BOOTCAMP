import React from "react";
import { Api } from "../../Api/Api";
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import LinkButton from "../../components/LinkButton/LinkButton";
import { IconContext } from "react-icons";
import './Register.css';
import { JwtHandler } from "../../jwt-handler/JwtHandler";
import { HiOutlineBriefcase } from 'react-icons/hi';

export default function Register() {
  const handleSubmit =  async event => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const role = event.target.role.value;

    const payload = {
      username,
      email,
      password,
      confirmPassword,
      role
    };

    const response = await Api.buildApiPostRequest(
      Api.createUserUrl(),
      payload,
      true
    );

    const body = await response.json();

    console.log(response)

    // if (response.status === 201) {
    //   const accessToken = body.token;

    //   JwtHandler.setJwt(accessToken);
    // }
  };

  return (
    <div className='form-register'>
      <IconContext.Provider value={{ color: "#fefefe", className: "icons" }}>
        <h1>Registrar Usuário</h1>
        <form className="form__card-register" onSubmit={handleSubmit}>
            <div className="form__card--input-register">
              <span><FaUserAlt /></span>
              <input
                  id="username"
                  type="text"
                  placeholder="Coloque seu Username:"
                  name="username"
              />
            </div>
            <div className="form__card--input-register">
              <input
                  id="email"
                  type="text"
                  placeholder="Coloque seu E-mail:"
                  name="email" />
              <span><AiOutlineMail /></span>
            </div>
            <div className="form__card--input-register">
              <span><RiLockPasswordLine /></span>
              <input
                  id="password"
                  type="password"
                  placeholder="Coloque sua Senha:"
                  name="senha"
              />
            </div>
            <div className="form__card--input-register">
              <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua Senha:"
                  name="confirmPassword"
              />
              <span><RiLockPasswordLine /></span>
            </div>
            <div className="form__card--input-register">
              <span><HiOutlineBriefcase /></span>
              <input
                  id="role"
                  type="text"
                  placeholder="Coloque o seu cargo:"
                  name="role"
              />
            </div>
            <div>
              <LinkButton type="submit" className="button button--primary">
                Cadastrar
              </LinkButton>
            </div>
        </form>
      </IconContext.Provider>
    </div>
  );
}
