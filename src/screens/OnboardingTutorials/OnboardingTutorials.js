import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './OnboardingTutorials.scss'; 

import onboarding1 from '../../assets/splashScreens/onboarding_1.png';
import onboarding2 from '../../assets/splashScreens/onboarding_2.png';
import onboarding3 from '../../assets/splashScreens/onboarding_3.png';
import onboarding4 from '../../assets/splashScreens/onboarding_4.png';
import onboarding5 from '../../assets/splashScreens/onboarding_5.png';

const images = [onboarding1, onboarding2, onboarding3, onboarding4, onboarding5];

export default function ImageSlider() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleGetStartedButton = () => {
        navigate('/sign-up');
    };


  const handleNextPress = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleGetStartedButton();
    }
  };

  return (
    <div className="main-background-color">
      <div className="tutorials-container">
        <div className="card-container">
          <img src={images[currentIndex]} alt="Onboarding" className="card" />
        </div>

        <div className="indicator">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? 'active-dot' : 'inactive-dot'}`}
            />
          ))}
        </div>

        <div className="buttons-container">
          {currentIndex < images.length - 1 && (
            <button className="skip-button" onClick={handleGetStartedButton}>
              <span className="skip-button-text">Skip</span>
            </button>
          )}

          {currentIndex < images.length - 1 ? (
            <button className="next-button" onClick={handleNextPress}>
              <span className="next-button-text">Next</span>
            </button>
          ) : (
            <button className="get-started-button" onClick={handleGetStartedButton}>
              <span className="get-started-button-text">Let's Begin</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
