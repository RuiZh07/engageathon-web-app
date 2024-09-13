import React, { useState, useEffect } from 'react';
import './ActivityScreen.scss';
import { useNavigate, useParams } from 'react-router-dom'; 
import MainButton from '../../components/MainButton/MainButton';
import { useLocation } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import prize from '../../assets/prizes/prize.png';
import starBadge from '../../assets/prizes/star-badge.png';
import WineBar from '../../assets/icons/wine_bar.png';
import addPhoto from '../../assets/icons/add_a_photo.png';
import awardStar from '../../assets/icons/award_star.png';
import genres from '../../assets/icons/genres.png';
import lunchDining from '../../assets/icons/lunch_dining.png';
import photoCameraFront from '../../assets/icons/photo_camera_front.png';
import photoFrame from '../../assets/icons/photo_frame.png';
import phoneCamera from '../../assets/icons/smartphone_camera.png';
import videoFront from '../../assets/icons/video_camera_front.png';
import mystery from '../../assets/icons/question.png';
import QRScanner from "../../components/QRScanner/QRScanner";

export default function ActivityScreen() {
  const [userName, setUserName] = useState('');
  const [activities, setActivities] = useState([]);
  const [completedActivityID, setCompletedActivityID] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalBadges, setTotalBadges] = useState(0);
  const [unconfirmedCount, setUnconfirmedCount] = useState(0);
  const [totalPossiblePoints, setTotalPossiblePoints] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState({});

  const location = useLocation();
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
        `https://app.engageathon.com/api/events/activity/87/${email}/`, 
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

  useEffect(() => {
    if (!isCameraOpen) {
      setActiveActivity({});
    }
  }, [isCameraOpen]);
  

  useEffect(() => {
    if (location.state && location.state.completedActivityId) {
      const { completedActivityId } = location.state;
      setCompletedActivityID(completedActivityId);

      const completedActivity = activities.find(
        (activity) => activity.id === completedActivityId
      );
      if (completedActivity && !completedActivity.confirmed) {
        const updatedActivities = activities.map((activity) =>
          activity.id === completedActivity.id
            ? { ...activity, confirmed: true }
            : activity
        );
        setActivities(updatedActivities);
      }
    }
  }, [location.state, activities]);


  useEffect(() => {
    if (totalBadges === 10) {
      setModalVisible(true);
    }
  }, [totalBadges]);

  const handleContinue = () => {
    navigate("/collect-rewards");
    setModalVisible(false);
  };

  const handleFinishEngaging = () => {
    navigate("/journey-choice");
  };

  const handleActivityPress = (activity) => {
    if (!activity.confirmed) {
      // navigate("/congrats", {
      //   state: {
      //     activityId: activity.id,
      //     badgeName: activity.badge,
      //     activityPoints: activity.activity_points,
      //   },
      // });
      setIsCameraOpen(true);
      setActiveActivity(activity);
    } else {
      alert("Already Completed", "This activity has already been completed.");
    }
  };

  const setActivityConfirmed = async (token) => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { email } = JSON.parse(userData);
      try {
        const response = await fetch(
          `https://app.engageathon.com/api/events/activity/scan/87/${activeActivity?.activity}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              email: email,
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          navigate("/congrats-activity", {
            state: {
              activityId: activeActivity.id,
              badgeName: activeActivity.badge,
              activityPoints: activeActivity.activity_points,
            },
          });
        } else {
          alert(
            result.error ||
              "An error occurred. Please check your network connection."
          );
        }
      } catch (error) {
        alert("An error occurred. Please check your network connection.");
      }
    } else {
      alert("An error occurred. Please check your network connection.");
    }
  };

  return (
    <div className="container">
      <div className="scrollContent">
        <div className="titleContainer">
          <p className="userName">Hi, {userName}</p>
          <button className="finishEngaging" onClick={handleFinishEngaging}>Finish Engaging</button>
        </div>
          <p className="scanQRText">Scan the QR code at each station to <br/> earn points and badges</p>

        <p className="rewardsEarnedText">Rewards Earned</p>
        <div className="rewardArea">
          <div className="rewardsContainer">
            <img src={starBadge} alt="badge" className="badgeIcon" />
            <div className="pointsContainer">
              <p className="getPoints">{totalPoints}</p>
              <p className="totalPoint">of {totalPossiblePoints} Points</p>
            </div>
          </div>
          <div className="rewardsContainer">
            <img src={prize} alt="prize" className="prizeIcon" />
            <div className="pointsContainer">
              <p className="getPoints">{totalBadges}</p>
              <p className="totalPoint">of {unconfirmedCount} Badges</p>
            </div>
          </div>
        </div>
        <p className="activitiesText">Activities</p>

        <div className="activityArea">  
          {activities.map((activity) => (
            <button key={activity.id} className="activityContainer" onClick={() => handleActivityPress(activity)}>
                <div className="iconsContainer">
                    {activity.activity_name === "Beverage Station" && (
                        <div className="activityIconBackground">
                            <img src={WineBar} className="activityIcons" alt="Beverage Station" />
                        </div>
                    )}
                    {activity.activity_name === "Food Station" && (
                        <div className="activityIconBackground">
                            <img src={lunchDining} className="activityIcons" alt="Food Station" />
                        </div>
                    )}
                    {activity.activity_name === "Photo Booth" && (
                        <div className="activityIconBackground">
                            <img src={addPhoto} className="activityIcons" alt="Photo Booth" />
                        </div>
                    )}
                    {activity.activity_name === "Feature Station" && (
                        <div className="activityIconBackground">
                            <img src={awardStar} className="activityIcons" alt="Feature Station" />
                        </div>
                    )}
                    {activity.activity_name === "Photo at LED Screen" && (
                        <div className="activityIconBackground">
                            <img src={photoFrame} className="activityIcons" alt="Photo at LED Screen" />
                        </div>
                    )}
                    {activity.activity_name === "Say Hi to the DJ" && (
                        <div className="activityIconBackground">
                            <img src={genres} className="activityIcons" alt="Say Hi to the DJ" />
                        </div>
                    )}
                    {activity.activity_name === "Snapshot with Veniece" && (
                        <div className="activityIconBackground">
                            <img src={phoneCamera} className="activityIcons" alt="Take a quick snapshot with Veniece" />
                        </div>
                    )}
                    {activity.activity_name === "Interview with onsite camera crew" && (
                        <div className="activityIconBackground">
                            <img src={videoFront} className="activityIcons" alt="Interview with Onsite Camera Crew" />
                        </div>
                    )}
                    {activity.activity_name === "Photo at step/repeat banner" && (
                        <div className="activityIconBackground">
                            <img src={photoCameraFront} className="activityIcons" alt="Take a photo at Step Banner" />
                        </div>
                    )}
                    {activity.activity_name === "Hidden Activity" && (
                        <div className="activityIconBackground">
                            <img src={mystery} className="activityIcons" alt="Mystery Event" />
                        </div>
                    )}
                    {activity.confirmed ? (
                        <TbRosetteDiscountCheckFilled 
                          size={28} 
                          color="#32a852" 
                          className="arrowIcon" 
                        />
                    ) : (
                        <FaArrowRight 
                          size={20} 
                          color="#FFFFFF" 
                          className="arrowIcon" 
                        />
                    )}
                  </div>

                  <p className="activityNameText">{activity.activity_name}</p>
                  <p className="pointText">
                    {activity.confirmed 
                      ? "Points Claimed" 
                      : `${activity.activity_points} Points`}
                  </p>
            </button>
          ))}
        </div>
      </div>

      {isModalVisible && (
        <div className="modalContainer">
          <div className="modalContent">
            <p className="modalTitle">Congratulations!</p>
            <p className="modalMessage">
              You have completed all the activities!
            </p>
            <div className="modalButtonContainer">
              <MainButton title="Continue" onClick={handleContinue} />
            </div>
          </div>
        </div>
      )}
      {isCameraOpen && (
        <QRScanner
          setActivityConfirmed={setActivityConfirmed}
          setIsCameraOpen={setIsCameraOpen}
        />
      )}
    </div>
  );
}
