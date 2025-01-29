import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import IconTitle from '../../components/IconTitle/IconTitle';
import MainButton from '../../components/MainButton/MainButton';
import Chip from '../../components/Chip/Chip';
import superbowl from "../../assets/superbowl/superbowl.png";
import superweek from "../../assets/superbowl/superweek1.png";
import './HomeScreen.scss'; 

export default function SuperBowlHome() {
    const [post, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleAttend = () => {
        navigate('/superbowl-activity')
    };

    // Fetch event list
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
            <div key={post.id} className="homePost">
                <div className="postHeader">
                    <img
                        src={
                            post.profile_photo_url 
                            ? `${post.profile_photo_url}` 
                            : superbowl
                        }  
                        alt="Organizer"
                        className="organizationIcon"
                    />  
                    <p className="userNameText">{post.name}</p>
                </div>

                <div className="postTags">
                    <Chip label="community" />
                    <Chip label="SuperBowl" />
                </div>
            
                <div className="postImageContainer">
                    <img
                        src={post.image_urls?.[0]?.image_urls || superweek}
                        
                        className="postImage"
                        alt="Event"
                    />
                </div>
                
                <div className="postDescription">
                    <h3 className="eventTitleText">{post.title_description}</h3>
                    <p className="descriptionText">{post.description}</p>
                </div>
                <div className='homeScreenAttendButton'>
                    <MainButton title="Attend" onClick={() => handleAttend(post)} />
                </div>
            </div>
        </div>   
    )
};
