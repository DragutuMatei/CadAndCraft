import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './styles/main.scss'; // Importăm stilurile globale resetate

import HandbookAbout from './pages/Handbook/sections/HandbookAbout';
import HandbookTimeline from './pages/Handbook/sections/HandbookTimeline';
import HandbookFormat from './pages/Handbook/sections/HandbookFormat';
import HandbookRules from './pages/Handbook/sections/HandbookRules';
import HandbookAwards from './pages/Handbook/sections/HandbookAwards';
import HandbookProfile from './pages/Handbook/sections/HandbookProfile';
import HandbookContact from './pages/Handbook/sections/HandbookContact';
import Redirect from './pages/QR/Redirect';
import HomeRedirect from './pages/QR/HomeRedirect';
// --- Lazy Loading Pages ---
const Home = React.lazy(() => import('./pages/Home/Home'));
const About = React.lazy(() => import('./pages/About/About'));
const Team = React.lazy(() => import('./pages/Team/Team'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Handbook = React.lazy(() => import('./pages/Handbook/Handbook'));
const Admin = React.lazy(() => import('./pages/Admin/Admin'));

// Loading Fallback Component
const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <p>Se încarcă...</p>
  </div>
);

// Layout Component to include Navbar and Footer
const MainLayout = () => (
  <>
    <Navbar />
    <React.Suspense fallback={<Loading />}>
      <Outlet />
    </React.Suspense>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeRedirect />} />

          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/inscriere" element={<Register />} />

          <Route path="/qr/*" element={<Redirect />} />

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
        </Route>

        {/* Admin Route - Standalone */}
        <Route path="/admin" element={
          <React.Suspense fallback={<Loading />}>
            <Admin />
          </React.Suspense>
        } />

      </Routes>
    </Router>
  );
}

export default App;