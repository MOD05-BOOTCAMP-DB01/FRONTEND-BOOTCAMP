import React, { useState, useEffect } from "react";
import { Api } from "../../../Api/Api";
import Select from "react-select";
import { Link } from "react-router-dom";
import Input from "./../../../components/Input/Input";
import Button from "./../../../components/Button/Button";

function UpdateUsersAdm(props) {
  const id = props.match.params.id;
  const [user, setUser] = useState(undefined);
  const [userRoles, setUserRoles] = useState(undefined);
  const [userStatus, setUserStatus] = useState(undefined);

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
  const roleOptions = [
    { value: "ADMIN", label: "Administrador" },
    { value: "USER", label: "Usuário Comum" },
    { value: "MANAGER", label: "Gerente" },
  ];
  const statusOptions = [
    { value: true, label: "habilitado" },
    { value: false, label: "desabilitado" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const username = event.target.username.value;

    const payload = {
      email,
      username,
      role: userRoles[0],
      status: userStatus[0],
    };

    console.log(payload);

    const response = await Api.buildApiPatchRequest(
      Api.updateUsers(id),
      payload,
      true
    );

    if (response.status === 200) {
      props.history.push("/objectives");
    } else {
    }
  };

  const handleStatusChange = (selectedOption) => {
    setUserStatus(selectedOption.map((option) => option.value));
  };

  const handleRolesChange = (selectedOption) => {
    setUserRoles(selectedOption.map((option) => option.value));
  };

  return (
    <div className="update-user-container">
      <form onSubmit={handleSubmit}>
        <div className="form__updatecard">
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            id="email"
            name="email"
            defaultValue={user.email}
          />
          <br />
          <label htmlFor="username">Nome do Usuario:</label>
          <Input
            type="text"
            id="username"
            name="username"
            defaultValue={user.username}
          />
          <br />
          <div>
            <label>Roles:</label>
          </div>

          <div>
            <Select
              isMulti
              options={roleOptions}
              onChange={handleRolesChange}
            />
          </div>
          <div>
            <label>Status:</label>
          </div>

          <div>
            <Select
              isMulti
              options={statusOptions}
              onChange={handleStatusChange}
            />
          </div>
        </div>
        <div>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUsersAdm;
