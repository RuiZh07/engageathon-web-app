import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './WelcomeScreen.scss';
import IconTitle from '../../components/IconTitle/IconTitle';
import MainButton from '../../components/MainButton/MainButton';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate('/image-slider'); 
  };

  return (
    <div className="container">
        <div className="welcome-content-container">
          <IconTitle />
          <div className="welcome-text-container">
            <h1 className="welcome-text">Let's Begin to<br />Engage!</h1>
            <div style={{ marginTop: '20px' }}>
              <p className="des-text">Earn Points, Get Badges.</p>
              <p className="rewards-text">Redeem Rewards</p>
              </div>
          </div>
        </div>
        <div className="button-container">
            <MainButton title="Start Engaging!" onClick={handlePress} />
        </div>
    </div>
  );
}
