import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ExampleMongoHookup from "./pages/exampleMongoHookup.jsx";
import TestPage from "./pages/testPage.jsx";
import Profile from "./pages/PofilePage.jsx";
import InputUserPage from "./pages/userInput.jsx";
import MyEventsOrganizer from "./pages/MyEventsOrganizer.jsx";


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/exampleMongoHookup" element={<ExampleMongoHookup/>} />
        <Route path="/testPage" element={<TestPage/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/userInput" element={<InputUserPage/>} />

        <Route path="/MyEventsOrganizer" element={<MyEventsOrganizer/>} />

      </Routes>
  );
}