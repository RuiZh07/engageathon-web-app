import React from "react";
import './MainButton.scss';

const MainButton = ({ onClick, title }) => {
  return (
    <button onClick={onClick} className="main-button">
      <span className="button-text">{title}</span>
    </button>
  );
};

export default MainButton;
