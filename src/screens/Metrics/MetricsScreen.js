import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './MetricsScreen.scss';
import prize from '../../assets/prizes/prize.png';
import starBadge from '../../assets/prizes/star-badge.png';
import { IoChevronBack } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { FaCircle } from "react-icons/fa";
//import awardStarSvg from '../../assets/icons/award_star_icon.svg';

import { ReactComponent as AwardStarIcon } from '../../assets/icons/award_star_icon.svg';

const colors = [
    '#b24f96', '#167bcd', '#226e37', '#27a31c', '#76b53c', 
    '#ff3d6f', '#7c4dff', '#2580c9', '#34cfe3', '#058567', 
    '#a8d400', '#a600ff', '#de9e31', '#f5ed14', '#a61442',
    '#793fd1', '#3a57d1', '#4a70d9', '#82aaff', '#96e9fa', 
    '#d649e3', '#2bf0ab', '#7bc242', '#cbf536', '#f68e3f',
    '#34e383', '#87fad5',
];

export default function MetricsScreen() {
    const [metricsData, setMetricsData] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [leaderboardList, setLeaderboardList] = useState([]);
    const navigate = useNavigate();
        
    const [shuffledColors, setShuffledColors] = useState([]);

    useEffect(() => {
        const shuffled = [...colors].sort(() => Math.random() - 0.5); // Fisher-Yates Shuffle
        setShuffledColors(shuffled);
        console.log("Shuffled Colors:", shuffled); 
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userData = localStorage.getItem('userData'); 
            if (userData) {
              const { first_name, email } = JSON.parse(userData);
              fetchMetrics(email);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);
    
    
      const fetchMetrics = async (email) => {
        try {
          if (!email) {
            console.error('No email found');
            return;
          }
    
          const response = await fetch(
            `https://app.engageathon.com/api/metrics/individual/8/${email}/`, 
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
        );
            const data = await response.json();
            const { activity_rankings } = data;
            const { leaderboard } = data;
            setMetricsData(data);
            setActivityList(activity_rankings);
            setLeaderboardList(leaderboard);
        } catch (error) {
          console.error('Error fetching metrics data', error);
        }
      };

    const handleFinish = () => {
        navigate('/congratulations'); 
    };

    const sortedActivities = activityList.sort((a, b) => b.completed_count - a.completed_count);
  return (
    <div className="sign-up-screen-container">
        <div className='metricsContainer'>
            <div className="metricsHeaderContainer">
                {/*<IoChevronBack className="backIcon" />*/}
                <h3 className="analyticsText">Analytics</h3>
                <button className="finishEngaging" onClick={handleFinish}>Finish Engaging</button>
            </div>
            <div className="circularProgressContainer">
                <p className="yourActivityText">Your Activity Participation</p>
                <div className="circularProgress">
                    <CircularProgress percentage={metricsData.activity_points_percentage} />
                </div>
                <div className="completeIncomplete">
                        <FaCircle style={{ color: '#FFC542' }}/>
                        <p className="completedNumberText">Completed <strong>{metricsData.Number_of_badges}</strong></p>

                        <FaCircle style={{ color: '#E9E9E9' }}/>
                        <p className="completedNumberText">Incompleted <strong>{7 - metricsData.Number_of_badges}</strong></p>
                </div>
            </div>

            <div className="rewardAreaMetrics">
                <div className="rewardsContainerMetrics">
                    <img src={starBadge} alt="badge" className="badgeIcon" />
                    <div className="pointsContainerMetrics">
                        <p className="getPoints">{metricsData.user_activity_points}</p>
                        <p className="totalPoint">of {metricsData.total_activity_points} Points</p>
                    </div>
                </div>

                <div className="rewardsContainerMetrics">
                    <img src={prize} alt="prize" className="prizeIcon" />
                    <div className="pointsContainerMetrics">
                        <p className="getPoints">{metricsData.Number_of_badges}</p>
                        <p className="totalPoint">of 7 Badges</p>
                    </div>
                </div>
            </div>

            <div className="participatedUsersContainer">
                <div className="personIconContainer">
                <FaRegUser className="personIcon" />
                </div>
                <div className="participatedUsers">
                    <p className="totalUsers">{metricsData.total_participating_users} Users</p>
                </div>
            </div>

            <div className="leaderboardListContainer">
                {leaderboardList.slice(0, 10).map((user, index) => (
                    <div key={index} className="leaderboardList">
                        <div className='rankCount'>
                            <div className='leaderboardRankNumber'>{index+1}</div>
                        </div>
                        <div className='leaderboardNamePoints'>
                            <h3 className="leaderboardUsername">{user.user}</h3>
                            <p className="leaderboardPoints">{user.points} Points</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="overallText">SuperBowl Week Participation</p>
            <div className="activityRankingList">
                {sortedActivities.map((activity, index) => {
                    const completedPercentage = (activity.completed_count / metricsData.total_participating_users) * 100;
                    
                    const randomColor = shuffledColors[index];
                    //const completedPercentage = 4;
                    return (
                        <div key={index} className="activityItem">
                        <div className="activityIcon">
                         
                            <AwardStarIcon 
                                style={{ width: '26px', height: '26px', fill: randomColor }}
                                //className="activityIcon"
                                alt="Random Color Icon" 
                            />
                            {/*
                        {activity.name === "Beverage Station" && (
                            <div className="activityIconBackgrounds">
                                <img src={WineBar} className="activityIcon" alt="Beverage Station" />
                            </div>
                        )}
                        {activity.name === "Food Station" && (
                            <div className="activityIconBackgrounds">
                                <img src={lunchDining} className="activityIcon" alt="Food Station" />
                            </div>
                        )}
                        {activity.name === "Photo Booth" && (
                            <div className="activityIconBackgrounds">
                                <img src={addPhoto} className="activityIcon" alt="Photo Booth" />
                            </div>
                        )}
                        {activity.name === "Feature Station" && (
                            <div className="activityIconBackgrounds">
                                <img src={awardStar} className="activityIcon" alt="Feature Station" />
                            </div>
                        )}
                        {activity.name === "Photo at LED Screen" && (
                            <div className="activityIconBackgrounds">
                                <img src={photoFrame} className="activityIcon" alt="Photo at LED Screen" />
                            </div>
                        )}
                        {activity.name === "Say Hi to the DJ" && (
                            <div className="activityIconBackgrounds">
                                <img src={genres} className="activityIcon" alt="Say Hi to the DJ" />
                            </div>
                        )}
                        {activity.name === "Snapshot with Veniece" && (
                            <div className="activityIconBackgrounds">
                                <img src={phoneCamera} className="activityIcon" alt="Take a quick snapshot with Veniece" />
                            </div>
                        )}
                        {activity.name === "Testimonial with Camera Crew" && (
                            <div className="activityIconBackgrounds">
                                <img src={videoFront} className="activityIcon" alt="Interview with Onsite Camera Crew" />
                            </div>
                        )}
                        {activity.name === "Photo at step/repeat banner" && (
                            <div className="activityIconBackgrounds">
                                <img src={photoCameraFront} className="activityIcon" alt="Take a photo at Step Banner" />
                            </div>
                        )}
                        {activity.name === "Hidden Activity" && (
                            <div className="activityIconBackgrounds">
                                <img src={mystery} className="activityIconMystery" alt="Mystery Event" />
                            </div>
                        )}
                            */}
                        </div>
                        <div className="verticalLine"></div>
                        <div className="completedCount" style={{ 
                            width: `${completedPercentage}%`,
                            background: `linear-gradient(90deg, #FF8D01 3.57%, #FFBA00 80.71%, #FFD919 100%)`
                        }}>
                            <p className={completedPercentage <= 4 ? 'completedCountPercentOutside' : 'completedCountPercent'}>
                                {activity.completed_count}
                            </p>
                        </div>
                    </div>
                    )
                })}
            </div>

            <div className="activityLegendChart">
                <h4 className="activityLegendText">Activity Legend</h4>
                <div className="activityLegend">
                    {sortedActivities.map((activity, index) => (
                    <div key={index} className="legendItem">
                        <AwardStarIcon 
                            style={{ width: '20px', height: '20px', fill: shuffledColors[index] }}
                            alt="Colored Icon for Activity" 
                        />
                        <span className="activityName">{activity.name}</span>
                    </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  
  );
}
