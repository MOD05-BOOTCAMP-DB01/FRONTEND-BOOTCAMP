import React, { useState, useEffect, Component } from "react";
import DatePicker from "react-datepicker";
import { Api } from "./../../../Api/Api";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import Select from "react-select";
import "./CreateObjective.css";
import "react-datepicker/dist/react-datepicker.css";
const CreateObjective = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [username, setUsername] = useState([]);
  useEffect(() => {
    const loadOwners = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(), true);
      const data = await response.json();
      const options = [
        data.map((data) => {
          return {
            value: data.username,
            label: data.username,
          };
        }),
      ];
      setUsername(options);
    };
    loadOwners();
  }, []);

  const handleSubmit = () => {};
  return (
    <form className="form_container-objective" onSubmit={handleSubmit}>
      <h1>Adicionar um Objetivo</h1>
      <div className="form_container">
        <div className="form_container_objective-card--input">
          <label htmlFor="objective">Objetivo</label>
          <input name="objective" id="objective" type="text" />
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Tipo</label>
          <input type="text" />
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
            minDate={new Date()}
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
            minDate={startDate}
          ></DatePicker>
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Area</label>
          <input type="text" />
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Unidade</label>
          <input type="text" />
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Dono</label>
          <Select options={username[0]} />
        </div>
      </div>
      <div>
        <button type="submit" className="form_objective-button">
          Salvar
        </button>
        <Link to="/objectives">
          <button className="form_objective-button form_objective-button--red">
            Cancelar
          </button>
        </Link>
      </div>
    </form>
  );
};

export default CreateObjective;
