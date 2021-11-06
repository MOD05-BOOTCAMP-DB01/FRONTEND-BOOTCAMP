import React from "react";
import { BiUser } from "react-icons/bi";
import { MdOutlineLockOpen } from "react-icons/md";
import { IconContext } from "react-icons";
import { Api } from "../../Api/Api";
import { JwtHandler } from "../../jwt-handler/JwtHandler";
import LinkButton from "../LinkButton/LinkButton";
import { useHistory } from "react-router";
import "./Login.css";

export default function Login() {
  const history = useHistory();
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
      //  const userID = body.userID;  buscar no retorno da api uma chave userID no localstorage
      JwtHandler.setJwt(accessToken);
      //  localStorage.setItem("USER_ID", userID); setar userId no localstorage
      history.push(`/objectives`);
    }
  };
  return (
    <div className="form">
      <div>
        <IconContext.Provider value={{ className: "icons__login" }}>
          <h1>User Login</h1>
          <form className="form__card" onSubmit={handleSubmit}>
            <div className="form__card--input">
              <span className="form__card--icon">
                <BiUser />
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
              <span className="form__card--icon-left">
                <MdOutlineLockOpen />
              </span>
            </div>

            <div>
              <LinkButton type="submit" className="button button--success">
                Login
              </LinkButton>
            </div>
          </form>
        </IconContext.Provider>
      </div>
    </div>
  );
}
