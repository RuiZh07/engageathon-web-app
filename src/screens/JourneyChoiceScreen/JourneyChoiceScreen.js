import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MainButton from '../../components/MainButton/MainButton';
import './JourneyChoiceScreen.scss';

export default function JourneyChoiceScreen() {
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem('userData'); 
                if (userData) {
                    const { email } = JSON.parse(userData);
                    setEmail(email);
                }
            } catch (error) {
                    console.error('Error fetching user data:', error);
            }
        };
        
        fetchUserData();
      }, []);

    const handleFinish = async () => {
        try {
            const params = new URLSearchParams();
            params.append('message', 'Event finished successfully');
            if (email) {
                params.append('email', email); 
            }

            const response = await fetch(`https://app.engageathon.com/api/finishevent/`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error:', errorText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data.message);
            navigate('/collect-rewards');
        } catch (error) {
            console.error('Error during API request:', error);
        }
    };
    
    const handleGoBack = () => {
        navigate('/activity-screen'); 
    };

  return (
    <div className="container">
        <h3 className="continueJourneyText">Are your sure you’d like to finish your engaging journey here?</h3>
        <p className="moveOnText">Once you move on, you <span style={{ color: 'red', fontWeight: 'bold' }}>will not</span> be able to enter the event again. </p>
        <div className="button-container">
            <MainButton title="Go Back to Activities" onClick={handleGoBack} />
        </div>
        <p className='orText'>or</p>
        <button className="finishEngagingButton" onClick={handleFinish}>Finish Engaging</button>
    </div>
  );
}
