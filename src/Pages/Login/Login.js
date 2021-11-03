import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { Api } from "../../Api/Api";
import { JwtHandler } from "../../jwt-handler/JwtHandler";
import LinkButton from "../../components/LinkButton/LinkButton";
import "./Login.css";

export default function Login(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const payload = {
      email,
      password,
    };

    const response = await Api.buildApiPostRequest(Api.loginUrl(), payload);
    const body = await response.json();

    if (response.status === 201) {
      const accessToken = body.token;

      JwtHandler.setJwt(accessToken);
      props.history.push(`/objectives`);
    }
  };
  return (
    <div className="form">
      <div>
        <IconContext.Provider value={{ className: "icons__login" }}>
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
