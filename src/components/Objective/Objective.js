import React, { useState, useEffect } from "react";
import ProgressBar from "./../ProgressBar/ProgressBar";
// import objectives from "./../../Api/mock/objectives";
import { Api } from "./../../Api/Api";
import { Link } from "react-router-dom";
import "./Objective.css";
import { useGlobalContext } from "../../context/context";
import Spin from "react-cssfx-loading/lib/Spin";
import { SiTarget } from "react-icons/si";
import Button,{ViewMoreButton} from './../Button/Button'
import CardObjective2 from "../CardObjective2/CardObjective2";

const Objective = () => {
  const id = localStorage.getItem("USER_ID");
  const { login } = useGlobalContext();
  const {loadUniqueUser} = useGlobalContext();
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    const getAllObjectives = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readAllObjectives(),
        true
      );
      const data = await response.json();
      setObjectives(data);
    };
    loadUniqueUser(id);
    getAllObjectives();
  }, []);
 
  if (login) {
    return (
      <div className="center-loading">
        <Spin color="#e11e42" width="100px" height="100px" duration="2s" />
      </div>
    );
  }
  return (
    <div className="objective-container">
    <div className="objective-container-heading">
    {/* <SiTarget /> */}
    <h1>Objetivos</h1>
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
