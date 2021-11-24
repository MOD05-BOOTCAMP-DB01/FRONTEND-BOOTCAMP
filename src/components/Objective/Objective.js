import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Api } from "./../../Api/Api";
import "./Objective.css";
import { useGlobalContext } from "../../context/context";
import Spin from "react-cssfx-loading/lib/Spin";
import CardObjective2 from "../CardObjective2/CardObjective2";

const Objective = (props) => {
  const id = localStorage.getItem("USER_ID");
  const { loadTeams,teams,loadUniqueUser,getAllObjectives,error,years,loadYears,objectives,setObjectives } = useGlobalContext();
  const [team,setTeam] = useState('')
  const [ isMine,setIsMine] = useState(true);
  const [ isGeneral,setIsGeneral] = useState(false);
 
  useEffect(() => {
    loadUniqueUser(id);
    loadTeams();
    setTeam(teams[0]);
    loadYears()
    getAllObjectives();
  }, []);


  console.log(years);
  if(error){
    props.history.go("/ERROR500")
  }
const handleChange = async (selectedOption)=>{
    const year=selectedOption?.label;
    if(year){
      const response = await Api.buildApiGetRequest(Api.readObjectiveByYear(year),true)
    const results = await response?.json()
    setObjectives(results[0].objectives)
    }else{
      getAllObjectives();
    }
    
  }

  const quarterFilter = async (e)=>{
    
    const quarter = e.target.id;
    if(quarter ==='clear'){
      getAllObjectives();
      return;
    }
    const response = await Api.buildApiGetRequest(Api.readObjectiveByQuarter(quarter),true);
    const data = await response.json();
    setObjectives(data[0].objectives);
  }

  const handleMyObjectives = (e)=>{
    const element = e.target.id;
    if(element==="my-objectives"){
      setIsMine(true);
      setIsGeneral(false);
    }else{
      setIsMine(false);
      setIsGeneral(true);
    }
  }


  return (
    <div className="objective-container">
    <div className="objective-container-heading">
    <h2 id="my-objectives" class={`${isMine && 'checked'}`} onClick={handleMyObjectives}>Meus Objetivos</h2>
    <h2 id="general-objectives" class={`${isGeneral && 'checked'}`} onClick={handleMyObjectives}>Objetivos Gerais</h2>
    <div className="objective-container_filter">
    <Select placeholder="Ano" options={years[0]} onChange={handleChange} isClearable></Select>
    <div className="quarter-container">
     <div class="radio-group">
<input type="radio" id="Q1" name="quarter" onClick={quarterFilter}></input><label for="Q1">Q1</label>
<input type="radio" id="Q2" name="quarter" onClick={quarterFilter}></input><label for="Q2">Q2</label>
<input type="radio" id="Q3" name="quarter" onClick={quarterFilter}></input><label for="Q3">Q3</label>
<input type="radio" id="Q4" name="quarter" onClick={quarterFilter}></input><label for="Q4">Q4</label>
<input type="radio" id="clear" name="quarter" onClick={quarterFilter}></input><label for="clear">TODOS</label>
  </div>
    </div>
    </div>
    </div>
      {objectives.map((objective) => {
        return (
          <CardObjective2 key={objective.objective} objective={objective}/>
        );
      })}
    </div>
  );
};

export default Objective;
