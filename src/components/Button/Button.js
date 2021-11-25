import React from "react";
import "./Button.css";

const Button = (props) => {
  return <button className="btn fourth" {...props}></button>;
};

export const ViewMoreButton = ({ children }) => {
  return (
    <a className="effect effect-5" href="#" title="Learn More">
      {children}
    </a>
  );
};

export const DefaultButton = ({ children }) => {
  return (
    <button className="btn-default">
      <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
      </svg>
      <span>{children}</span>
    </button>
  );
};

export default Button;
