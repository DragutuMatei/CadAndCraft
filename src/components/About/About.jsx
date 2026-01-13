import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import './About.scss';
// 1. Importăm SVG-ul corect
import AboutBG from '../../assets/icons/about.svg';

const About = () => {
  return (
    <section className="about-section-wrapper">
      <div className="main-card">
        
        {/* === LAYER 1: FUNDAL SVG (Imagine) === */}
        <div className="bg-layer">
           {/* Folosim img tag pentru că e mai curat și se scalează bine */}
           <img src={AboutBG} alt="About Background" />
        </div>

        {/* === LAYER 2: CONȚINUT === */}
        <div className="content-layer">
          
          {/* JUMĂTATEA STÂNGĂ (TEXT) */}
          <div className="content-left">
            <div className="text-wrapper">
              <h2 className="brand-title">
                DESPRE <br />
                <span>CAD&CRAFT</span>
              </h2>
              
              <div className="body-text">
                <p>
                  Fusce in ante in erat feugiat rutrum. Sed placerat odio ex, vel consectetur dolor 
                  blandit sit amet. Maecenas a massa id massa pharetra ultrices sed sit amet metus.
                  Fusce in ante in erat feugiat rutrum. Sed placerat odio ex, vel consectetur dolor 
                  blandit sit amet. Maecenas a massa id massa pharetra ultrices sed sit amet metus.
                  Fusce in ante in erat feugiat rutrum. Sed placerat odio ex, vel consectetur dolor 
                  blandit sit amet. Maecenas a massa id massa pharetra ultrices sed sit amet metus.
                </p>
                <p>
                  Integer laoreet faucibus dolor vitae feugiat. Mauris nec nibh vitae sem mattis 
                  tincidunt eget sit amet ex. Ut felis ante, malesuada sed arcu sed.
                </p>
              </div>

              <div className="action-buttons">
                <a
                  href="/handbook"
                  className="btn-primary"
                  >
                  REGULAMENT 
                  <span className="icon-wrap"><BsArrowUpRight /></span>
                </a>
                <button className="btn-primary">
                  INSCRIE-TE 
                  <span className="icon-wrap"><BsArrowUpRight /></span>
                </button>
              </div>
            </div>
          </div>

          {/* JUMĂTATEA DREAPTĂ (CARDURI) */}
          <div className="content-right">
            <div className="stats-grid">
              
              {/* Coloana 1 */}
              <div className="grid-col col-1">
                 <div className="stat-box">
                   <h3>30+</h3>
                   <p>Clienți</p>
                 </div>
                 <div className="stat-box">
                   <h3>120%</h3>
                   <p>Engagement</p>
                 </div>
              </div>

              {/* Coloana 2 */}
              <div className="grid-col col-2">
                 <div className="stat-box">
                   <h3>3K+</h3>
                   <p>Postări</p>
                 </div>
                 <div className="stat-box">
                   <h3>50+</h3>
                   <p>Proiecte<br/>Realizate</p>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;