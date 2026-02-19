import React, { useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn } from 'react-icons/fa';
import { BsArrowRightCircle } from 'react-icons/bs';
import './Hero.scss';
// Verifică dacă ai importat corect logo-ul și imaginea
import LogoSVG from '../../assets/icons/logo.svg';
import heroImage from '../../assets/images/home.webp';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">

      {/* 1. WRAPPER PRINCIPAL */}
      <div className="hero__wrapper">

        {/* 2. LAYER FUNDAL (Imagine + Overlay Întunecat) */}
        <div className="hero__full-image-layer">
          <div className="bg-image" style={{ backgroundImage: `url(${heroImage})` }}></div>

          {/* ACESTA ESTE STRATUL CARE ÎNTUNECĂ IMAGINEA */}
          <div className="overlay"></div>
        </div>

        {/* 3. LAYER "CUTOUT" (SVG-ul tău original care face forma albă) */}
        <div className="hero__white-overlay-container">
          <svg
            className="white-cover-svg"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
          >
            <g transform="scale(0.95) translate(0.026, 0.026)">
              <path
                fill="#E8EFF7"
                fillRule="evenodd"
                d="
                    M-8,-5 H16 V10 H-8 Z
                    M0.985,0 
                    C0.993,0,1,0.013,1,0.029 
                    V0.971 
                    C1,0.987,0.993,1,0.985,1 
                    H0.25 
                    C0.242,1,0.235,0.987,0.235,0.971 
                    V0.925 
                    C0.235,0.909,0.228,0.896,0.22,0.896 
                    H0.014 
                    C0.006,0.896,0,0.883,0,0.867 
                    V0.029 
                    C0,0.013,0.006,0,0.014,0 
                    H0.985 Z
                  "
              />
            </g>
          </svg>
        </div>

        {/* 4. LOGO INTRO (Animația de start) */}
        <div className="hero__intro-logo">
          <img src={LogoSVG} alt="Intro Logo" />
        </div>

        {/* 5. CONȚINUTUL (Text + Butoane) */}
        <div className="hero__content">
          <h1 className="hero__title">
            CAD<span className="brand-ampersand text-highlight">&</span>CRAFT
          </h1>
          <h2 className="hero__date">21-22 Martie 2026</h2>

          <p className="hero__description">
            CAD&CRAFT revine și anul acesta să îți provoace imaginația!
            Ne întoarcem în forță cu un univers dedicat soluțiilor smart și designului de top.
            Încarcă-ți bateriile, adună-ți echipa și fii gata să ducem competiția la nivelul următor.
          </p>

          <div className="hero__actions">
            <Link
              to="/#about"
              className="btn btn--primary"
            >
              AFLA MAI MULTE
            </Link>

            <Link
              to="/handbook"
              className="btn btn--green"
            >
              REGULAMENT <BsArrowRightCircle className="icon" />
            </Link>
          </div>
        </div>

        {/* 6. INSULIȚA SOCIALĂ (În colțul stânga jos al formei) */}
        <div className="hero__social-island">
          <div className="social-icons">
            <a href="https://www.facebook.com/OSFIIR" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/osfiir" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@o.s.f.i.i.r" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            <a href="https://www.linkedin.com/company/osfiir/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;