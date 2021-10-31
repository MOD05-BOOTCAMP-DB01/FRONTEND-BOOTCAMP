import React, { useState, useEffect } from "react";
import { Button, Progress } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useGlobalContext } from "../../context/context";

const ProgressBar = (props) => {
  const { completeTask } = useGlobalContext();

  return (
    <div>
      <Progress
        percent={props.value}
        progress
        indicating
        size={props.size}
        style={{ "z-index": "0" }}
      />
    </div>
  );
};

export default ProgressBar;
