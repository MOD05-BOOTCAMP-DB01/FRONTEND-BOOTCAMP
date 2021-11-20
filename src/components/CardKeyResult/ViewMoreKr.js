import React, { useState } from "react";

import {Api} from "../../Api/Api";

import { GoCommentDiscussion } from 'react-icons/go'
import { MdSubdirectoryArrowRight } from 'react-icons/md'
import { FaRegCalendarPlus } from 'react-icons/fa'
import { FaRegCalendarTimes } from 'react-icons/fa'

import ModalCk from "../CardCheckin/Modal/ModalCk";

import "./viewMoreKr.css";


export default function ViewMoreKr({ kr }) {

  console.log("kr viewMoreKr", kr);
  const [showModalCk, setShowModalCk] = useState(false);
  const [newDone, setNewDone] = useState(kr.done);
  console.log("newDone", newDone);
  const handleShowCk = () => {
    setShowModalCk(!showModalCk);
  };

  const handleDone = async (ev) => {
    let confirmed = document.getElementById('done')
    
    if(confirmed.checked) {
      const payload = {
        done: true,
      }
      console.log("entrou no checked")
      const response = await Api.buildApiPatchRequest(
        Api.updateKrsUrl(kr.id),
        payload,
        true
      );
      setNewDone(true)
    }
    
  }
  
  return (
    <div className="area-viewMoreKr">
      <div className="viewMoreKr">
      <div className="viewMore-header">
        <div className="viewMore-icon-subRigth">
          <MdSubdirectoryArrowRight />
        </div>

        <div className="viewMoreKr-comment">
            <p>{kr.comment}</p>
            <GoCommentDiscussion className="icon-comment" />
        </div>

        <div className="viewMoreKr-frequency">
          <h3>{kr.frequency}</h3>
        </div>

        <div className="viewMoreKr-initialValue">
          <label>Valor Inicial</label>
          <h3>{kr.initial_value}</h3>
        </div>

        <div className="viewMoreKr-goalValue">
          <label>Meta</label>
          <h3>{kr.goal_value}</h3>
        </div>

        <div className="viewMoreKr-checkin" onClick={() => handleShowCk()}>
          <h3> {showModalCk ? <FaRegCalendarTimes className="FaRegCalendarTimes"/> : <FaRegCalendarPlus className="FaRegCalendarPlus"/> }</h3>
        </div>

        <div className="viewMoreKr-done">
        {newDone ? 
          <input type="checkbox" id="done" name="done" onClick={handleDone} checked ></input>
          :
          <input type="checkbox" id="done" name="done" onClick={handleDone} ></input>
        }
          
        </div>
        </div>
        <div className={showModalCk? 'mostra':'esconde'}> 
           <ModalCk kr={kr} />
        </div>
      </div>
    </div>
  );
}
