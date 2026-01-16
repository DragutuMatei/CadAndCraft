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
                  CAD&CRAFT – De la idee la realitate în 24 de ore ⚙️🚀

Ești gata pentru provocarea supremă? Pe 21-22 Martie, OSFIIR transformă Facultatea de Inginerie într-o arenă a inovației. Competiția te provoacă în două etape esențiale:

CAD: Proiectare 3D avansată și soluții smart pe o temă surpriză.

CRAFT: Asamblarea fizică și testarea prototipului tău.

Nu ești singur în fața monitorului! Îți asigurăm „combustibilul” necesar (mâncare, cafea, energizante), zonă de relaxare și premii pe măsură. Demonstrează că ai precizia unui inginer și viziunea unui creator. Adună-ți echipa și înscrie-te acum în maratonul care îți definește viitorul! 🏆📐
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
                   <h3>20</h3>
                   <p>ECHIPE</p>
                 </div>
                 <div className="stat-box">
                   <h3>24</h3>
                   <p>ORE DE FOC</p>
                 </div>
              </div>

              {/* Coloana 2 */}
              <div className="grid-col col-2">
                 <div className="stat-box">
                   <h3>10+</h3>
                   <p>PARTENERI</p>
                 </div>
                 <div className="stat-box">
                   <h3>3000€</h3>
                   <p>VALOARE MINIMA PREMII</p>
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