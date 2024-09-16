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
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/image-slider" element={<ImageSlider />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/activity-screen" element={<ActivityScreen />} />
            <Route path="/congrats-activity" element={<CongratsScreen />} />
            <Route path="/collect-rewards" element={<CollectRewardsScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/reward-confirmation" element={<RewardConfirmation />} />
            <Route path="/metrics" element={<MetricsScreen />} />
            <Route path="/survey" element={<SurveyScreen />} />
            <Route path="/congratulations" element={<ThankYou />} />
            <Route path="/journey-choice" element={<JourneyChoiceScreen />} />
          </Routes>

      </div>
    </Router>
  );
}

export default App;
