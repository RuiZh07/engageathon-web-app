import React from 'react';
import './ThankYou.scss';

export default function ThankYou() {
  return (
    <div className="container">
        <div className="confirmation-content-container">
            <div className="greatJobContainer">
                <h1 className="welcome-text">CONGRATS!</h1>
                <div style={{ marginTop: '20px' }}>
                    <p className="overviewText">You've completed your 1st ENGAGEATHON event!</p>
                 </div>
                 <div style={{ marginTop: '20px' }}>
                    <p className="overviewText">Thank you for engaging with us!</p>
                 </div>
            </div>   
        </div>
    </div>
  );
}