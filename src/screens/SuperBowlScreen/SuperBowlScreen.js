import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import superbowl from '../../assets/superbowl/superbowl.png';
import eaLogoBig from '../../assets/eaLogoBig.png';
import engageathon from '../../assets/EngageATHON.png';
import MainButton from '../../components/MainButton/MainButton';
import "./SuperBowlScreen.scss"

export default function SuperBowlScreen() {
    const navigation = useNavigate();

    const handleEnter = () => {
        navigation('/welcome-screen');
    }
    return (
        <div className="container">
            <div className="subContainer">
                <img src={superbowl} alt="superbowl" className="superbowlLogo" />

                <div className="engageathonContainer">
                    <img src={eaLogoBig} alt="eaLogo" className="eaLogoBig" />
                    <img src={engageathon} alt="engageathon" className="engegeathon" />
                </div>
                <div className="button-container">
                    <MainButton title="Enter" onClick={handleEnter} />
                </div>
                
            </div>
        </div>
    )
}