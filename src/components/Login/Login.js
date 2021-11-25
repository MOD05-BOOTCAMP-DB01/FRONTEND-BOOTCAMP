import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { MdOutlineLockOpen } from "react-icons/md";
import { IconContext } from "react-icons";
import { Api } from "../../Api/Api";
import { JwtHandler } from "../../jwt-handler/JwtHandler";
import { useHistory } from "react-router";
import { useGlobalContext } from "./../../context/context";
import { toast } from "react-toastify";
import "./Login.css";

// Formik
import { Formik, Field, Form, ErrorMessage } from "formik";
import schemaLogin from "./schemaLogin";

export default function Login() {
  const { setLogin, loggedUser } = useGlobalContext();

  const [buttonVisbility, setButtonVisbility] = useState(false);

  const history = useHistory();

  const handleSubmit = async (values) => {
    setLogin(true);

    const payload = {
      ...values,
    };

    const response = await Api.buildApiPostRequest(Api.loginUrl(), payload);
    const body = await response.json();

    if (response.status === 201) {
      const accessToken = body.token;
      const userID = body.userId;
      JwtHandler.setJwt(accessToken);
      localStorage.setItem("USER_ID", userID);
      setLogin(false);
      toast.success("Bem-vindo", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
      });
      history.push(`/objectives`);
    } else {
      toast.error("Usuário ou senha incorreto", {
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Digite um e-mail valido.";
    }

    if (!values.password) {
      errors.password = "Digite uma senha valida.";
    }

    if (!Object.keys(errors).length) {
      setButtonVisbility(true);
    } else {
      setButtonVisbility(false);
    }

    return errors;
  }

  return (
    <div className="form">
      <div>
        <IconContext.Provider value={{ className: "icons__login" }}>
          <h1 className="form__h1">Faça seu login</h1>
          <Formik
            validationSchema={schemaLogin}
            onSubmit={handleSubmit}
            validate={validate}
            validateOnMount
            initialValues={{
              email: "",
              password: null,
            }}
            render={({ values, errors, isvalid }) => (
              <Form className="form__card">
                <div className="form__card--input">
                  <span className="form__card--icon">
                    <BiUser />
                  </span>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    placeholder="E-mail"
                    className="form__card--field"
                  />
                  <div className="formError">
                    <ErrorMessage name="email">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="form__card--input">
                  <span className="form__card--icon-left">
                    <MdOutlineLockOpen />
                  </span>
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Senha"
                    className="form__card--field"
                  />
                  <div className="formError">
                    <ErrorMessage name="password">
                      {(msg) => <span className="fieldError">{msg}</span>}
                    </ErrorMessage>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={Object.keys(errors).length}
                    className="button button--purple"
                    id={buttonVisbility ? "mostrar" : "esconder"}
                  >
                    Entrar
                  </button>
                </div>
              </Form>
            )}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
}
