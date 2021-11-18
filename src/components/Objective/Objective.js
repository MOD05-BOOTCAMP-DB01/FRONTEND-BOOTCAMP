import React, { useState, useEffect } from "react";
import ProgressBar from "./../ProgressBar/ProgressBar";
// import objectives from "./../../Api/mock/objectives";
import { Api } from "./../../Api/Api";
import { Link } from "react-router-dom";
import "./Objective.css";
import { useGlobalContext } from "../../context/context";
import Button,{ViewMoreButton} from './../Button/Button'
import CardObjective2 from "../CardObjective2/CardObjective2";

const Objective = () => {
  const id = localStorage.getItem("USER_ID");
  const {loggedUser,loadUniqueUser} = useGlobalContext();
  const [objectives, setObjectives] = useState([]);
  useEffect(() => {
    const getAllObjectives = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readAllObjectives(),
        true
      );
      const data = await response.json();
      setObjectives(data);
      console.log("data",data)
    };
    loadUniqueUser(id);
    getAllObjectives();
  }, []);
  

  console.log(loggedUser)
  return (
    <div className="objective-container">
    <div className="objective-container-heading">
    <h1>Objetivos</h1>
    </div>
      {objectives.map((objective) => {
        return (
          <CardObjective2 objective={objective}/>
        );
      })}
    </div>
  );
};

export default Objective;
