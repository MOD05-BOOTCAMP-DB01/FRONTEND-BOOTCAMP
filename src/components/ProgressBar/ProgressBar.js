import React from "react";
import { Progress } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const ProgressBar = (props) => {
  return (
    <div>
      <Progress
        percent={props.value}
        progress
        indicating
        size={props.size}
        style={{ "zIndex": "0" }}
      >
      {props.children}</Progress>
    </div>
  );
};

export default ProgressBar;
