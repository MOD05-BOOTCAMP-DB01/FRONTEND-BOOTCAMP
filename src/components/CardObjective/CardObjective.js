import React, { useEffect, useState } from "react";

//CSS
import "./cardObjective.css";
import { cks } from "../../Api/mock/data";
import data from "../../Api/mock/data";
import { Api } from "../../Api/Api";
import CardKr from "../CardKeyResult/CardKr";
import CardCk from "../CardCheckin/CardCk";

export default function CardObjective(props) {

  const [objective, setObjective] = useState(undefined);
  const [krs, setKrs] = useState(undefined);
  

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
  }, []);


  useEffect(() => {
    const loadKr = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllKrsUrl(),true)
      const results = await response.json()
        setKrs(results)
        console.log("results =-",results)
    }
    loadKr()
  }, []);

  if (!objective) {
    return <h3>Loading..</h3>;
  }
  if (!krs) {
    return <h3>Loading.. carregando kr</h3>;
  }

  const alterChangeView = () => {
    setChangeView(!changeView);
  };

  return (
    // Objective
    <div className="cardObjective">
      <div className="area-objective">
        <div className="objective-header">
          <h3>{objective.unity}</h3>
        </div>
        <button className="changeView" onClick={alterChangeView}>
          {changeView ? "Detalhes" : "Ver Status"}
        </button>
        <div className="objective">
          <h3>{objective.area}</h3>
          <h3>{objective.objective}</h3>
          <h3>{objective.owner.username}</h3>
        </div>

        <div>
          <h4>
            {objective.initial_date} {"-"} {objective.end_date}
          </h4>
        </div>
      </div>
      {/* Conditional render */}
      {!changeView ? <CardKr krs={krs} /> : <CardCk krs={krs} />}
    </div>
  );
}
