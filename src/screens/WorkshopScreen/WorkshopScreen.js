import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaArrowRight } from "react-icons/fa6";
import workshop from '../../assets/icons/workshop.png';
import starBadge from '../../assets/prizes/star-badge.png';
import './WorkshopScreen.scss';

export default function WorkshopScreen () {
    const numbers = Array.from({ length: 7 }, (_, index) => index + 1);
    const [userName, setUserName] = useState('');
    const [activities, setActivities] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalBadges, setTotalBadges] = useState(0);
    const [unconfirmedCount, setUnconfirmedCount] = useState(0);
    const [totalPossiblePoints, setTotalPossiblePoints] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem('userData'); 
                if (userData) {
                    const { first_name, email } = JSON.parse(userData);
                    console.log("userData", email);
                    setUserName(first_name);
                    fetchActivities(email);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const fetchActivities = async (email) => {
        try {
          if (!email) {
            console.error('No email found');
            return;
          }
    
          const response = await fetch(
            `https://app.engageathon.com/api/events/activity/6/${email}/`, 
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          const data = await response.json();
          console.log(data);
          setActivities(data.activities || []);
          setTotalPoints(data.accumulated_points || 0);
          setTotalBadges(data.confirmed_count || 0);
          setUnconfirmedCount(data.unconfirmed_count || 0);
          setTotalPossiblePoints(data.total_possible_points || 0);
    
        } catch (error) {
          console.error('Error fetching activities', error);
        }
      };

    const handleWorkshopClick = (number) => {
        navigate(`/she-shine-workshop/${number}`);
    }

    const handleFinishEngaging = () => {
        navigate("/journey-choice");
    };


    return (
        <div className="container">
            <div className="scrollContent">
                <div className="titleContainer">
                    <p className="userName">Hi, {userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}</p>
                    <button className="finishEngaging" onClick={handleFinishEngaging}>Finish Engaging</button>
                </div>
                <p className="rewardsEarnedTextWorkshop">Rewards Earned</p>
            
                <div className="workshopRewardsContainer">
                    <img src={starBadge} alt="badge" className="badgeIcon" />
                    <div className="pointsContainer">
                        <p className="getPointsActivity">{totalPoints}</p>
                        <p className="totalPointActivity">of {totalPossiblePoints} Points</p>
                    </div>
                </div>

                <p className="activitiesTextWorkshop">Activities</p>
                {numbers.map((number) => (
                    <div key={number} className="workshopContainer" onClick={() => handleWorkshopClick(number)}>
                        <div className="workshopIconContainer">
                            <img src={workshop} alt="workshop" className="workshopIcon" />
                        </div>
                        <p className="workshopText">Workshop {number}</p>
                        <FaArrowRight 
                            size={20} 
                            color="#FFFFFF" 
                            className="arrowIcon" 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
     
}