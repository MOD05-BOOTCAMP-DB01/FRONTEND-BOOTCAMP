import React, { useState, useEffect } from "react";
import ProgressBar from "./../ProgressBar/ProgressBar";
// import objectives from "./../../Api/mock/objectives";
import { Api } from "./../../Api/Api";
import { Link } from "react-router-dom";
import "./Objective.css";

const Objective = () => {
  const id = localStorage.getItem("USER_ID");
  const [objectives, setObjectives] = useState([]);
  useEffect(() => {
    const getAllObjectives = async () => {
      const response = await Api.buildApiGetRequest(
        Api.readAllObjectives(),
        true
      );
      const data = await response.json();
      setObjectives(data);
      console.log("data",data)
    };
    getAllObjectives();
  }, []);
  console.log("objetivos",objectives);

  return (
    <div className="objective-container">
      {objectives.map((objective) => {
        const { objective: name, initial_date, id, type } = objective;
        return (
          <Link to={`/objective/${id}`}>
            <div className="objective-card" key={id}>
              <h3>
                <span className="objective-info">title:</span>
                {name}
              </h3>
              <h4>
                <span className="objective-info">date:</span>
                {initial_date}
              </h4>
              <h4>
                <span className="objective-info">dono:</span>
                {/* {username} */}
              </h4>

              <ProgressBar size="medium" value={50} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Objective;
