import React, { useEffect, useState } from 'react'


// import { BsFillCircleFill } from 'react-icons/bs'
import { AiOutlineAppstoreAdd,AiFillPushpin } from 'react-icons/ai'


import { Api } from '../../../Api/Api';
// import CreateKeyResult from '../../../Pages/CreateKeyResult/CreateKeyResult';


// CSS
import './modalCk.css'

export default function ModalCk({kr}) {
  console.log("props kr",kr)
  const [cks, setCks] = useState([]);

  useEffect(() => {

    const loadCheckin = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readCheckinsByKeyResultId(kr.id),
        true
      );
      const result = await response.json();
      setCks(result);
      console.log("checkin", cks)
    };

    loadCheckin();
  }, []);


  return (
  
      <div className="modalCk">
        <div className="modal-header">
          {/* <div className="modal-title">
            <h2>{kr.key_result}</h2>
          </div> */}

          <div className="modal-header-items">
            <AiOutlineAppstoreAdd className="chapterAdd" />
            <div className="modal-rating">
              {(() => {
                switch (kr.rating) {
                  case "Alto":   return <h3 className="rating-high">{kr.rating}</h3>;
                  case "Médio": return <h3 className="rating-medium">{kr.rating}</h3>;
                  case "Baixo":  return <h3 className="rating-low">{kr.rating}</h3>;
                  default:      return <h3>{kr.rating}</h3>;
                }
              })()}
            </div>
          </div>
        </div>

        <div className="modal-areaCardCk">
          {cks.map( ck => (
            <div className="cardCk">
              <div className="checkin-status">
              <AiFillPushpin/>
              </div>
              <div className="cardCK-date">
                <h3>27</h3>
                <h4>Jan</h4>
              </div>
              <div className="cardCK-value">
                <h3>{ck.current_value}</h3>
              </div>
              <div className="">
                <h3>
                  {/* <BiEdit className="icon-edit"/> */}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="modalFooter">
          {/* <div className="modalFooter-owner">
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
          </div> */}
        </div>


      </div>


  )
}
