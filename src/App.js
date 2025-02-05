import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Global styles, if any

// Import your screen components
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import ImageSlider from './screens/OnboardingTutorials/OnboardingTutorials';
import SignUp from './screens/SignUp/SignUp';
import ActivityScreen from './screens/ActivityScreen/ActivityScreen';
import CongratsScreen from './screens/CongratsScreen/CongratsScreen';
import CollectRewardsScreen from './screens/CollectRewardsScreen/CollectRewardsScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import RewardConfirmation from './screens/RewardConfirmation/RewardConfirmation';
import SurveyScreen from './screens/SurveyScreen/SurveyScreen';
import MetricsScreen from './screens/Metrics/MetricsScreen';
import JourneyChoiceScreen from './screens/JourneyChoiceScreen/JourneyChoiceScreen';
import ThankYou from './screens/ThankYou/ThankYou';
import WorkshopScreen from './screens/WorkshopScreen/WorkshopScreen';
import SheShineActivity from './screens/ActivityScreen/SheShineActivity';
import ScrollToTop from './ScrollToTop';
import SheShineSurvey from './screens/SurveyScreen/SheShineSurvey';
import SuperBowlScreen from './screens/SuperBowlScreen/SuperBowlScreen';
import SuperBowlHome from './screens/HomeScreen/SuperBowlHome';
import SuperBowlActivity from './screens/ActivityScreen/SuperBowlActivity';
import SuperBowlSurvey from './screens/SurveyScreen/SuperBowlSurvey';
import SuperBowlMetrics from './screens/Metrics/SuperBowlMetrics';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<SuperBowlScreen />} />
            <Route path="/welcome-screen" element={<WelcomeScreen />} />
            <Route path="/image-slider" element={<ImageSlider />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/activity-screen" element={<ActivityScreen />} />
            <Route path="/congrats-activity" element={<CongratsScreen />} />
            <Route path="/collect-rewards" element={<CollectRewardsScreen />} />
            {/*<Route path="/home" element={<HomeScreen />} />*/}
            <Route path="/home" element={<SuperBowlHome />} />
            <Route path="/superbowl-activity" element={<SuperBowlActivity />} />
            <Route path="/superbowl-survey" element={<SuperBowlSurvey />} />
            <Route path="/superbowl-metrics" element={<SuperBowlMetrics />} />
            <Route path="/reward-confirmation" element={<RewardConfirmation />} />
            <Route path="/metrics" element={<MetricsScreen />} />
            <Route path="/survey" element={<SurveyScreen />} />
            <Route path="/congratulations" element={<ThankYou />} />
            <Route path="/journey-choice" element={<JourneyChoiceScreen />} />
            <Route path="/workshop-screen" element={<WorkshopScreen />} />
            <Route path="/she-shine-workshop/:number" element={<SheShineActivity />} />
            <Route path="/sheshine-survey" element={<SheShineSurvey />} />

          </Routes>
      </div>
    </Router>
  );
}

export default App;
