import React from 'react';
import './IconTitle.scss';
import eaLogo from '../../assets/eaLogo.png'; 
import engageathonLogo from '../../assets/EngageATHON.png'; 

export default function IconTitle() {
  return (
    <div className="engageathon-logo-container">
      <img src={eaLogo} alt="EA Logo" className="eaLogo" />
      <img src={engageathonLogo} alt="EngageATHON Logo" className="engageathonLogo" />
    </div>
  );
}
