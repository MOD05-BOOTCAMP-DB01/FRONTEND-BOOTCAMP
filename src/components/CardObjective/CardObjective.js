import React, { useEffect, useState } from "react";
import { BiCommentDots } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";

//CSS
import "./cardObjective.css";
import { cks } from "../../Api/mock/data";
import data from "../../Api/mock/data";
import { Api } from "../../Api/Api";


export default function CardObjective() {
  // const objective = {
  //   objective: "Objetivo 1",
  //   Type: "Anual",
  //   initialDate: "29/10/2021",
  //   endDate: "29/10/2022",
  //   area: "DP",
  //   unity: "DB1 Global Software",
  //   responsible: "Fulano de Tal",
  // };

  const [objective, setObjective] = useState(undefined)

  const [changeView, setChangeView] = useState(true);

  const id = "67615f4b-734e-4fce-8bf2-33d44160b864"

  useEffect(() => {
    const loadObjective = async () => {
      const response = await Api.buildApiGetRequest(Api.readObjectivesById(id),true)
      const results = await response.json()
        setObjective(results.objective)
    }
    loadObjective()
  }, []);
  console.log(objective)
  if (!objective) {
    return <h3>Loading..</h3>
  }

  const alterChangeView = () => {
    setChangeView(!changeView);
  };

  const statusColor = (status) => {
    if (status === "Em andamento") {
      return <h4 className="yellow">Em andamento</h4>;
    } else if (status === "Concluído") {
      return <h4 className="gree">Concluído</h4>;
    } else if (status === "Atraso crítico") {
      return <h4 className="red">Atraso crítico</h4>;
    } else {
      return;
    }
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
      {!changeView ? (

      // KR 
        <div className="area-kr">
          <div className="kr-header">
              <div className="kr-title-header">
                <h3>Titulo KR</h3>
                <MdOutlineLibraryAdd className="icon-add" />
              </div>

              <div className="kr-owner-header">
                <h3>Dono KR</h3>
              </div>

              <div className="kr-comment-header">
                <h3>Comentário</h3>
              </div>

              <div className="kr-type-header">
                <h3>Tipo KR</h3>
              </div>

              <div className="kr-frequency-header">
                <h3>Frequência Medição</h3>
              </div>

              <div className="kr-classification-header">
                <h3>Classificação</h3>
              </div>

              <div className="kr-vlInitial-header">
                <h3>Vl. Inicial</h3>
              </div>

              <div className="kr-vlGoal-header">
                <h3>Vl. Meta</h3>
              </div>

              <div className="kr-done-header">
                <h3>Concluído</h3>
              </div>

            </div>
            
          {/*Body KR  */}
          {objective.key_results.map((kr,i) => (
            <div className="kr-items" key={`kr-${i}`}>
              <div className="kr-title-items">
                <h4>{kr.key_result}</h4>
              </div>

              <div className="kr-owner-items">
                <h4>{kr.owner.username}</h4>
              </div>

              <div className="kr-comment-items">
                <p>{kr.comment}</p>
                <BiCommentDots className="icon-comment" />
              </div>

              <div className="kr-type-items">
                <h4>{kr.type}</h4>
              </div>

              <div className="kr-frequency-items">
                <h4>{kr.frequency}</h4>
              </div>

              <div className="kr-classification-items">
                <h4>{kr.rating}</h4>
              </div>

              <div className="kr-vlInitial-items">
                <h4>{kr.initial_value}</h4>
              </div>

              <div className="kr-vlGoal-items">
                <h4>{kr.goal_value}</h4>
              </div>
              <div className="kr-done-items">
                <input type="checkbox" />
              </div>
            </div>
          ))}
          
        </div>
      ) : (
        /* Checking */
        // repeat area title
        <div className="area-ck">
          <div className="kr-header-ck">
            <div className="kr-header">
              <h3>Titulo KR</h3>
              <MdOutlineLibraryAdd />
            </div>
            {objective.key_results.map((kr,i) => (
              <div key={`kr-ch-${i}`} className="kr-title-items-ck">
                <h4>{kr.key_result}</h4>
              </div>
              
            ))}
          </div>

          {cks.map((ck,i) => (
            <div key={`ck-${i}`} className="ck">
              <div className="ck-header">
                <h3>{ck.date}</h3>
              </div>
              {ck.status.map((st) => (
                <div className="ck-items">
                  {statusColor(st)}
                </div>
              ))}
              
            </div>
          ))}

          
        </div>
      )}
    </div>
  );
}
