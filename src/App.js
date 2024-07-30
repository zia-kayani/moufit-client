import './App.css';
import Navigation from './Components/Shared Components/Navigation/Navigation';
import Home from './Pages/Home/Home';
import FooterMoufit from './Components/Shared Components/Footer/FooterMoufit';
import {
  Switch,
  Route,

} from "react-router-dom";
import {
  BrowserRouter as Router, Routes,
} from "react-router-dom";
import LifestyleAndFitness from './Pages/LifestyleAndFitness/LifestyleAndFitness';
import Login from './Pages/Login/Login';
import HowItWorks from './Pages/HowItWorks/HowItWorks';
import Subscriptions from './Pages/Subscriptions/Subscriptions';
import Blogs from './Pages/Blogs/Blogs';
import About from './Pages/About/About';
import ContactUs from './Pages/ContactUs/ContactUs';
import WebsiteTerms from './Pages/WebsiteTerms/WebsiteTerms';
import Locations from './Pages/Locations/Locations';
import LocationLandingPage from './Pages/LocationLanding/LocationLandingPage';
import Joinnow from './Pages/JoinNow/Joinnow';
import SingleBlogPost from './Pages/SingleBlogPost/SingleBlogPost';
import BankForm from './Components/Sections/JoinInForm/BankForm';
import JoinAsPartner from './Components/Sections/JoinInForm/JoinAsPartner';
import NewLocationPage from './Pages/LocationLanding/NewSingleLocationPage';
import PrivacyAndPolicy from './Pages/PrivacyAndPolicy/PrivacyAndPolicy';




function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="lifestyle-&-fitness" element={<LifestyleAndFitness />} />
        <Route path="login" element={<Login />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blog/:id" element={<SingleBlogPost />} />
        <Route path="about-us" element={<About/>} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="website-terms" element={<WebsiteTerms />} />
        <Route path="locations" element={<Locations />} />
        <Route path="location-page" element={<LocationLandingPage />} />
        <Route path="new-location-page" element={<NewLocationPage />} />

        <Route path="join-now" element={<Joinnow />} />
        <Route path="join-as-partner" element={<JoinAsPartner />} />
        <Route path="privacy-&-policy" element={<PrivacyAndPolicy />} />


        <Route path="bank" element={<BankForm />} />

      </Routes>
      <FooterMoufit />
    </div>
  );
}

export default App;
