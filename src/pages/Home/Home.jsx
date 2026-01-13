import React from 'react';

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
  return (
    <main className="page-home">
      
      {/* Secțiunea Hero (Landing) */}
      <section id="home">
        <Hero />
      </section>
      
      {/* Timer-ul */}
      <section id="countdown">
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