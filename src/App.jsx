import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Handbook from './pages/Handbook/Handbook';
import Footer from './components/Footer/Footer';
import './styles/main.scss'; // Importăm stilurile globale resetate

import HandbookAbout from './pages/Handbook/sections/HandbookAbout';
import HandbookTimeline from './pages/Handbook/sections/HandbookTimeline';
import HandbookFormat from './pages/Handbook/sections/HandbookFormat';
import HandbookRules from './pages/Handbook/sections/HandbookRules';
import HandbookAwards from './pages/Handbook/sections/HandbookAwards';
import HandbookProfile from './pages/Handbook/sections/HandbookProfile';
import HandbookContact from './pages/Handbook/sections/HandbookContact';

import Team from './pages/Team/Team';
import Register from './pages/Register/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/inscriere" element={<Register />} />

        <Route path="/handbook" element={<Handbook />}>
          <Route index element={<Navigate to="about" replace />} />
          <Route path="about" element={<HandbookAbout />} />
          <Route path="timeline" element={<HandbookTimeline />} />
          <Route path="format" element={<HandbookFormat />} />
          <Route path="rules" element={<HandbookRules />} />
          <Route path="awards" element={<HandbookAwards />} />
          <Route path="profile" element={<HandbookProfile />} />
          <Route path="contact" element={<HandbookContact />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;