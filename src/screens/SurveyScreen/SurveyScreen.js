import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MainButton from '../../components/MainButton/MainButton';
import './SurveyScreen.scss';

export default function SurveryScreen() {
    const navigate = useNavigate();

    const handlePress = () => {
        navigate('/congratulations'); 
    };

  return (
    <div className="container">
        <div className="feedbackContentContainer">
            <div className="greatJobContainer">
                <h1 className="rateText">Rate your<br />experience</h1>
                <div style={{ marginTop: '20px' }}>
                    <p className="shareText">Share your experience to help us improve and earn extra rewards</p>
                 </div>
            </div>
            <div className="feedbackContainer">
                <input type="text" placeholder="Share your experience with us..." className="feedbackInput" />
            </div>
        </div>
        <div className="button-container">
            <MainButton title="Submit" onClick={handlePress} />
        </div>

        {/*
        <button class="skipButton" onClick={handlePress}>Skip</button>
        */}

    </div>
  );
}