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
        <IconContext.Provider value={{ color: "#fefefe", className: "icons" }}>
          <h1>User Login</h1>
          <form className="form__card" onSubmit={handleSubmit}>
            <div className="form__card--input">
              <span className="form__card--span">
                <FaUserAlt />
              </span>

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
              <span className="form__card--span">
                <FaLock />
              </span>
            </div>

            <div>
              <LinkButton type="submit" className="button button--success">
                Login
              </LinkButton>
            </div>
            <p>
              Não tem uma conta? <Link to="/register">Crie uma aqui!</Link>
            </p>
          </form>
        </IconContext.Provider>
      </div>
    </div>
  );
}
