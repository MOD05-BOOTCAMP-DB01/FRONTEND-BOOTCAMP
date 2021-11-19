import React, { useState } from "react";

import { GoCommentDiscussion } from 'react-icons/go'
import { MdSubdirectoryArrowRight } from 'react-icons/md'

import ModalCk from "../CardCheckin/Modal/ModalCk";

import "./viewMoreKr.css";

export default function ViewMoreKr({ kr }) {
  console.log("kr viewMoreKr", kr);
  const [showModalCk, setShowModalCk] = useState(false);

  const handleShowCk = () => {
    setShowModalCk(!showModalCk);
  };

  
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
          <h3> {showModalCk ? "Check-out" : "Check-in"}</h3>
        </div>

        <div className="viewMoreKr-done">
          <input type="checkbox"></input>
        </div>
        </div>
        <div className={showModalCk? 'mostra':'esconde'}> 
           <ModalCk kr={kr} />
        </div>
      </div>
    </div>
  );
}
