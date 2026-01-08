import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
import './Showcase.scss';

import teamImg from '../../assets/images/team1.jpg'; 
import bigShowcaseImage from '../../assets/images/showcase.webp'; 

const teamMembers = [
  { id: 1, name: 'SQUAD CAL 1', img: teamImg },
  { id: 2, name: 'SQUAD CAL 2', img: teamImg },
  { id: 3, name: 'SQUAD CAL 3', img: teamImg },
  { id: 4, name: 'SQUAD CAL 4', img: teamImg },
  { id: 5, name: 'SQUAD CAL 5', img: teamImg },
  { id: 6, name: 'SQUAD CAL 6', img: teamImg },
  { id: 7, name: 'SQUAD CAL 7', img: teamImg },
  { id: 8, name: 'SQUAD CAL 8', img: teamImg },
  { id: 9, name: 'SQUAD CAL 9', img: teamImg },
  { id: 10, name: 'SQUAD CAL 10', img: teamImg },
];

const Showcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3; 
  const maxIndex = teamMembers.length - visibleCards;

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(curr => curr - 1);
  };

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
          <div className="text-sticky-wrapper">
            <h1 className="title-large">
              CAD<span className="stroke">&</span>CRAFT<br />
              EDITIA I
            </h1>
            
            <div className="quote-block">
              <FaQuoteLeft className="quote-icon" />
              <p>
                Matei te pup dulce la corason ❤️❤️, consectetur . 
                Vestibulum viverra dignissim mauris ac tristique. Nulla 
                hendrerit nec erat bibendum lacinia. Mama este mare.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum viverra dignissim mauris ac tristique. Nulla 
                hendrerit nec erat bibendum lacinia. Mama este mare.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum viverra dignissim mauris ac tristique. Nulla 
                hendrerit nec erat bibendum lacinia. Mama este mare.
              </p>
            </div>
          </div>
        </div>

        {/* --- DREAPTA: Vizual --- */}
        <div className="visual-column">
          
          <div className="visual-anchor">
            
            {/* 1. Imaginea Mascată (SVG) - SE VEDE DOAR PE DESKTOP */}
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

            {/* 2. Imaginea Normală - SE VEDE DOAR PE MOBIL */}
            <img src={bigShowcaseImage} alt="Showcase Main" className="mobile-static-image" />

            {/* 3. Butonul Verde */}
            <button className="btn-absolute">
              VEZI MAI MULTE <span className="icon-circle"><BsArrowRight /></span>
            </button>

            {/* 4. Slider Carduri */}
            <div className="slider-container-absolute">
                <div className="slider-viewport">
                    <div 
                        className="slider-track"
                        style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
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

                <div className="slider-nav">
                    <button onClick={prevSlide} disabled={currentIndex === 0}>
                        <BsArrowLeft />
                    </button>
                    <button onClick={nextSlide} disabled={currentIndex === maxIndex}>
                        <BsArrowRight />
                    </button>
                </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Showcase;