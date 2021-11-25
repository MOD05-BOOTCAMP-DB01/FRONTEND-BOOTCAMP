import React, { useEffect, useState } from "react";
import { Api } from "../../../Api/Api";
import CardUser from "../../../components/CardUser/CardUser";
import { Link } from "react-router-dom";
import Input from "./../../../components/Input/Input";
import "./UpdateUsers.css";
import { toast } from "react-toastify";
import Button from "./../../../components/Button/Button";
import { useGlobalContext } from "../../../context/context";

export default function UpdateUsers() {
  const id = localStorage.getItem("USER_ID");
  const { loadUniqueUser, loggedUser } = useGlobalContext();
  let [searchString, setSearchString] = useState("");
  let [users, setUsers] = useState([]);

  useEffect(() => {
    const loadAllUsers = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(), true);
      const data = await response.json();
      setUsers(data);
    };
    loadAllUsers();
    loadUniqueUser(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;

    const payload = {
      username,
      email,
    };

    const response = await Api.buildApiPatchRequest(
      Api.updateUsers(id),
      payload,
      true
    );

    if (response.status === 200) {
      toast.success("Dados alterados com sucesso", {
        theme: "dark",
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  searchString = searchString.trim().toLowerCase();

  if (searchString.length > 0) {
    //We are searching, filter the results.
    users = users.filter(function (u) {
      return (
        u.username.toLowerCase().match(searchString) && u.id !== loggedUser.id
      );
    });
  }

  return (
    <>
      <div className="update-user-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Nome de usuário</label>
            <Input id="username" name="username" type="text" />
          </div>
          <div>
            <label htmlFor="">E-mail</label>
            <Input id="email" name="email" type="text" />
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </div>

      {loggedUser.role === "ADMIN" ? (
        <div className="search-container">
          <h2>Buscar colaboradores</h2>
          <Input
            type="text"
            value={searchString}
            onChange={handleChange}
            placeholder="Nome do usuário"
          />
          <div className="search-user">
            {searchString &&
              users.map((user) => (
                <Link to={`atualizar/user/${user.id}`}>
                  <CardUser user={user} />
                </Link>
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

// Alterar um usuário (id) - username, e-mail, role ou status
