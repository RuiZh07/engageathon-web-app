import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './HomeScreen.scss'; 
import IconTitle from '../../components/IconTitle/IconTitle';
import MainButton from '../../components/MainButton/MainButton';
import Chip from '../../components/Chip/Chip';
import { BsThreeDotsVertical } from "react-icons/bs";

export default function HomeScreen() {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleAttend = () => {
        navigate('/activity-screen')
    };

    useEffect(() => {
        const fetchEventList = async () => {
            try {
                const response = await fetch(
                    `https://app.engageathon.com/api/eventslist/`, 
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const data = await response.json();
                setEventList(data);
            } catch (error) {
                console.error("Error fetching event list", error);
            } finally {
                setLoading(false);
            }
    };
        fetchEventList();
    }, []);

    return (
        <div className='container'>
            <div className="icon-title">
                <IconTitle />
            </div>
            {loading && <div className="loading-text">Loading...</div>}
            {eventList.map((post) => {
                const hasActivity = post.activities && post.activities.length > 0;
                return (
                    <div key={post.id} className={`homePost ${!hasActivity ? 'inactive' : ''}`}>
                        <div className="postHeader">
                            <img
                                src={
                                    post.profile_photo_url 
                                    ? `data:image/jpeg;base64,${post.profile_photo_url}` 
                                    : ""
                                }  
                                alt="Organizer"
                                className="organizationIcon"
                            />  
                            <p className="userNameText">{post.name}</p>
                            <button className="dotsButton">
                                <BsThreeDotsVertical size={23} />
                            </button>
                        </div>

                        <div className="postTags">
                            <Chip label="community" />
                            <Chip label="Engageathon" />
                        </div>
                    
                        <div className="postImageContainer">
                            <img
                                src={
                                    post.image_urls[0]?.image_url 
                                    ? `data:image/jpeg;base64,${post.image_urls[0].image_url}` 
                                    : ""} 
                                className="postImage"
                                alt="Event"
                            />
                        </div>
                        
                        <div className="postDescription">
                            <h3 className="eventTitleText">{post.name}</h3>
                            <p className="descriptionText">{post.description}</p>
                        </div>
                        <div className='homeScreenAttendButton'>
                            <MainButton title="Attend" onClick={handleAttend} />
                        </div>
                    </div>
                );
            })}
        </div>   
    )
};
