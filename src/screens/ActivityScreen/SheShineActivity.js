import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import QRScanner from "../../components/QRScanner/QRScanner";
import CameraCapture from '../../components/CameraCapture/CameraCapture';
import MainButton from '../../components/MainButton/MainButton';
import './SheShineActivity.scss';

export default function SheShineActivity() {
    const { number } = useParams();
    const [userName, setUserName] = useState('');
    const [activities, setActivities] = useState([]);
    const [completedActivityID, setCompletedActivityID] = useState(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalBadges, setTotalBadges] = useState(0);
    const [unconfirmedCount, setUnconfirmedCount] = useState(0);
    const [totalPossiblePoints, setTotalPossiblePoints] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isCameraCaptureOpen, setIsCameraCaptureOpen] = useState(false);
    const [activeActivity, setActiveActivity] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    // Array of keyowrds that are used to identify roles or position
    const keywords = [
        "Facilitated by:",
        "Presenter:",
        "Facilitators:",
        "Keynote speaker:",
        "Panelists:",
        "Moderator:",
        "Speaker: ",
        "Facilitator:",
        "Monitors",
        "Prsenter:",
    ];

    // Function to highlight specific keywords and format parts of the text
    const highlightKeywords = (text) => {
        const regex = new RegExp(`(.*?)(${keywords.join('|')})(.*?)(?=,|$)`, 'gi');
        const parts = [];
        let hasKeywords = false;

        // Replace the text using the regular expression and break it into parts.
        text.replace(regex, (match, activityName, keyword, nameAfterKeyword) => {
            if (activityName) {
                parts.push({ text: activityName.trim(), type: 'activity' });
            }
            if (keyword) {
                hasKeywords = true;
                parts.push({ text: keyword.trim(), type: 'keyword' });
            }
            if (nameAfterKeyword) {
                parts.push({ text: nameAfterKeyword.trim(), type: 'name' });
            }
            return match; // Return match to avoid changing the original string
        });

        if (!hasKeywords) {
            parts.push({ text: text.trim(), type: 'activity' });
        }

        return parts;
    };

    // Function to get activities by the workshop number
    const getActivitiesByWorkshopNumber = (number) => {
        let start, end;
        let workshopTime;
        switch (parseInt(number, 10)) {
            case 1:
                start = 1;
                end = 1;
                workshopTime = "9:00 AM - 9:55 AM";
                break;
            case 2:
                start = 3;
                end = 8;
                workshopTime = "10:10 AM - 10:55 AM";
                break;
            case 3:
                start = 10;
                end = 14;
                workshopTime = "11:10 AM - 11:55 AM";
                break;
            case 4:
                start = 16;
                end = 19;
                workshopTime = "12:55 PM - 1:35 PM";
                break;
            case 5:
                start = 20;
                end = 25;
                workshopTime = "1:50 PM - 2:35 PM";
                break;
            case 6:
                start = 26;
                end = 26;
                workshopTime = "2:45 PM - 3:45 PM";
                break;
            case 7:
                start = 27;
                end = 27;
                workshopTime = "2:35 PM - 3:45 PM";
                break;
            default:
                start = 1;
                end = activities.length;
        }
        
        const filteredActivities = activities.filter((_, index) => index + 1 >= start && index + 1 <= end);
        
        // Return both the activities and the workshop time
        return { allActivities: filteredActivities, time: workshopTime };
    };

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

    // Fetch activities associated witht the user's email
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

    useEffect(() => {
        if (!isCameraOpen) {
            setActiveActivity({});
        }
    }, [isCameraOpen]);
    
    // Update activities list when a specific activity is confirmed
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

    // Total 30 badges
    useEffect(() => {
        if (totalBadges === 30) {
            setModalVisible(true);
        }
    }, [totalBadges]);

    const handleContinue = () => {
        navigate("/workshop-screen");
        setModalVisible(false);
    };

    // Handle when an activity is clicked
    const handleActivityPress = (activity) => {
        if (!activity.confirmed) {
            if (activity.activity_name === "Snapshot with Veniece") {
                // Open CameraCapture for "Snapshot with Veniece"
                setIsCameraCaptureOpen(true);
                // setIsCameraOpen(false);
            } else {
                // Open QRScanner for other activities
                setIsCameraOpen(true);
                setIsCameraCaptureOpen(false);
            }
            setActiveActivity(activity);
        } else {
            alert("Already Completed", "This activity has already been completed.");
        }
    };

    // Function to mark activity as confirmed by submitting a token
    const setActivityConfirmed = async (token) => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const { email } = JSON.parse(userData);
            try {
                const response = await fetch(
                    `https://app.engageathon.com/api/events/activity/scan/6/${activeActivity?.activity}/`,
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
                        console.log("Response Body:", result);
                        fetchActivities(email);
                        navigate("/congrats-activity", {
                            state: {
                            activityId: activeActivity.id,
                            badgeName: activeActivity.badge,
                            activityPoints: activeActivity.activity_points,
                            number
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

    console.log("number in workship", number);
    const { allActivities, time } = getActivitiesByWorkshopNumber(number);

    return (
        <div className="sign-up-screen-container">
            <div className="scrollContent">
                <div className="topContainer">
                    <div className="iconNameContainer">
                        <FaArrowLeft 
                            size={24} 
                            color="#FFFFFF" 
                            onClick={() => navigate("/workshop-screen")}
                        />
                        <p className="workshopTitleText">Workshop {number}</p>
                    </div>
                    <p className="pickText">Pick a session you would like to <br /> attend!</p>
                </div>
                {number === "1" && ( 
                    <div className='allWorkshopContainer'>
                        {activities[1] && (
                            <button className="eachWorkshopContainer" onClick={() => handleActivityPress(activities[1])}>
                                <p className="workshopNameText">
                                    {highlightKeywords(activities[1].activity_name).map((part, index) => (
                                        <React.Fragment key={index}>
                                            {part.type === 'keyword' ? (
                                                <>
                                                    <div className="keywordTextContainer">
                                                        <span className="keywordText">{part.text}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className={part.type === 'activity' ? 'activityText' : 'nameText'}>
                                                    {part.text}
                                                </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>
                                {activities[1].confirmed ? (
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
                            </button>  
                        )}
                    </div>
                )}  

                <div className="workshopTime">{time}</div>
                <div className='allWorkshopContainer'>
                    {allActivities.map((activity) => (
                        <button key={activity.id} className="eachWorkshopContainer" onClick={() => handleActivityPress(activity)}>
                            <p className="workshopNameText">
                            {highlightKeywords(activity.activity_name).map((part, index) => (
                                    <React.Fragment key={index}>
                                        {part.type === 'keyword' ? (
                                            <>
                                                <div className="keywordTextContainer">
                                                    <span className="keywordText">{part.text}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <span className={part.type === 'activity' ? 'activityText' : 'nameText'}>
                                                {part.text}
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </p>
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
                        </button>
                    ))}
                </div>

                {(number === "3" || number === "4" || number === "5") && ( 
                    <div className='allWorkshopContainer'>
                        {activities[3] && (
                            <button className="eachWorkshopContainer" onClick={() => handleActivityPress(activities[3])}>
                                <p className="workshopNameText">
                                    {highlightKeywords(activities[3].activity_name).map((part, index) => (
                                        <React.Fragment key={index}>
                                            {part.type === 'keyword' ? (
                                                <>
                                                    <div className="keywordTextContainer">
                                                        <span className="keywordText">{part.text}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className={part.type === 'activity' ? 'activityText' : 'nameText'}>
                                                    {part.text}
                                                </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>
                                {activities[3].confirmed ? (
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
                            </button>
                        )}
                    </div>
                )}

                <div className="modalButtonContainer">
                    <MainButton title="Finish" onClick={handleContinue} />
                </div>
            </div>

            
            {isCameraOpen && (
                <QRScanner
                    setActivityConfirmed={setActivityConfirmed}
                    setIsCameraOpen={setIsCameraOpen}
                />
            )}

            {isCameraCaptureOpen && (
                <CameraCapture
                    setIsCameraCaptureOpen={setIsCameraCaptureOpen}
                    setIsCameraOpen={setIsCameraOpen}
                />
            )}
        </div>
    );
}