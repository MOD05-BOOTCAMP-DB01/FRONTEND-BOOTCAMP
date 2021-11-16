import React, { useState, useEffect } from "react";
import ProgressBar from "./../ProgressBar/ProgressBar";
// import objectives from "./../../Api/mock/objectives";
import { Api } from "./../../Api/Api";
import { Link } from "react-router-dom";
import "./Objective.css";
import { useGlobalContext } from "../../context/context";
import Button,{ViewMoreButton} from './../Button/Button'

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
        const { objective: name, initial_date, id, type,owner,end_date,status } = objective;
        return (
          
            <div className="objective-card" key={id}>
            <div className="objective-container-title">
              <h3>
                <span className="objective-info">Titulo:</span>
                {name}
              </h3>
              <div className="status-bar">
              <ProgressBar size="medium" value={50} />
              </div>
              </div>
              <div className="objective-container-body">
               <h4>
                <span className="objective-info">Dono:</span>
                {owner.username}
              </h4>
               <h4>
                <span className="objective-info">Tipo:</span>
                {type}
              </h4>
              <h4>
                <span className="objective-info">Começa em:</span>
                {new Date(initial_date).toLocaleDateString('pt-BR')}
              </h4>
              <h4>
                <span className="objective-info">Termina em:</span>
                {new Date(end_date).toLocaleDateString('pt-BR')}
              </h4>
              </div>
              <div className="objective-button-container">
              <Link to={`/objective/${id}`}><ViewMoreButton>Ver Mais</ViewMoreButton></Link>
              {loggedUser.role === 'MANAGER' && <Link to={`/editar/objetivo/${id}`}><Button>Editar</Button></Link>}
              </div>
            </div>
         
        );
      })}
    </div>
  );
};

export default Objective;
