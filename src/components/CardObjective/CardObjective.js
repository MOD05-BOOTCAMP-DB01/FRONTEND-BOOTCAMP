import React, { useState } from "react";
import { BiCommentDots } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";

//CSS
import "./cardObjective.css";
import { cks } from "../../Api/mock/data";
import data from "../../Api/mock/data";


export default function CardObjective() {
  const objective = {
    objective: "Objetivo 1",
    Type: "Anual",
    initialDate: "29/10/2021",
    endDate: "29/10/2022",
    area: "DP",
    unity: "DB1 Global Software",
    responsible: "Fulano de Tal",
  };

  const [changeView, setChangeView] = useState(true);

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
          <h3>{objective.responsible}</h3>
        </div>

        <div>
          <h4>
            {objective.initialDate} {"-"} {objective.endDate}
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
          {data.map((kr) => (
            <div className="kr-items">
              <div className="kr-title-items">
                <h4>{kr.title}</h4>
              </div>

              <div className="kr-owner-items">
                <h4>{kr.owner}</h4>
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
                <h4>{kr.classification}</h4>
              </div>

              <div className="kr-vlInitial-items">
                <h4>{kr.vlInitial}</h4>
              </div>

              <div className="kr-vlGoal-items">
                <h4>{kr.vlGoal}</h4>
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
            {data.map((kr) => (
              <div className="kr-title-items-ck">
                <h4>{kr.title}</h4>
              </div>
              
            ))}
          </div>

          {cks.map((ck) => (
            <div className="ck">
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
