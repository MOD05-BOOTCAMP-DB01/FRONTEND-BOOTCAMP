import React from "react";
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri'

export default function Cadastro() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const confirmEmail = event.prevent.confirmEmail.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const role = event.target.role.value;

    const payload = {
      email,
      confirmEmail,
      password,
      confirmPassword,
      role,
    };
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
            <span><FaUserAlt /></span>
            <input
                className="form-input"
                type="text"
                placeholder="Coloque seu Username:"
                name="username"
            ></input>
            <br />
            <span><AiOutlineMail /></span>
            <input
                className="form-input-email"
                type="text"
                placeholder="Coloque seu E-mail:"
                name="email"
            ></input>
            <br />
            <input
                className="form-input-email-confirm"
                type="text"
                placeholder="Confirme seu E-mail:"
                name="email"
            ></input>
            <br />
            <span><RiLockPasswordLine /></span>
            <input
                className="form-input-password"
                type="text"
                placeholder="Coloque sua Senha:"
                name="senha"
            ></input>
            <br />
            <input
                className="form-input-password-confirm"
                type="text"
                placeholder="Confirme sua Senha:"
                name="senha"
            ></input>
        </div>
      </form>
    </div>
  );
}
