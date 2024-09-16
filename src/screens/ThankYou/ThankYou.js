import React from 'react';
import './ThankYou.scss';
import IconTitle from '../../components/IconTitle/IconTitle';

export default function ThankYou() {
  return (
    <div className="container">
      <IconTitle />
        <div className="feedbackContentContainer">
            <div className="greatJobContainer">
                <h1 className="congratsText">CONGRATS!</h1>
                <div style={{ marginTop: '20px' }}>
                    <p className="thankYouText">You've completed your 1st ENGAGEATHON event!</p>
                 </div>
                 <div style={{ marginTop: '20px' }}>
                    <p className="thankYouText">Thank you for engaging with us!</p>
                 </div>
            </div>   
        </div>
    </div>
  );
}