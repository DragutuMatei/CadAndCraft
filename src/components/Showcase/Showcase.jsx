import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs'; 
import { FaQuoteLeft } from 'react-icons/fa';
import './Showcase.scss';

import CYCLONE from '../../assets/showcase/3DCYCLONE.webp';
import ARTORIAS from '../../assets/showcase/ARTORIAS.webp';
import BYSMARK from '../../assets/showcase/BYSMARK.webp';
import CRABUELITE from '../../assets/showcase/CRABUELITE.webp';
import DASSAULT from '../../assets/showcase/DASSAULT.webp';
import EAGLES from '../../assets/showcase/EAGLESFI.webp';
import FILAMEN from '../../assets/showcase/FILAMEN.webp';
import HAZZ from '../../assets/showcase/HAZZ.webp';
import INNOVATEX from '../../assets/showcase/INNOVATEX.webp';
import PAC from '../../assets/showcase/PAC.webp';
import PROJECTCASSIOPEIA from '../../assets/showcase/PROJECTCASSIOPEIA.webp';
import PROIECTULOCHIOMETRIC from '../../assets/showcase/PROIECTULOCHIOMETRIC.webp';
import SEFIILACAD from '../../assets/showcase/SEFIILACAD.webp';
import SPD_T1 from '../../assets/showcase/SPD_T1.webp';
import SQUADCAL from '../../assets/showcase/SQUADCAL.webp';
import SYSTEMATICSCRAFTERS from '../../assets/showcase/SYSTEMATIC.webp';
import TECHTITANS from '../../assets/showcase/TECHTITANS.webp';
import THESLINGSHOTBROTHERS from '../../assets/showcase/THESLINGSHOTBROTHERS.webp';
import VELOCITY from '../../assets/showcase/VELOCITY.webp';
import W3D from '../../assets/showcase/W3D.webp';




const teamMembers = [
  { id: 1, name: '3DCYCLONE', img: CYCLONE },
  { id: 2, name: 'ARTORIAS', img: ARTORIAS },
  { id: 3, name: 'BYSMARK', img: BYSMARK },
  { id: 4, name: 'CRABUELITE', img: CRABUELITE },
  { id: 5, name: "D'ASSAULT", img: DASSAULT },
  { id: 6, name: 'EAGLES F1', img: EAGLES },
  { id: 7, name: 'FILA-MEN', img: FILAMEN },
  { id: 8, name: 'HAZZ', img: HAZZ },
  { id: 9, name: 'INNOVATEX', img: INNOVATEX },
  { id: 10, name: 'PAC', img: PAC },
  { id: 11, name: 'PROJECT CASSIOPEIA', img: PROJECTCASSIOPEIA },
  { id: 12, name: 'PROIECTUL OCHIOMETRIC', img: PROIECTULOCHIOMETRIC },
  { id: 13, name: 'SEFII LA CAD', img: SEFIILACAD },
  { id: 14, name: 'SPD_T1', img: SPD_T1 },
  { id: 15, name: 'SQUAD CAL', img: SQUADCAL },
  { id: 16, name: 'SYSTEMATIC`S CRAFTERS', img: SYSTEMATICSCRAFTERS },
  { id: 17, name: 'TECHTITANS', img: TECHTITANS },
  { id: 18, name: 'THE SLINGSHOT BROTHERS', img: THESLINGSHOTBROTHERS },
  { id: 19, name: 'VELOCITY', img: VELOCITY },
  { id: 20, name: 'W3D', img: W3D },
];

const infiniteMembers = [...teamMembers, ...teamMembers, ...teamMembers];

const Showcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const [activeImage, setActiveImage] = useState(CYCLONE); 
  const trackRef = useRef(null); 
  const [isPaused, setIsPaused] = useState(false); 
  const pauseTimeout = useRef(null); 
  const scrollPos = useRef(0); 
  const animationRef = useRef(null); 
  const [clickedCardIndex, setClickedCardIndex] = useState(null);

  // --- VARIABILE NOI PENTRU DRAG ---
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollPos = useRef(0);
  const dragDistance = useRef(0); // Măsurăm cât a tras ca să știm dacă e click sau drag

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (currentSection) observer.observe(currentSection);
    return () => { if (currentSection) observer.unobserve(currentSection); };
  }, []);

  // --- LOGICA BANDA RULANTĂ + DRAG ---
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      // Rulează animația doar dacă NU e pauză și NU tragem cu mouse-ul în momentul ăsta
      if (!isPaused && !isDragging.current) {
        scrollPos.current += 0.5; 
        
        // Logica de infinit (resetare poziție)
        const firstCard = track.children[0];
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth; 
            const totalWidth = cardWidth * teamMembers.length;
            
            // Resetare silențioasă la 0
            if (scrollPos.current >= totalWidth) {
                scrollPos.current = 0;
            } else if (scrollPos.current < 0) {
               // Caz nou: dacă tragi spre dreapta prea mult, te duce la final (efect infinit invers)
               scrollPos.current = totalWidth - 1;
            }

            // Aplicăm transformarea
            track.style.transform = `translateX(-${scrollPos.current}px)`;

            // Schimbare automată poză
            const indexExited = Math.floor(scrollPos.current / cardWidth);
            const memberIndex = indexExited % teamMembers.length;
            if (infiniteMembers[memberIndex] && !isDragging.current) {
                 setActiveImage(teamMembers[memberIndex].img);
            }
        }
      } else if (isDragging.current) {
         // Dacă tragem, doar aplicăm transformarea calculată în onMouseMove, fără logică automată
         track.style.transform = `translateX(-${scrollPos.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);


  // --- HANDLERS PENTRU MOUSE DRAG ---
  const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX;
      startScrollPos.current = scrollPos.current;
      dragDistance.current = 0;
      
      // Oprim temporar animația automată ca să nu se bată cap în cap
      setIsPaused(true); 
  };

  const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      
      const x = e.pageX;
      const walk = (x - startX.current) * 1.5; // Viteza de tragere (1.5x)
      scrollPos.current = startScrollPos.current - walk;
      
      // Calculăm distanța totală trasă (absolută)
      dragDistance.current += Math.abs(x - startX.current);
  };

  const handleMouseUp = () => {
      isDragging.current = false;
      
      // Repornim animația automată după scurt timp
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
      pauseTimeout.current = setTimeout(() => {
          setIsPaused(false);
      }, 2000); // Repornește după 2 secunde de la drag
  };

  const handleMouseLeave = () => {
      if (isDragging.current) handleMouseUp();
  };

  // --- HANDLER CLICK CARD ---
  const handleCardClick = (img, uniqueIndex) => {
    // PROTECȚIE: Dacă utilizatorul a tras mai mult de 5 pixeli, înseamnă că a vrut
    // să dea scroll, nu să dea click. Ignorăm schimbarea pozei.
    if (dragDistance.current > 5) return;

    setActiveImage(img);
    setClickedCardIndex(uniqueIndex);

    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
        setIsPaused(false);
    }, 5000);

    setTimeout(() => {
        setClickedCardIndex(null);
    }, 500);
  };

  return (
    <section ref={sectionRef} className={`showcase-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="showcase-content-wrapper">
        
        <div className="text-column">
            {/* ... cod text neschimbat ... */}
            <div className="text-sticky-wrapper">
                <h1 className="title-large">
                CAD<span className="stroke">&</span>CRAFT<br />
                EDITIA I
                </h1>
                <div className="quote-block">
                <FaQuoteLeft className="quote-icon" />
                <p>Aici a început totul! ⚡<br></br>
                  Ediția I a fost scânteia care a aprins pasiunea pentru inovație în OSFIIR. 
                 Ce a părut o provocare imposibilă – 24 de ore de design și execuție – 
                 s-a transformat într-un spectacol de inginerie pură. 🛠️ Cu multă cafea și 
                 idei revoluționare, am demonstrat că viitorul se construiește în echipă. 
                 A fost doar începutul unei tradiții! 🚀🏆</p>
                </div>
            </div>
        </div>

        <div className="visual-column">
          <div className="visual-anchor">
            
            <div className="masked-image-layer">
              <svg viewBox="0 0 750 746" className="mask-svg" preserveAspectRatio="none">
                <defs>
                  <pattern id="pattern-img" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <image 
                        key={activeImage} 
                        href={activeImage} 
                        x="0" y="0" width="1" height="1" 
                        preserveAspectRatio="xMidYMid slice" 
                    />
                  </pattern>
                </defs>
                <path d="M511 47C511 61.9117 523.088 74 538 74H723C737.912 74 750 86.0883 750 101V726C750 737.046 741.046 746 730 746H20C8.95431 746 0 737.046 0 726V709C0 694.088 12.0883 682 27 682H213C227.912 682 240 669.912 240 655V376C240 361.088 227.912 349 213 349H27C12.0883 349 0 336.912 0 322V20C0 8.95431 8.95431 2.61729e-07 20 0H484C498.912 0 511 12.0883 511 27V47Z" fill="url(#pattern-img)" />
              </svg>
            </div>

            <img 
                key={activeImage}
                src={activeImage} 
                alt="Showcase Main" 
                className="mobile-static-image" 
            />

            <a href="/about" className="btn-absolute">
                VEZI MAI MULTE <span className="icon-circle"><BsArrowRight /></span>
            </a>

            <div className="slider-container-absolute">
                {/* AICI ADĂUGĂM EVENIMENTELE DE MOUSE PE CONTAINERUL PĂRINTE 
                   PENTRU A PUTEA TRAGE DE ORIUNDE DIN SLIDER 
                */}
                <div 
                    className="slider-viewport"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="slider-track" ref={trackRef}>
                        {infiniteMembers.map((member, index) => (
                            <div 
                                key={`${member.id}-${index}`} 
                                className={`slide-item ${clickedCardIndex === index ? 'is-clicked' : ''}`}
                                // onClick este protejat acum de logica dragDistance
                                onClick={() => handleCardClick(member.img, index)}
                            >
                                <div className="team-card">
                                    {/* pointer-events-none pe img asigură că drag-ul merge bine și nu încearcă să tragă poza în sine */}
                                    <img src={member.img} alt={member.name} style={{ pointerEvents: 'none' }} />
                                    <div className="green-label">{member.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;