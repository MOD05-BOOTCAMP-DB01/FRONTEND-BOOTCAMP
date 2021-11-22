import React, { useState, useEffect, Component } from "react";
import DatePicker from "react-datepicker";
import { Api } from "./../../../Api/Api";
import { FaCalendarAlt } from "react-icons/fa";
import Button  from "./../../../components/Button/Button"
import { Link } from "react-router-dom";

import Select from "react-select";
import "./CreateObjective.css";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../../context/context";

const CreateObjective = (props) => {
  const {teams,loadTeams,loggedUser} = useGlobalContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [usernames, setUsername] = useState([]);
  const [user,setUser] = useState("");
  const [teamName,setTeamName] = useState('');
  const [type,setType]= useState('')

  
  const typeOptions = [
    { value: 'Pessoas',
      label: 'Pessoas',
    },{
      value: 'Processos',
      label: 'Processos',
    },
    { value: 'Cliente',
      label: 'Cliente',
    }
  ]
  
  useEffect(() => {
    const loadOwners = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllUsers(), true);
      const data = await response.json();
      const owners = [
        data.map((data) => {
          return {
            value: data.id,
            label: data.username,
          };
        }),
      ];
      setUsername(owners);
    };

    loadOwners();
    loadTeams();
  }, []);

  const getQuarter = ()=>{
  const month = startDate.getMonth()+1;
  console.log(month)
    if(month>=0 && month<=2){
      return 'Q1';
    }
    if(month>=3 && month<=5){
      return 'Q2';
    }
    if(month>=6 && month<=9){
      return 'Q3';
    }
    if(month>=10 && month<=12){
      console.log('entrou')
      return 'Q4';
    }
  }
  

  const handleChange = (selectedOption)=>{
    setUser(selectedOption.value);
  }
  const handleChangeTeams = (selectedOption)=>{
    setTeamName(selectedOption.value);
  }
  const handleChangeType= (selectedOption)=>{
    setType(selectedOption.value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const quarter = getQuarter();
    const objective = e.target.objective.value;
    const unity = e.target.unity.value;
    const team = teamName;
    const initial_date = startDate;
    const end_date = endDate;
    const owner = user;
    const year = startDate.getFullYear().toString();
    const payload = {
      objective,
      type,
      unity,
      initial_date,
      end_date,
      team,
      owner,
      quarter,
      year,
    }

    const response = await Api.buildApiPostRequest(Api.createObjectiveUrl(),payload,true);
    if(response.status === 201){
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
          <Select options={typeOptions} onChange={handleChangeType} id="select"/>
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
            minDate={startDate}
          ></DatePicker>
        </div>
<div className="form_container_objective-card--input">
 <label htmlFor="">Quarter</label>
         <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy, QQQ"
      showQuarterYearPicker
      
    />
    </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Time</label>
          <Select options={teams[0]} onChange={handleChangeTeams} id="select"/>
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Unidade</label>
          <input id="unity" name="unity" type="text" />
        </div>
        <div className="form_container_objective-card--input">
          <label htmlFor="">Dono</label>
          <Select options={usernames[0]} onChange={handleChange} id="select"/>
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

  }
export default CreateObjective;
