import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Volunteer from "./pages/AccountCreationAndLogin.jsx";
import SimpleForm from "./pages/exampleMongoHookup.jsx";
import Profile from "./pages/PofilePage.jsx";
import TestPage from "./pages/testPage.jsx";



export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/volunteer" element={<Volunteer/>} />
        <Route path="/simpleform" element={<SimpleForm/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/testpage" element={<TestPage/>} />
      </Routes>
  );
}
