import React, { useState } from "react";
import { Api } from "../../Api/Api";
import { toast } from "react-toastify";
import { AiOutlineTeam } from "react-icons/ai";
import { IconContext } from "react-icons";
import Button from "../../components/Button/Button";
import "./CreateTeam.css";


function CreateTeam() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const team = e.target.team.value;

    const payload = {
      team,
    };

    console.log(team);

    const response = await Api.buildApiPostRequest(
      Api.readAllTeams(),
      payload,
      true
    );

    const body = await response.json();

    if (response.status === 201) {
      toast.success("Time cadastrado com sucesso!", {
        theme: "dark",
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="team">
      <IconContext.Provider value={{ className: "icons_team" }}>
        <h1 className="team_h1">Crie um time</h1>
        <form className="team_form" onSubmit={handleSubmit}>
          <div className="team_form_create">
            <span className="team_form_icon"><AiOutlineTeam /></span>
            <div className="team_form_input">
              <input id="team" type="text" placeholder="Nome do time" name="team" />
            </div>
          </div>

          <div className="team_button">
            <button type="submit">Criar</button>
          </div>
        </form>
      </IconContext.Provider> 
    </div>
  );
}

export default CreateTeam;
