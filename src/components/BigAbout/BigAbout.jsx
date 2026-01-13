import React from 'react';
import './BigAbout.scss';
import LogoSVG from '../../assets/icons/logo.svg'; 

const BigAbout = () => {
  return (
    <section className="big-about" id="about">
      
      <div className="big-about__wrapper">
        <div className="big-about__bg-layer"></div>

        <div className="big-about__intro-logo">
           <img src={LogoSVG} alt="Intro Logo" />
        </div>

        <div className="big-about__content">
            
            <h1 className="big-about__main-title">
              {/* Le punem în span-uri separate pentru a le pune una sub alta pe mobil */}
              <span className="title-top">Despre</span>
              <span className="title-bottom">
                CAD<span className="ampersand">&</span>CRAFT
              </span>
            </h1>
            
            <h2 className="big-about__sub-title">
               Ce este CAD<span className="ampersand">&</span>CRAFT?
            </h2>

            <div className="big-about__text-body">
                <p>
                  CAD<span className="ampersand">&</span>Craft este un eveniment de tip CADATHON, inspirat de formatul Hackathon-urilor, 
                  care se concentrează pe aplicarea cunoștințelor de proiectare pentru a rezolva o temă prestabilită. 
                  Participanții sunt provocați să își folosească creativitatea în proiectare asistată pe calculator 
                  pentru a dezvolta soluții inovative și eficiente.
                </p>

                <p>
                  Evenimentul, ce implică o competiție intensă, invită studenții pasionați de inginerie și 
                  proiectare asistată de calculator să colaboreze și să își dezvolte abilitățile practice 
                  în modelarea 3D a unei piese folosind platforma Onshape sau alt software CAD.
                </p>

                <p>
                  Participanții își pot pune la încercare cunoștințele tehnice în cadrul unei provocări captivante 
                  ce presupune transformarea ideilor în realitate. Concurenții vor fi împărțiți în echipe, 
                  în cadrul unui maraton de 24 de ore.
                </p>

                <p>
                  Tema proiectului va fi dezvăluită la începutul evenimentului, asigurând astfel o provocare echitabilă 
                  pentru toți participanții și stimulându-le capacitatea de adaptare și găsirea unor soluții îndrăznețe.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default BigAbout;