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
  const {teams,loadTeams,loggedUser,loadQuarter,quarter,loadYears,years,setQuarter,setYears} = useGlobalContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [usernames, setUsername] = useState([]);
  const [user,setUser] = useState("");
  const [teamSelected,setTeamSelected] = useState('');
  const [quarterSelected,setQuarterSelected] = useState('');
  const [yearSelected,setYearSelected] = useState('');
  const [type,setType]= useState('');

  
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
    loadYears();
    loadQuarter();
  }, []);


  const handleChange = (selectedOption)=>{
    setUser(selectedOption.value);
  }
  const handleChangeTeams = (selectedOption)=>{
    setTeamSelected(selectedOption.value);
  }
  const handleChangeType= (selectedOption)=>{
    setType(selectedOption.value)
  }
  const handleChangeQuarter= (selectedOption)=>{
    setQuarterSelected(selectedOption.value);
  }
  const handleChangeYears= (selectedOption)=>{
    setYearSelected(selectedOption.value);
    const yearAdd = (parseInt(selectedOption.label)+1).toString();
    setStartDate(new Date(yearAdd));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const objective = e.target.objective.value;
    const unity = e.target.unity.value;
    const team = teamSelected;
    const initial_date = startDate;
    const end_date = endDate;
    const owner = user;
    const yearId = yearSelected;
    const quarterId= quarterSelected;
    const payload = {
      objective,
      type,
      unity,
      initial_date,
      end_date,
      team,
      owner,
      quarter:quarterId,
      year:yearId,
    }
    const response = await Api.buildApiPostRequest(Api.createObjectiveUrl(),payload,true);
    if(response.status === 201){
        props.history.push(`/objectives`)
    }else{
      console.log('error')
    }

  };


  return (
    <div className="create-objective_container">
     <h1>Adicionar objetivo</h1>
    <form className="form_container-objective" onSubmit={handleSubmit}>
      <div className="form_container">
        <div className="form_container_objective-card--input">
          <label htmlFor="objective">Objetivo</label>
          <input name="objective" id="objective" type="text" />
        </div>
         <div className="form_container_objective-card--input">
          <label htmlFor="">Tipo</label>
          <Select options={typeOptions} onChange={handleChangeType} id="select"/>
        </div>
        <div className="form_container_objective-card--input">
 <label htmlFor="">Ano</label>
         <Select options={years[0]}
         onChange={handleChangeYears}
         id="select"
    />
    </div>
    <div className="form_container_objective-card--input">
 <label htmlFor="">Quarter</label>
         <Select options={quarter}
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
            minDate={startDate}
          ></DatePicker>
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
    </div>
  );

  }
export default CreateObjective;
