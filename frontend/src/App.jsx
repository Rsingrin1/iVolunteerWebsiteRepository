import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ExampleMongoHookup from "./pages/exampleMongoHookup.jsx";
import Profile from "./pages/ProfilePage.jsx";
import InputUserPage from "./pages/userInput.jsx";
import MyEventsOrganizer from "./pages/MyEventsOrganizer.jsx";
import ModifyEvent from "./pages/modifyEvent.jsx";
import Login from "./pages/Login.jsx";
import VolunteerSignUp from "./pages/VolunteerSignUp.jsx";
import LandingPage from "./pages/landingPage.jsx";
import OrganizerSignUp from "./pages/OrganizerSignUp.jsx";
import OrganizerDashboard from "./pages/OrganizerDashboard.jsx";
import EventsCalendar from "./pages/EventsCalendar";



export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/exampleMongoHookup" element={<ExampleMongoHookup/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/userInput" element={<InputUserPage/>} />
        <Route path="/modifyEvent" element={<ModifyEvent/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/MyEventsOrganizer" element={<MyEventsOrganizer/>} />
        <Route path="/VolunteerSignUp" element={<VolunteerSignUp />} />
        <Route path="/landingPage" element={<LandingPage/>} />
        <Route path="/OrganizerSignUp" element={<OrganizerSignUp />} />
        <Route path="/OrganizerDashboard" element={<OrganizerDashboard />} />
        <Route path="/calendar" element={<EventsCalendar />} />
      </Routes>
  );

}
