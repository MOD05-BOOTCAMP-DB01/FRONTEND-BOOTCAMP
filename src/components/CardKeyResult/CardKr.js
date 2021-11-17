import React, { useState } from 'react'

import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin2Line } from 'react-icons/ri'

import ViewMoreKr from './ViewMoreKr'
import UpdateKeyResult from "../../Pages/KeyResult/UpdateKeyResult/UpdateKeyResult"


import { useGlobalContext } from "../../context/context";

import './cardKr.css'



export default function CardKr({kr,objectiveId}) {
  
  const { showUpdateKr, openShowUpdateKr} = useGlobalContext()
  const [showViewMore, setShowViewMore] = useState(false)
  const [showTeste, setShowTeste] = useState(false)
  
  
  const handleShowViewMore = () => {
    setShowViewMore(!showViewMore)
  }

  const handleShowTeste = () => {
    setShowTeste(true)
    openShowUpdateKr()
    
  }

  return (
      <div className="kr">
        <div className="kr-statusBar">
          {(() => {
            if (kr.rating === "Baixo") {
              return <div className="statusBar-low"></div>;
            }else if(kr.rating === 'Médio'){
                return <div className="statusBar-medium"></div>;
            }else if(kr.rating === "Alto"){
              return <div className="statusBar-high"></div>;
            }else{
              return <div></div>;
            }
          })()}
        </div>
        <div className="kr-header">
          <div className="kr-header-title">
            <h3>{kr.key_result}</h3>
          </div>

          <div className="kr-header-buttons">
            

            <BiEdit className="kr-header-icons" onClick={() => handleShowTeste()}/>

            <RiDeleteBin2Line className="kr-header-icons"/>

          </div>

          <div className="kr-header-rating">
          <h4>{kr.rating}</h4>
          </div>

        </div>

        <div className="kr-body">
          <div className="kr-body-owner">
            <h4>{kr.owner.username}</h4>
          </div>

          <div className="kr-body-type">
            <h4>{kr.type}</h4>
          </div>

          <div className="kr-body-status">
            {(() => {
              if (kr.status == 100) {
                return <h4 className="status-gree">{kr.status}</h4>;
              }else if(kr.status >= 80){
                  return <h4 className="status-yellow">{kr.status}</h4>;
              }else if(kr.status < 80){
                return <h4 className="status-red">{kr.status}</h4>;
              }else{
                return <h4>{kr.status}</h4>;
              }
            })()}
          </div>

          <div className="kr-body-learnMore" onClick={() => handleShowViewMore()}>
            <spam >{!showViewMore ? "Ver mais": "Ver menos"}</spam>
          </div> 
            
        </div>


        <div className="kr-viewMore">
          {showViewMore ? <ViewMoreKr kr={kr}/> : ""}
          
        </div>  
        <div>
          {showTeste && !showUpdateKr ? <UpdateKeyResult kr={kr}/> : ""}
        </div>
      </div>
  )
}
