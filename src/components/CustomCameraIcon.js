// CustomCameraIcon.js
import React from "react";

const CustomCameraIcon = ({ onClick }) => (
  <svg
    width="75"
    height="75"
    viewBox="0 0 24 24"
    fill="none"
    onClick={onClick} 
    style={{ cursor: "pointer" }} 
  >
    <circle cx="13" cy="13" r="10" stroke="white" strokeWidth="1" />
    <circle cx="13" cy="13" r="9" fill="white" />
  </svg>
);

export default CustomCameraIcon;
