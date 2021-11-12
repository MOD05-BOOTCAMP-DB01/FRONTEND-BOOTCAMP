import React, { useState, useEffect, Component } from "react";
import DatePicker from "react-datepicker";
import { Api } from "./../../../Api/Api";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import Select from "react-select";
import "./CreateObjective.css";
import "react-datepicker/dist/react-datepicker.css";

const CreateObjective = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [user,setUser] = useState("")
  const [usernames, setUsername] = useState([]);
  useEffect(() => {
    const loadOwners = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(), true);
      console.log(response)
      const data = await response.json();
      console.log(data);
      const options = [
        data.map((data) => {
          return {
            value: data.id,
            label: data.username,
          };
        }),
      ];
      setUsername(options);
    
    
    };
    loadOwners();
  }, []);

  const handleChange = (selectedOption)=>{
    setUser(selectedOption.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objective = e.target.objective.value;
    const type = e.target.type.value;
    const unity = e.target.unity.value;
    const area = e.target.area.value;
    const initial_date = startDate.toLocaleDateString('pt-BR').toString();
    const end_date = endDate.toLocaleDateString('pt-BR').toString();

    const payload = {
      objective,
      type,
      unity,
      initial_date,
      end_date,
      area,
      owner:user,
    }

    const response = await Api.buildApiPostRequest(Api.createObjectiveUrl(),payload,true);
     const body = await response.json();
    if(response.status === 201){
        console.log(body);
        props.history.push(`/objectives`)
    }else{
      console.log('error')
    }

  };
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
          <input name="type" id="type" type="text" />
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
            
          ></DatePicker>
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Area</label>
          <input name="area" id="area" type="text" />
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Unidade</label>
          <input id="unity" name="unity" type="text" />
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Dono</label>
          <Select options={usernames[0]} onChange={handleChange} />
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
