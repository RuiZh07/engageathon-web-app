import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SurveyScreen.scss';
import backgroundImage from '../../assets/backgroundImage.png';
import IconTitle from '../../components/IconTitle/IconTitle';
import MainButton from '../../components/MainButton/MainButton';
import prize from '../../assets/prizes/prize.png';
import starBadge from '../../assets/prizes/star-badge.png';

export default function SurveryScreen() {
    const navigate = useNavigate();

    const handlePress = () => {
        navigate('/image-slider'); 
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
                <h1 className="welcome-text">Rate your<br />experience</h1>
                <div style={{ marginTop: '20px' }}>
                    <p className="overviewText">Share your experience to help us improve and earn extra rewards</p>
                 </div>
            </div>
            <div className="feedbackContainer">
            <input type="text" placeholder="Share your experience with us..." className="feedbackInput" />
            </div>
        </div>
        <div className="submitButtonContainer">
            <MainButton title="Submit" onClick={handlePress} />
        </div>
        <button class="skipButton">Skip</button>

    </div>
  );
}