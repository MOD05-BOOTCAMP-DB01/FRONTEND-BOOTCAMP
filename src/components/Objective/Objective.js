import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Api } from "./../../Api/Api";
import "./Objective.css";
import { useGlobalContext } from "../../context/context";
import Spin from "react-cssfx-loading/lib/Spin";
import CardObjective2 from "../CardObjective2/CardObjective2";

const Objective = (props) => {
  const id = localStorage.getItem("USER_ID");
  const { login,loadTeams,teams,loadUniqueUser,setError,error,years,loadYears } = useGlobalContext();
  const [team,setTeam] = useState('')
  const [objectives, setObjectives] = useState([]);
 
  useEffect(() => {
    const getAllObjectives = async () => {

      try{
      const response = await Api.buildApiGetRequest(
        Api.readAllObjectives(),
        true
      );
      const data = await response.json();
      setObjectives(data);
      }catch(error){
        setError(true);
        console.log(error.status);
      }
    };
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
    const year=selectedOption.label;
    const response = await Api.buildApiGetRequest(Api.readObjectiveByYear(year),true)
    const results = await response?.json()
    setObjectives(results[0].objectives)
  }

  return (
    <div className="objective-container">
    <div className="objective-container-heading">
    {/* <SiTarget /> */}
    <h1>Objetivos</h1>
    <div className="objective-container_filter">
    <Select placeholder="Ano" options={years[0]} onChange={handleChange} ></Select>
    <div className="quarter-container">
     <div class="radio-group">
<input type="radio" id="Q1" name="quarter" ></input><label for="Q1">Q1</label>
<input type="radio" id="Q2" name="quarter"></input><label for="Q2">Q2</label>
<input type="radio" id="Q3" name="quarter"></input><label for="Q3">Q3</label>
<input type="radio" id="Q4" name="quarter"></input><label for="Q4">Q4</label>
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
