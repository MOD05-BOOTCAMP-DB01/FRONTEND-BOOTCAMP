import React from "react";
import ProgressBar from "./../ProgressBar/ProgressBar";
import objectives from "./../../Api/mock/objectives";
import { Link } from "react-router-dom";
import "./Objective.css";

const Objective = () => {
  console.log(objectives);

  return (
    <div className="objective-container">
      {objectives.map((objective, index) => {
        const { name, title, progress_status, date, id } = objective;
        return (
          <Link to={`/objective/${id}`}>
            <div className="objective-card" key={index}>
              <h3>
                <span className="objective-info">title:</span>
                {title}
              </h3>
              <h4>
                <span className="objective-info">date:</span>
                {date}
              </h4>
              <h4>
                <span className="objective-info">dono:</span>
                {name}
              </h4>
              <ProgressBar size="medium" value={progress_status} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Objective;
