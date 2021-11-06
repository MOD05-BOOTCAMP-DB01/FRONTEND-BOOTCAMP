import React from "react";
import { Api } from "../../Api/Api";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import LinkButton from "../../components/LinkButton/LinkButton";
import { IconContext } from "react-icons";
import "./Register.css";
import { JwtHandler } from "../../jwt-handler/JwtHandler";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useHistory } from "react-router";

export default function Register(props) {
  const handleSubmit =  async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const passwordConfirmation = event.target.passwordConfirmation.value;

    const payload = {
      username,
      email,
      password,
      passwordConfirmation: confirmPassword,
      role,
    };

    
    const response = await Api.buildApiPostRequest(
      Api.createUser(),
      payload,
      true
    );
    
    const body = await response.json();
    
    if (response.status === 201) {
      props.history.push(`/`);
    };

    console.log(response);

    if (response.status === 201) {
      const accessToken = body.token;
      JwtHandler.setJwt(accessToken);
      history.push(`/login`);
    }
  };

  return (
    <div className="form-register">
      <IconContext.Provider value={{ className: "icons__login-register" }}>
        <h1>Registrar Usuário</h1>
        <form className="form__card-register" onSubmit={handleSubmit}>
          <div className="form__card--input-register">
            <span className="form__card--icon-register">
              <FaUserAlt />
            </span>
            <input
              id="username"
              type="text"
              placeholder="Username:"
              name="username"
            />
          </div>
          <div className="form__card--input-register">
            <input id="email" type="text" placeholder="E-mail:" name="email" />
            <span className="form__card--icon-left-register">
              <AiOutlineMail />
            </span>
          </div>
          <div className="form__card--input-register">
            <span className="form__card--icon-register">
              <RiLockPasswordLine />
            </span>
            <input
              id="password"
              type="password"
              placeholder="Senha:"
              name="senha"
            />
          </div>
          <div className="form__card--input-register">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme Senha:"
              name="confirmPassword"
            />
            <span className="form__card--icon-left-register">
              <RiLockPasswordLine />
            </span>
          </div>
          <div className="form__card--input-register">
            <span className="form__card--icon-register">
              <HiOutlineBriefcase />
            </span>
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
