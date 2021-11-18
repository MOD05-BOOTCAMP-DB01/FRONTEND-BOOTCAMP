import React, { useState, useEffect } from "react";
import { Api } from "../../../Api/Api";
import LinkButton from "../../../components/LinkButton/LinkButton";

function UpdateUsersAdm(props) {
  const id = props.match.params.id;
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const loadUser = async () => {
      const response = await Api.buildApiGetRequest(Api.readUserbyId(id), true);

      const results = await response.json();

      const { user } = results;

      setUser(user);
    };

    loadUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const role = event.target.role.value;

    const payload = {
      email,
      username,
      password,
      role,
    };

    const response = await Api.buildApiPatchRequest(
      Api.updateUsers(id),
      payload,
      true
    );

    if (response.status === 200) {
      props.history.push("/");
    } else {
    }
  };

  return (
    <div className="content">
      <div className="content__Form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__updatecard">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={user.email}
            />
            <br />
            <label htmlFor="username">Nome do Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={user.username}
            />
            <br />
            <label htmlFor="password">Senha:</label>
            <input
              type="text"
              id="password"
              name="password"
              defaultValue={user.password}
            />
            <br />
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" name="role" defaultValue={user.role} />
            <br />
          </div>
          <div>
            <LinkButton
              type="submit"
              value="enviar"
              className="button button--primary"
            >
              Enviar
            </LinkButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUsersAdm;
