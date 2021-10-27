import React from "react";

export default function Login() {
  return (
    <div className="form">
      <div className="form__card">
        <form>
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" id="email" />
          <br />
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" />
          <br />
        </form>
      </div>
    </div>
  );
}
