import React from 'react';
import './IconTitle.scss';
import eaLogo from '../../assets/eaLogo.png'; 
import engageathonLogo from '../../assets/EngageATHON.png'; 

export default function IconTitle() {
  return (
    <div className="engageathon-logo-container">
      <img src={eaLogo} alt="EA Logo" style={{ width: '46px', height: '42px' }} />
      <img src={engageathonLogo} alt="EngageATHON Logo" style={{ transform: 'scale(1.2)', marginLeft: '26px' }} />
    </div>
  );
}
