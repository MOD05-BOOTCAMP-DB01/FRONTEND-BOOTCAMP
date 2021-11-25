import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Api } from "./../../../Api/Api";
import { FaCalendarAlt } from "react-icons/fa";
import Button from "./../../../components/Button/Button";
import { Link } from "react-router-dom";

import Select from "react-select";
import "./UpdateObjective.css";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../../context/context";

const UpdateObjective = (props) => {
  const { id } = props.match.params;
  const {
    years,
    quarter,
    loadQuarter,
    loadYears,
    teams,
    loadTeams,
    setQuarter,
    setYears,
    setTeams,
    setError
  } = useGlobalContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [objective, setObjective] = useState([]);
  const [user, setUser] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [usernames, setUsername] = useState([]);

  useEffect(() => {
    const loadOwners = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(), true);
       if(!response.ok){
      const msg = `House um erro no banco ${response.status}`;
      setError(true);
      throw new Error(msg);
    }
      const data = await response.json();
  
      const options = [
        data?.map((data) => {
          return {
            value: data,
            label: data.username,
          };
        }),
      ];
      setUsername(options);
      loadQuarter();
      loadTeams();
      loadYears();
    };

    const loadObjective = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readObjectivesById(id),
        true
      );
      const data = await response.json();
      const obj = data?.objective;
      setObjective(obj);
      setSelectedUser({ value: obj.owner.id, label: obj.owner.username });
      setSelectedYear({ value: obj.year.id, label: obj.year.year });
      setSelectedQuarter({ value: obj.quarter.id, label: obj.quarter.quarter });
      setSelectedTeam({ value: obj.team.id, label: obj.team.team });
      setStartDate(new Date(obj.initial_date));
      setEndDate(new Date(obj.end_date));
    };

    loadOwners();
    loadObjective();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedUser({
      value: selectedOption.value,
      label: selectedOption.label,
    });
    setUser(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objective = e.target.objective.value;
    const type = e.target.type.value;
    const unity = e.target.unity.value;
    const team = selectedTeam;
    const initial_date = startDate;
    const end_date = endDate;
    const owner = selectedUser.value;
    const payload = {
      objective,
      type,
      unity,
      initial_date,
      end_date,
      team,
      owner,
      quarter,
    };

    const response = await Api.buildApiPatchRequest(
      Api.updateObjectiveUrl(id),
      payload,
      true
    );
    if (response.status === 200) {
      props.history.push(`/objectives`);
    } else {
      console.log("error");
    }
  };
  const handleChangeQuarter = (selectedOption) => {
    setSelectedQuarter({
      value: selectedOption.value,
      label: selectedOption.label,
    });
    setQuarter(selectedOption.value);
  };
  const handleChangeYears = (selectedOption) => {
    setSelectedYear({
      value: selectedOption.value,
      label: selectedOption.label,
    });
    setYears(selectedOption.value);
    const yearAdd = (parseInt(selectedOption.label) + 1).toString();
    setStartDate(new Date(yearAdd));
  };
  const handleChangeTeams = (selectedOption) => {
    setSelectedTeam({
      value: selectedOption.value,
      label: selectedOption.label,
    });
    setTeams(selectedOption.value);
  };

  return (
    <div className="create-objective_container">
      <h1>Editar Objetivo</h1>

      <form className="form_container-objective" onSubmit={handleSubmit}>
        <div className="form_container">
          <div className="form_container_objective-card--input">
            <label htmlFor="objective">Objetivo</label>
            <input
              name="objective"
              id="objective"
              type="text"
              defaultValue={objective.objective}
            />
          </div>
          <div className="form_container_objective-card--input">
            <label htmlFor="">Tipo</label>
            <input
              name="type"
              id="type"
              type="text"
              defaultValue={objective.type}
            />
          </div>
          <div className="form_container_objective-card--input">
            <label htmlFor="">Ano</label>
            <Select
              options={years[0]}
              value={selectedYear}
              onChange={handleChangeYears}
              id="select"
            />
          </div>
          <div className="form_container_objective-card--input">
            <label htmlFor="">Quarter</label>
            <Select
              options={quarter}
              value={selectedQuarter}
              onChange={handleChangeQuarter}
              id="select"
            />
          </div>
          <div className="form_container_objective-card--input date">
            <label htmlFor="">Data Inicial</label>
            <span className="teste">
              <FaCalendarAlt />
            </span>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="form_container_objective-card--input date">
            <label htmlFor="">Data Final</label>
            <span className="teste">
              <FaCalendarAlt />
            </span>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            ></DatePicker>
          </div>
          <div className="form_container_objective-card--input">
            <label htmlFor="">Time</label>
            <Select
              value={selectedTeam}
              options={teams[0]}
              onChange={handleChangeTeams}
              id="select"
            />
          </div>
          <div className="form_container_objective-card--input">
            <label htmlFor="">Unidade</label>
            <input
              id="unity"
              name="unity"
              type="text"
              defaultValue={objective.unity}
            />
          </div>
          <div className="form_container_objective-card--input">
            <label htmlFor="">Dono</label>
            <Select
              value={selectedUser}
              options={usernames[0]}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_button-container">
          <Button type="submit">Salvar</Button>
          <Link to="/objectives">
            <Button>Cancelar</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateObjective;
