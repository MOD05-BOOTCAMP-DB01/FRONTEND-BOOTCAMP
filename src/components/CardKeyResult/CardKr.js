import React, { useState } from "react";

import coelho from "../../Assets/coelho.png";
import tartaruga from "../../Assets/tartaruga.png";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

import ViewMoreKr from "./ViewMoreKr";
import UpdateKeyResult from "../../Pages/KeyResult/UpdateKeyResult/UpdateKeyResult";

import "./cardKr.css";
import DeleteKeyResult from "../../Pages/KeyResult/DeleteReyResult/DeleteKeyResult";

export default function CardKr({ kr, objectiveId }) {
  const [showViewMore, setShowViewMore] = useState(false);

  const [showUpdateKr, setShowUpdateKr] = useState(false);

  const [showDeletekr, setShowDeleteKr] = useState(false);

  const handleShowViewMore = () => {
    setShowViewMore(!showViewMore);
  };

  const handleShowOpenUpdateKr = () => {
    setShowUpdateKr(true);
  };

  const handleShowDeletekr = () => {
    setShowDeleteKr(true);
  };

  return (
    <>
      <div className="kr">
        <div className="kr-statusBar">
          {(() => {
            if (kr.rating === "Baixo") {
              return <div className="statusBar-low"></div>;
            } else if (kr.rating === "Médio") {
              return <div className="statusBar-medium"></div>;
            } else if (kr.rating === "Alto") {
              return <div className="statusBar-high"></div>;
            } else {
              return <div></div>;
            }
          })()}
        </div>
        <div className="kr-header">
          <div className="kr-header-title">
            <h3>{kr.key_result}</h3>
          </div>

          <div className="kr-header-buttons">
            <BiEdit
              className="kr-header-icons"
              onClick={() => handleShowOpenUpdateKr()}
            />

            <RiDeleteBin2Line
              className="kr-header-icons"
              onClick={() => handleShowDeletekr()}
            />
          </div>
        </div>

        <div className="kr-body">
          <div className="kr-body-owner">
            <h4>{kr.owner.username}</h4>
          </div>

          <div className="kr-body-type">
            <h4>{kr.type}</h4>
          </div>

          <div className="kr__moonshot">
            <span>
              {(() => {
                if (kr.moonshot === "yes") {
                  return <img src={coelho} alt="Coelho" />;
                } else if (kr.moonshot === "no") {
                  return <img src={tartaruga} alt="Tartaruga" />;
                } else {
                  return <></>;
                }
              })()}
            </span>
          </div>

          <div className="kr-body-status">
            {(() => {
              if (kr.status >= 100) {
                return <h4 className="status-gree">{kr.status}%</h4>;
              } else if (kr.status >= 80) {
                return <h4 className="status-yellow">{kr.status}%</h4>;
              } else if (kr.status < 80) {
                return <h4 className="status-red">{kr.status}%</h4>;
              } else {
                return <h4>{kr.status}%</h4>;
              }
            })()}
          </div>

          <div
            className="kr-body-learnMore"
            onClick={() => handleShowViewMore()}
          >
            <span>{!showViewMore ? "Ver mais" : "Ver menos"}</span>
          </div>
        </div>

        <div>
          {showUpdateKr ? (
            <UpdateKeyResult
              kr={kr}
              closeUpdateKr={() => setShowUpdateKr(false)}
            />
          ) : (
            ""
          )}

          {showDeletekr ? (
            <DeleteKeyResult
              krId={kr.id}
              titleKr={kr.key_result}
              objectiveId={objectiveId}
              closeDeleteKr={() => setShowDeleteKr(false)}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {showViewMore ? <ViewMoreKr kr={kr} /> : ""}
    </>
  );
}
