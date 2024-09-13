import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MainButton from '../../components/MainButton/MainButton';
import './JourneyChoiceScreen.scss';


export default function JourneyChoiceScreen() {
    const navigate = useNavigate();
  
    const handleFinish = () => {
        navigate('/collect-rewards'); 
    };

    const handleGoBack = () => {
        navigate('/activity-screen'); 
    };

  return (
    <div className="container">
        <h3 className="continueJourneyText">Are your sure you’d like to finish your engaging journey here?</h3>
        <p className="moveOnText">Once you move on, you <span style={{ color: 'red' }}>will not</span> be able to enter the event again. </p>
        <div className="button-container">
            <MainButton title="Go Back to Activities" onClick={handleGoBack} />
        </div>
        <p className='orText'>or</p>
        <button class="finishEngagingButton" onClick={handleFinish}>Finish Engaging</button>

    </div>
  );
}
