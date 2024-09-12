import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ThankYou.scss';
import backgroundImage from '../../assets/backgroundImage.png';
import IconTitle from '../../components/IconTitle/IconTitle';
import MainButton from '../../components/MainButton/MainButton';
import prize from '../../assets/prizes/prize.png';
import starBadge from '../../assets/prizes/star-badge.png';

export default function ThankYou() {
    const navigate = useNavigate();

    const handlePress = () => {
        navigate(''); 
    };

  return (
    <div className="container">
        <img
            src={backgroundImage}
            alt="Background"
            className="background-image"
        />
        
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