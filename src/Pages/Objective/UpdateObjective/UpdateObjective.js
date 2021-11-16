import React, { useState, useEffect, Component } from "react";
import DatePicker from "react-datepicker";
import { Api } from "./../../../Api/Api";
import { FaCalendarAlt } from "react-icons/fa";
import Button  from "./../../../components/Button/Button"
import { Link } from "react-router-dom";

import Select from "react-select";
import "./UpdateObjective.css";
import "react-datepicker/dist/react-datepicker.css";

const UpdateObjective = (props) => {
  const {id} = props.match.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [objective,setObjective] = useState([])
  const [user,setUser] = useState("")
  const [selectedUser,setSelectedUser] = useState({})
  const [usernames, setUsername] = useState([]);

  useEffect(() => {
    const loadOwners = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(), true);
      const data = await response.json();
      const options = [
        data.map((data) => {
          return {
            value: data,
            label: data.username,
          };
        }),
      ];
      setUsername(options);
      console.log(options)
    };

    const loadObjective = async()=>{
      const response = await Api.buildApiGetRequest(Api.readObjectivesById(id), true);
      const data = await response.json();
      setObjective(data.objective);
      setSelectedUser({value:data.objective.owner,label:data.objective.owner.username})
      setStartDate(new Date(data.objective.initial_date))
      setStartDate(new Date(data.objective.end_date))
      
    }
    loadOwners();
    loadObjective();
  }, []);

  const handleChange = (selectedOption)=>{
    setSelectedUser({value:selectedOption.value,label:selectedOption.label});
    setUser(selectedOption.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const objective = e.target.objective.value;
    const type = e.target.type.value;
    const unity = e.target.unity.value;
    const area = e.target.area.value;
    const initial_date = startDate;
    const end_date = endDate;
    const owner = selectedUser.value;
    const payload = {
      objective,
      type,
      unity,
      initial_date,
      end_date,
      area,
      owner,
    }

    const response = await Api.buildApiPatchRequest(Api.updateObjectiveUrl(id),payload,true);
    if(response.status === 200){
        props.history.push(`/objectives`)
    }else{
      console.log('error')
    }
  };

  return (
    <form className="form_container-objective" onSubmit={handleSubmit}>
      <h1>Editar um Objetivo</h1>
      <div className="form_container">
        <div className="form_container_objective-card--input">
          <label htmlFor="objective">Objetivo</label>
          <input name="objective" id="objective" type="text" defaultValue={objective.objective} />
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Tipo</label>
          <input name="type" id="type" type="text" defaultValue={objective.type}/>
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
           minDate={new Date()}
          ></DatePicker>
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Area</label>
          <input name="area" id="area" type="text" defaultValue={objective.area}/>
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Unidade</label>
          <input id="unity" name="unity" type="text" defaultValue={objective.unity}/>
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Dono</label>
          <Select  value= {selectedUser} options={usernames[0]} onChange={handleChange} />
        </div>
      </div>
      <div className="form_button-container">
        <Button type="submit" >
          Salvar
        </Button>
        <Link to="/objectives">
          <Button>
            Cancelar
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default UpdateObjective;
