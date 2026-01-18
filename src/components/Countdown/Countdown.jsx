import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';
import './Countdown.scss';
// Importăm SVG-ul extern (care conține formele verde/galben)
import AboutSVG from '../../assets/icons/countdown.svg';

const Countdown = () => {
  const [expiryDate] = useState(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    // Data țintă: 20 Februarie
    let target = new Date(currentYear, 1, 2);
    if (now > target) target.setFullYear(currentYear + 1);
    return target;
  });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const formatNumber = (num) => num < 10 ? `0${num}` : num;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = expiryDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className={`countdown-section ${isVisible ? 'is-visible' : ''}`}>

      <div className="countdown-card">

        {/* 1. FUNDAL SVG (Folosim fișierul importat) */}
        <div className="bg-layer">
          {/* Folosim img tag pentru a controla mai ușor aspect ratio */}
          <img src={AboutSVG} alt="Countdown Background" />
        </div>

        {/* 2. CONȚINUT */}
        <div className="content-layer">

          {/* ZONA SUS (VERDE ÎN SVG) */}
          <div className="top-section">
            <div className="text-wrapper">
              <h2 className="subtitle">ÎNSCRIERILE SE</h2>
              <h1 className="title">DESCHID ÎN:</h1>
            </div>
          </div>

          {/* ZONA JOS (GALBEN ÎN SVG) */}
          <div className="bottom-section">

            <div className="timer-container">
              <div className="timer-item">
                <span className="number">{formatNumber(timeLeft.days)}</span>
                <span className="label">zile</span>
              </div>
              <div className="timer-item">
                <span className="number">{formatNumber(timeLeft.hours)}</span>
                <span className="label">ore</span>
              </div>
              <div className="timer-item">
                <span className="number">{formatNumber(timeLeft.minutes)}</span>
                <span className="label">minute</span>
              </div>
              <div className="timer-item">
                <span className="number">{formatNumber(timeLeft.seconds)}</span>
                <span className="label">secunde</span>
              </div>
            </div>
            {false &&
              <button className="btn-register">
                ÎNSCRIE-TE AICI <BsArrowRightCircle className="icon" />
              </button>
            }
          </div>

        </div>
      </div>
    </section>
  );
};

export default Countdown;