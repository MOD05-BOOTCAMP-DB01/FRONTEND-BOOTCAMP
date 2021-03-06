import React, { useState, useEffect } from "react";

import { Api } from "../../Api/Api";

import { GoCommentDiscussion } from "react-icons/go";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";

import ModalCk from "../CardCheckin/Modal/ModalCk";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./viewMoreKr.css";

export default function ViewMoreKr({ kr }) {
  const [showModalCk, setShowModalCk] = useState(false);
  const [newDone, setNewDone] = useState(kr.done);

  useEffect(() => {}, []);
  const handleShowCk = () => {
    setShowModalCk(!showModalCk);
  };

  const handleDone = async (ev) => {
    setNewDone(!newDone);
    if (!newDone) {
      const payload = {
        done: 'yes',
      }
      const response = await Api.buildApiPatchRequest(
        Api.updateKrsUrl(kr.id),
        payload,
        true
      );

      if (response.status === 200) {
        toast.success("Resultado chave concluído", {
          theme: "dark",
          position: toast.POSITION.TOP_CENTER,
        });
        
      }
      
    }else{
      const payload = {
        done: 'no',
      }
      const response = await Api.buildApiPatchRequest(
        Api.updateKrsUrl(kr.id),
        payload,
       true
      );

      if (response.status === 200) {
        toast.success("Resultado chave não concluído", {
          theme: "dark",
          position: toast.POSITION.TOP_CENTER,
        });
        
      }
    }
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
          <label>Frequência</label>
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
            <h3>
              {" "}
              {showModalCk ? (
                <FaRegCalendarTimes className="FaRegCalendarTimes" />
              ) : (
                <FaRegCalendarPlus className="FaRegCalendarPlus" />
              )}
            </h3>
          </div>

        <div className="viewMoreKr-done">
          <label>Concluído?
          </label>

          <input type="checkbox" id="done" name="done" onClick={handleDone} checked={newDone} ></input>
          
        </div>
        </div>
        <div className={showModalCk ? "mostra" : "esconde"}>
          <ModalCk kr={kr} />
        </div>
      </div>
    </div>
  );
}
