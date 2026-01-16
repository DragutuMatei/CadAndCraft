import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
import './Showcase.scss';

// Asigură-te că aceste importuri sunt corecte în proiectul tău
import teamImg from '../../assets/images/team1.jpg'; 
import bigShowcaseImage from '../../assets/images/showcase.webp'; 

const teamMembers = [
  { id: 1, name: 'SQUAD CAL 1', img: bigShowcaseImage },
  { id: 2, name: 'SQUAD CAL 2', img: bigShowcaseImage },
  { id: 3, name: 'SQUAD CAL 3', img: bigShowcaseImage },
  { id: 4, name: 'SQUAD CAL 4', img: bigShowcaseImage },
  { id: 5, name: 'SQUAD CAL 5', img: bigShowcaseImage },
  { id: 6, name: 'SQUAD CAL 6', img: bigShowcaseImage },
  { id: 7, name: 'SQUAD CAL 7', img: bigShowcaseImage },
  { id: 8, name: 'SQUAD CAL 8', img: bigShowcaseImage },
  { id: 9, name: 'SQUAD CAL 9', img: bigShowcaseImage },
  { id: 10, name: 'SQUAD CAL 10', img: bigShowcaseImage },
];

const Showcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Configurare Slider Desktop
  const visibleCards = 3; 
  const totalSlides = teamMembers.length;
  // Indexul maxim până la care putem merge fără să rămână spațiu alb
  const maxIndex = totalSlides - visibleCards; 

  // === LOGICA AUTO-SCROLL ===
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Dacă am ajuns la final, resetăm la 0 (început)
        if (prevIndex >= maxIndex) {
          return 0;
        }
        // Altfel, mergem la următorul
        return prevIndex + 1;
      });
    }, 3000); // 3000ms = 3 secunde (modifică aici viteza)

    // Curățăm intervalul când componenta se închide
    return () => clearInterval(interval);
  }, [maxIndex]);

  // Observer pentru animația de apariție a secțiunii
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className={`showcase-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="showcase-content-wrapper">
        
        {/* --- STÂNGA: Text --- */}
        <div className="text-column">
          <div className="text-sticky-wrapper"> {/* Dacă ai nevoie de sticky, altfel e doar div */}
            <h1 className="title-large">
              CAD<span className="stroke">&</span>CRAFT<br />
              EDITIA I
            </h1>
            
            <div className="quote-block">
              <FaQuoteLeft className="quote-icon" />
              <p>
                Așa a arătat succesul la prima ediție CAD&CRAFT! 🏆 <br></br> <br></br>

                Aruncăm o privire înapoi la campionii de anul trecut care au demonstrat că precizia și creativitatea fac echipa perfectă. 📐✨  <br></br><br></br>

                Te simți inspirat? Anul acesta, locul lor pe podium poate fi al tău!🥇

              </p>
            </div>
          </div>
        </div>

        {/* --- DREAPTA: Vizual --- */}
        <div className="visual-column">
          
          <div className="visual-anchor">
            
            {/* 1. Imaginea Mascată (SVG) - Desktop */}
            <div className="masked-image-layer">
              <svg viewBox="0 0 750 746" className="mask-svg" preserveAspectRatio="none">
                <defs>
                  <pattern id="pattern-img" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image href={bigShowcaseImage} x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                </defs>
                <path 
                  d="M511 47C511 61.9117 523.088 74 538 74H723C737.912 74 750 86.0883 750 101V726C750 737.046 741.046 746 730 746H20C8.95431 746 0 737.046 0 726V709C0 694.088 12.0883 682 27 682H213C227.912 682 240 669.912 240 655V376C240 361.088 227.912 349 213 349H27C12.0883 349 0 336.912 0 322V20C0 8.95431 8.95431 2.61729e-07 20 0H484C498.912 0 511 12.0883 511 27V47Z" 
                  fill="url(#pattern-img)"
                />
              </svg>
            </div>

            {/* 2. Imaginea Statică - Mobil */}
            <img src={bigShowcaseImage} alt="Showcase Main" className="mobile-static-image" />

            {/* 3. Butonul Verde */}
            <a href="/about" className="btn-absolute">
                VEZI MAI MULTE <span className="icon-circle"><BsArrowRight /></span>
            </a>

            {/* 4. Slider Carduri (Auto-play) */}
            <div className="slider-container-absolute">
                <div className="slider-viewport">
                    <div 
                        className="slider-track"
                        // 33.333% deoarece vrem 3 carduri pe ecran (100 / 3)
                        style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
                    >
                        {teamMembers.map(member => (
                            <div key={member.id} className="slide-item">
                                <div className="team-card">
                                    <img src={member.img} alt={member.name} />
                                    <div className="green-label">{member.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Navigația a fost ascunsă din CSS și scoasă din HTML */}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Showcase;