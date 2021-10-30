import React from "react";
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri'
import LinkButton from "../../components/LinkButton/LinkButton";
import './Cadastro.css';

export default function Cadastro() {
  const handleSubmit =  (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const payload = {
      username,
      email,
      password,
      confirmPassword
    };

    console.log(payload)
  };

  return (
    <div className='form-register'>
      <h1>User Register</h1>
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
          <div>
            <LinkButton type="submit" className="button button--primary">
              Cadastrar
            </LinkButton>
          </div>
      </form>
    </div>
  );
}
