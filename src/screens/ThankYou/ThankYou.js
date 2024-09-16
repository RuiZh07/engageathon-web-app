import React from 'react';
import './ThankYou.scss';
import IconTitle from '../../components/IconTitle/IconTitle';

export default function ThankYou() {
  return (
    <div className="container">
      <IconTitle />
        <div className="thankYouContainer">
            <div className="greatJobContainer">
                <h1 className="congratsText">CONGRATS!</h1>
                <div style={{ marginTop: '30px' }}>
                    <p className="thankYouText">You've completed your 1st<br /> ENGAGEATHON event!</p>
                 </div>
                 <div>
                    <p className="thankYouText">Thank you for engaging with us!</p>
                 </div>
            </div>   
        </div>
    </div>
  );
}