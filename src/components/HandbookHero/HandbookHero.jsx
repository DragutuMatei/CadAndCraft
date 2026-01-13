import React from 'react';
import './HandbookHero.scss';
// Asigură-te că logo-ul este importat corect
import LogoSVG from '../../assets/icons/logo.svg'; 

const HandbookHero = () => {
  return (
    <section className="handbook-hero">
      
      <div className="handbook-hero__wrapper">
        
        <div className="handbook-hero__full-image-layer">
           <div className="bg-image"></div>
           <div className="overlay"></div>
        </div>

        <div className="handbook-hero__intro-logo">
           <img src={LogoSVG} alt="Intro Logo" />
        </div>

        <div className="handbook-hero__content">
            
            {/* CLASA SCHIMBATĂ: __hb-title */}
            <h1 className="handbook-hero__hb-title">
              CAD<span className="text-highlight">&</span>CRAFT <br />
              HANDBOOK
            </h1>
            
            {/* CLASA SCHIMBATĂ: __hb-description */}
            <p className="handbook-hero__hb-description">
              Inainte sa te inscrii la acest concurs iti recomandam <br />
              sa citesti regulamentul.
            </p>

            <div className="handbook-hero__actions">
              
              <button className="btn--download">
                Download HANDBOOK 
                <span className="icon-circle">↗</span>
              </button>
              
              <button className="btn--signup">
                Inscrie-te
              </button>

            </div>
        </div>

      </div>
    </section>
  );
};

export default HandbookHero;