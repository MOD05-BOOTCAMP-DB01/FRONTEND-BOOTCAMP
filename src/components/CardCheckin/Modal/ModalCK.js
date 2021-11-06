import React from 'react'

import { BiEdit } from 'react-icons/bi'


// CSS
import './modalCk.css'

export default function ModalCK({kr}) {
  console.log("props kr",kr)
  return (
    <div className="modalCk">
      <div className="modal-header">
        <div className="modal-title">
          <h2>{kr.key_result}</h2>
        </div>
        <div className="modal-rating">
          {(() => {
            switch (kr.rating) {
              case "Alta":   return <h3 className="rating-high">{kr.rating}</h3>;
              case "Média": return <h3 className="rating-medium">{kr.rating}</h3>;
              case "Baixo":  return <h3 className="rating-low">{kr.rating}</h3>;
              default:      return <h3>{kr.rating}</h3>;
            }
          })()}
        </div>
      </div>

      <div className="modal-areaCardCk">
        {kr.cks.map( ck => (
          <div className="cardCk">
            <div className="cardCk-date">
              <h3>{ck.date}</h3>
            </div>
            <div className="cardCk-status">
              <h3>{ck.status}</h3>
            </div>
            <div className="cardCk-iconEdit">
              <h3>
                <BiEdit className="icon-edit"/>
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="modalFooter">
        <div className="modalFooter-dono">
          <h4 >
            Dono Kr:
            <spam>{kr.owner.username}</spam>
          </h4>
        </div>

        <div className="modalFooter-vlInitial">
          <h4>
            Valor Inicial:
            <spam>{kr.initial_value || 0}
            </spam></h4>
        </div>

        <div className="modalFooter-vlGoal">
          <h4>
            Meta:
            <spam>{kr.goal_value}</spam>
            </h4>
        </div>
      </div>
    </div>
  )
}
