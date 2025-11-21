import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Volunteer from "./pages/AccountCreationAndLogin.jsx";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/volunteer" element={<Volunteer/>} />
      </Routes>
  );
}
