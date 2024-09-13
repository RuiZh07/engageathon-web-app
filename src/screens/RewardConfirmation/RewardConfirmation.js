import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './RewardConfirmation.scss';
import MainButton from '../../components/MainButton/MainButton';
import prize from '../../assets/prizes/prize.png';
import starBadge from '../../assets/prizes/star-badge.png';

export default function RewardConfirmation() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
        
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userData = localStorage.getItem('userData'); 
            if (userData) {
              const { first_name, email } = JSON.parse(userData);
              console.log("userData", email);
              setUserName(first_name);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
    }, []);

    const handlePress = () => {
        navigate('/survey'); 
    };

  return (
    <div className="container">
        <div className="confirmation-content-container">
            <div className="greatJobContainer">
                <h1 className="welcome-text">Great Job<br />{userName}!</h1>
                <div style={{ marginTop: '20px' }}>
                    <p className="overviewText">Here's an overview of the points scored and the badges collected</p>
                 </div>
            </div>
            <div className="rewardAreaConfirmation">
                <div className="rewardsContainerConfirmation">
                    <img src={starBadge} alt="badge" className="badgeIcon" />
                    <div className="pointsContainerConfirmation">
                        <p className="getPoints">1270</p>
                        <p className="totalPoint">of 1270 Points</p>
                    </div>
                </div>

                <div className="rewardsContainerConfirmation">
                    <img src={prize} alt="prize" className="prizeIcon" />
                    <div className="pointsContainerConfirmation">
                        <p className="getPoints">10</p>
                        <p className="totalPoint">of 10 Badges</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="button-container">
            <MainButton title="Continue" onClick={handlePress} />
        </div>
    </div>
  );
}
