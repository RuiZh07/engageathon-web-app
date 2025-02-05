import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SuperBowlMetrics.scss';
import prize from '../../assets/prizes/prize.png';
import starBadge from '../../assets/prizes/star-badge.png';
import { IoChevronBack } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { FaCircle } from "react-icons/fa";
//import awardStarSvg from '../../assets/icons/award_star_icon.svg';

import { ReactComponent as AwardStarIcon } from '../../assets/icons/award_star_icon.svg';
import sipSmoke from "../../assets/superbowl/sip_smoke.png";
import masquerade from "../../assets/superbowl/masquerade.png";
import bigGame from "../../assets/superbowl/big_game.png";

export default function SuperBowlMetrics() {
    const [metricsData, setMetricsData] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [leaderboardList, setLeaderboardList] = useState([]);
    const navigate = useNavigate();

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
            `https://app.engageathon.com/api/metrics/individual/9/${email}/`, 
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
                        <p className="completedNumberText">Incompleted <strong>{3 - metricsData.Number_of_badges}</strong></p>
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
                        <p className="totalPoint">of 3 Badges</p>
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
                    //const completedPercentage = 4;
                    return (
                        <div key={index} className="activityItem">
                            <div className="activityIcon">
                    
                                {activity.id === 95 && (
                                    <div className="superbowlIconBackgrounds">
                                        <img src={sipSmoke} className="superbowlIconMetrics" alt="Sip Smoke" />
                                    </div>
                                )}
                                {activity.id === 96 && (
                                    <div className="superbowlIconBackgrounds">
                                        <img src={masquerade} className="superbowlIconMetrics" alt="Masquerade" />
                                    </div>
                                )}
                                {activity.id === 97 && (
                                    <div className="superbowlIconBackgrounds">
                                        <img src={bigGame} className="superbowlIconMetrics" alt="Big Game" />
                                    </div>
                                )}
                                
                            </div>
                        <div className="superbowlVerticalLine"></div>
                        <div className="superbowlCompletedCount" style={{ 
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
        </div>
    </div>
  
  );
}
