import React from "react";
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri'
import LinkButton from "../../components/LinkButton/LinkButton";
import './Cadastro.css';

export default function Cadastro() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const role = event.target.role.value;

    const payload = {
      email,
      password,
      confirmPassword,
      role,
    };
  };

  return (
    <div className='form'>
      <h1>User Register</h1>
      <form className="form__card" onSubmit={handleSubmit}>
          <div>
            <span><FaUserAlt /></span>
            <input
                className="form__card--input"
                type="text"
                placeholder="Coloque seu Username:"
                name="username"
            />
          </div>
          <div>
            <input
                className="form__card--input"
                type="text"
                placeholder="Coloque seu E-mail:"
                name="email" />
            <span><AiOutlineMail /></span>
          </div>
          <div>
            <input
                className="form__card--input"
                type="password"
                placeholder="Coloque sua Senha:"
                name="senha"
            />
            <span><RiLockPasswordLine /></span>
          </div>
          <div>
            <input
                className="form__card--input"
                type="password"
                placeholder="Confirme sua Senha:"
                name="senha"
            />
            <span><RiLockPasswordLine /></span>
          </div>
          <div>
            <LinkButton>Cadastrar</LinkButton>
          </div>
      </form>
    </div>
  );
}
