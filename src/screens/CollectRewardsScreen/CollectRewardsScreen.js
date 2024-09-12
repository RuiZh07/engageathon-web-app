import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from '../../components/MainButton/MainButton';
import './CollectRewardsScreen.scss';

export default function CollectRewardsScreen() {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate('/image-slider');
  };

  return (
    <div className="collect-container">
      <img
        src={require('../../assets/backgroundImage.png')}
        alt="Background"
        className="backgroundImage"
      />

      <div className="collectTextContainer">
        <h1 className="collectText">Collect Your<br />Rewards!</h1>
        <p className="desText">Scan one final QR code to<br />confirm your rewards</p>
      </div>

      <div className="button-container">
        <MainButton title="Scan QR Code" onClick={handlePress} />
      </div>
    </div>
  );
}
