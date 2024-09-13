import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from '../../components/MainButton/MainButton';
import './CollectRewardsScreen.scss';

export default function CollectRewardsScreen() {
  const navigate = useNavigate();

  const handleViewAnalytics = () => {
    navigate('/metrics');
  };

  return (
    <div className="container">
      <div className="collectTextContainer">
        <h1 className="collectText">Collect Your<br />Rewards!</h1>
        <p className="desText">Show your analytics to any<br /> vendor to claim your reward.</p>
      </div>

      <div className="button-container">
        <MainButton title="View Your Analytics" onClick={handleViewAnalytics} />
      </div>
    </div>
  );
}