import React, { useEffect, useState } from "react";

import CreateKeyResult from '../../Pages/CreateKeyResult/CreateKeyResult';

import { useGlobalContext } from "../../context/context";

import { MdOutlineLibraryAdd } from 'react-icons/md'

//CSS
import "./cardObjective.css";
import { cks } from "../../Api/mock/data";
import data from "../../Api/mock/data";
import { Api } from "../../Api/Api";
import CardKr from "../CardKeyResult/CardKr";
import CardCk from "../CardCheckin/CardCk";

export default function CardObjective(props) {

  const [objective, setObjective] = useState(undefined);
  const [krs, setKrs] = useState([]);
  const {handleShowAddKr, showAddKr} = useGlobalContext()
  

  const [changeView, setChangeView] = useState(true);

  const id = props.match.params.id

  useEffect(() => {
    const loadObjective = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readObjectivesById(id),
        true
      );
      const results = await response.json();
     
        setObjective(results.objective);
      

      // setKrs(results.objective.key_results);
      console.log("results ==",results)  
    };

    loadObjective();
  }, [id]);

  console.log("total krs ==",krs.length)  

 

  useEffect(() => {
    const loadKr = async () => {
      const response = await Api.buildApiGetRequest(Api.readKeyResultsByObjectivesId(id),true)
      const results = await response.json()

      if (response.status === 200) {
        setKrs(results.key_results) 
        console.log("results =-",results)
      }
    }
    loadKr()
  }, [showAddKr]);

  if (!objective) {
    return <h3>Loading.. carregando obj</h3>;
  }
  if (!krs) {
    return <h3>Loading.. carregando kr</h3>;
  }

  const alterChangeView = () => {
    setChangeView(!changeView);
  };

  return (
    // Objective
    <div className="area-cardObjective">
      <div className="area-cardObjective-title">
        <h1>Key Results</h1>
        <h2>Resultados-chave</h2>
      </div>
      <div className="cardObjective">
        <div className="objective-header">
          <div className="objective-title">
            <h2>{objective.objective}</h2>
          </div>
          <div className="objective-date">
            <h3>
            {new Date(objective.initial_date).toLocaleDateString('pt-BR')} {"-"}  {new Date(objective.end_date).toLocaleDateString('pt-BR')}
            </h3>
          </div>
        </div>

        <div className="objective-body">
          <div className="objective-area">
            <h3>{objective.area}</h3>
          </div>
          <MdOutlineLibraryAdd className="kr-header-icons" onClick={() => handleShowAddKr()}/>
        
        </div>

      </div>

      <div className="objective-cardKr">
        {krs.map( kr =>
            <CardKr key={kr.id} kr={kr} objectiveId={objective.id} className="objective-cardKr"/>
        )}
        {showAddKr
          ? <CreateKeyResult objectiveId={objective.id}/>
          : ""
        }
      </div>
    </div>
  );
}
