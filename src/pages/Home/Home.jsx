import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// --- Components ---
// Navbar și Footer sunt în App.jsx, deci nu le mai importăm aici
import Hero from '../../components/Hero/Hero';
import Countdown from '../../components/Countdown/Countdown';
import About from '../../components/About/About';
import Showcase from '../../components/Showcase/Showcase';
import FAQ from '../../components/FAQ/FAQ';

// --- Styles ---
import './Home.scss';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="page-home">

      {/* Secțiunea Hero (Landing) */}
      <section id="home">
        <Hero />
      </section>

      {/* Timer-ul */}
      <section id="inscrieri">
        <Countdown />
      </section>

      {/* Showcase (Ediția I) */}
      <section id="showcase">
        <Showcase />
      </section>

      {/* Despre */}
      <section id="about">
        <About />
      </section>

      {/* Întrebări Frecvente */}
      <section id="faq">
        <FAQ />
      </section>

    </main>
  );
};

export default Home;