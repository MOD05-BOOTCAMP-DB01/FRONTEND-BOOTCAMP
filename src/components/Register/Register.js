import React from "react";
import { Api } from "../../Api/Api";
import { AiOutlineMail } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { MdOutlineLockOpen } from "react-icons/md";
import LinkButton from "../LinkButton/LinkButton";
import { IconContext } from "react-icons";
import "./Register.css";
import { HiOutlineBriefcase } from "react-icons/hi";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register({setRegister,props}) {

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const passwordConfirmation = event.target.passwordConfirmation.value;
    const role = event.target.role.value;

    const payload = {
      username,
      email,
      password,
      passwordConfirmation,
      role,
    };

    
    const response = await Api.buildApiPostRequest(
      Api.createUser(),
      payload,
      true
    );
    
    const body = await response.json();

      if (response.status === 201) {
      setRegister(false)  
      toast.success('Usuário cadastrado com sucesso!', {theme: "dark",position: toast.POSITION.TOP_CENTER,
});
    }
    }
    
  

  return (
    <div className="form-register">
      <IconContext.Provider value={{ className: "icons__login-register" }}>
        <h1 className ="form__h1-register">Registrar Usuário</h1>
        <form className="form__card-register" onSubmit={handleSubmit}>
          <div className="form__card--input-register">
            <span className="form__card--icon-register">
              <BiUser />
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
              <MdOutlineLockOpen />
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
              id="passwordConfirmation"
              type="password"
              placeholder="Confirme Senha:"
              name="passwordConfirmation"
            />
            <span className="form__card--icon-left-register">
              <MdOutlineLockOpen />
            </span>
          </div>
          <div>
            <LinkButton type="submit" className="button button--purple">
              Cadastrar
            </LinkButton>
          </div>
        </form>
      </IconContext.Provider>
    </div>
  );
}
