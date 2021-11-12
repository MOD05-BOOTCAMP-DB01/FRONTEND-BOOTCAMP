import React, { useState } from 'react'

import { BiCommentDots } from 'react-icons/bi'

import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin2Line } from 'react-icons/ri'

import ViewMoreKr from './ViewMoreKr'


import { useGlobalContext } from "../../context/context";

import './cardKr.css'



export default function CardKr({kr,objectiveId}) {
  console.log("krs do card kr=", kr)
  console.log("objectiveId cardKr=", objectiveId)
  const {handleShowAddKr, showAddKr} = useGlobalContext()
  const [showViewMore, setShowViewMore] = useState(false)
  
  const handleShowViewMore = () => {
    setShowViewMore(!showViewMore)
  }

  return (
      <div className="kr">
        <div className="kr-statusBar">
          {(() => {
            if (kr.rating === "Baixa") {
              return <div className="statusBar-gree"></div>;
            }else if(kr.rating === 'Média'){
                return <div className="statusBar-yellow"></div>;
            }else if(kr.rating === "Alta"){
              return <div className="statusBar-red"></div>;
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
            

            <BiEdit className="kr-header-icons"/>

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

          <div className="kr-body-learnMore">
            <spam onClick={() => handleShowViewMore()}>{!showViewMore ? "Ver mais": "Ver menos"}</spam>
          </div> 
            
        </div>
        {showViewMore ? <ViewMoreKr className="kr-viewMore" kr={kr}/> : ""}
          
      </div>
  )
}
