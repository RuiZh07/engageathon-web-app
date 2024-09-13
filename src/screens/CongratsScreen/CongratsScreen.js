import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './CongratsScreen.scss'; 
import BeverageConnoisseur from '../../assets/prizes/BeverageConnoisseur.png';
import GourmetExplorer from '../../assets/prizes/GourmetExplorer.png';
import CommunityChampion from '../../assets/prizes/CommunityChampion.png';
import MemorableMoment from '../../assets/prizes/MemorableMoment.png';
import BrightLights from '../../assets/prizes/BrightLights.png';
import MusicLover from '../../assets/prizes/MusicLover.png'
import ENGAGEaVeniece from '../../assets/prizes/ENGAGEaVeniece.png'
import SecretSeeker from '../../assets/prizes/SecretSeeker.png'
import StarInterviewer from '../../assets/prizes/StarInterviewer.png'
import BannerMoment from '../../assets/prizes/BannerMoment.png'
import MainButton from '../../components/MainButton/MainButton';

const imageMap = {
  'Beverage Connoisseur': BeverageConnoisseur,
  'Gourmet Explorer': GourmetExplorer,
  'Community Champion': CommunityChampion,
  'Memorable Moment': MemorableMoment,
  'Bright Lights': BrightLights,
  'Music Lover': MusicLover,
  'ENGAGEaVeniece': ENGAGEaVeniece,
  'Star Interviewer': StarInterviewer,
  'Banner Moment': BannerMoment,
  'Secret Seeker': SecretSeeker,
};

const CongratsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('Location state:', location.state);
  const { activityId, badgeName, activityPoints, email } = location.state || {};
  console.log( activityId, badgeName, activityPoints)

  const handleContinue = () => {
    navigate('/activity-screen', { state: { completedActivityId: activityId, email } });
    console.log(activityId);
  };

  return (
    <div className="container">
      <p className="congratulationsText">Congratulations!</p>
      <p className="pointsName">You have earned {activityPoints} points and a badge!</p>
      <div className="prizeImage">
        <img src={imageMap[badgeName]} alt="prize" className="prizeImageContent" />
      </div>
      <p className="badgeNameText">{badgeName}</p>
      <div className="button-container">
        <MainButton title="Continue" onClick={handleContinue} />
      </div>
    </div>
  );
};

export default CongratsScreen;
