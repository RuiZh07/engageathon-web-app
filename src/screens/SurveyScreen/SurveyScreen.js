import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MainButton from '../../components/MainButton/MainButton';
import './SurveyScreen.scss';
import IconTitle from '../../components/IconTitle/IconTitle';

export default function SurveryScreen() {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
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

    const handleSubmit = async () => {
        try {
            if (!email) {
                console.error('No email found');
                return;
            }

            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('review', feedback);

            const response = await fetch('http://44.214.163.41/api/report/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (!response.ok) {
                throw new Error(`Failed to post feedback. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Feedback posted successfully:', data);
            navigate('/congratulations');
        } catch (error) {
            console.error('Error posting feedback:', error.message);
        }
    };

    const handlePress = () => {
        navigate('/congratulations');
    };

    return (
        <div className="container">
            <IconTitle />
            <div className="feedbackContentContainer">
                <div className="greatJobContainer">
                    <h1 className="rateText">Rate your<br />experience</h1>
                    <div style={{ marginTop: '20px' }}>
                        <p className="shareText">Share your experience to help us improve and earn extra rewards</p>
                    </div>
                </div>
                <div className="feedbackContainer">
                    <input 
                        type="text" 
                        placeholder="Share your experience with us..." 
                        className="feedbackInput" 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
            </div>
            <div className="button-container">
                <MainButton title="Submit" onClick={handleSubmit} />
            </div>


            <button className="skipButton" onClick={handlePress}>Skip</button>

        </div>
    );
}