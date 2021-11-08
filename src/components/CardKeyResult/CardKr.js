import React, { useState } from 'react'

import { BiCommentDots } from 'react-icons/bi'
import { MdOutlineLibraryAdd } from 'react-icons/md'
import CreateKeyResult from '../../Pages/CreateKeyResult/CreateKeyResult';


export default function CardKr({krs,objectiveId}) {
  console.log("krs do card kr=", krs)
  console.log("objectiveId cardKr=", objectiveId)
  const [showAddKr, setShowAddKr] = useState(false);

  const handleShowAddKr = () => {
    setShowAddKr(!showAddKr);
    
  }

  return (
    <div className="area-kr">
      <div className="kr-header">
        <div className="kr-title-header">
          <h3>Titulo KR</h3>
          <MdOutlineLibraryAdd className="icon-add" onClick={handleShowAddKr}/>
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
      {krs.map((kr, i) => (
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

      {showAddKr 
        ? <CreateKeyResult objectiveId={objectiveId}/>
        : ""
      }
    </div>
  )
}
