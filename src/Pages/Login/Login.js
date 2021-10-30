import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

import LinkButton from "../../components/LinkButton/LinkButton";
import "./Login.css";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const payload = {
      email,
      password,
    };

    console.log(payload);

    console.log("enviou");
  };
  return (
    <div className="form">
      <div>
        <IconContext.Provider value={{ color: "#006d99", className: "icons" }}>
          <h1>User Login</h1>
          <form className="form__card" onSubmit={handleSubmit}>
            <div className="form__card--input">
              <FaUserAlt />

              <input
                type="text"
                name="email"
                id="email"
                placeholder="E-mail:"
              />
            </div>
            <div className="form__card--input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Senha:"
              />

              <FaLock />
            </div>

            <div>
              <LinkButton type="submit" className="button button--primary">
                Login
              </LinkButton>
            </div>
          </form>
          <p>Não tem uma conta?</p>
          <Link to="/">Crie uma Aqui!</Link>
        </IconContext.Provider>
      </div>
    </div>
  );
}
