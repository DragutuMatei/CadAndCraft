import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import './FAQ.scss';

const faqData = [
  {
    id: 1,
    question: "Cine se poate înscrie și câți membri poate avea o echipă?",
    answer: "Competiția este deschisă tuturor studenților (licență sau master) pasionați de inginerie. Echipele trebuie să fie formate din 3 membri. Dacă nu ai o echipă completă, te poți înscrie și vom încerca să te unim cu alți entuziaști."
  },
  {
    id: 2,
    question: "Trebuie să fiu expert în modelare 3D ca să particip?",
    answer: "Nu căutăm neapărat experți, ci oameni creativi și descurcăreți! Dacă ai cunoștințe de bază într-un soft CAD și poți vizualiza o soluție tehnică, ai toate șansele. CAD&CRAFT este și despre învățare și lucru în echipă."
  },
  {
    id: 3,
    question: "Ce trebuie să am la mine în ziua concursului?",
    answer: "Obligatoriu: Laptopul personal (cu softul CAD instalat), încărcător și un mouse (crede-ne, nu vrei să proiectezi pe touchpad). Recomandăm și un prelungitor per echipă. De restul (mâncare, materiale CRAFT, internet) ne ocupăm noi."
  },
  {
    id: 4,
    question: "Ce programe de proiectare (CAD) putem folosi?",
    answer: "Sunteți liberi să folosiți orice soft cu care vă simțiți confortabil: CATIA, SolidWorks, Siemens NX, Fusion 360, Inventor etc. Important este rezultatul final și respectarea temei."
  },
  {
    id: 5,
    question: "Participarea costă? Și... primim de mâncare?",
    answer: "Participarea este 100% gratuită! Mai mult, pe parcursul celor 24 de ore asigurăm catering (pizza, snacks), cafea și energizante ca să rămâneți în forță până la final."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
    <section ref={sectionRef} className={`faq-section ${isVisible ? 'visible' : ''}`}>
      <div className="faq-container">
        
        <h2 className="faq-title">
          Frequently Asked <span className="highlight">Questions</span>
        </h2>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div 
              key={item.id} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
              // AICI ESTE MAGIA: Delay calculat pe baza indexului (0s, 0.1s, 0.2s...)
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="faq-header">
                <h3>{item.question}</h3>
                <IoIosArrowDown className="icon" />
              </div>
              
              <div className="faq-body">
                <div className="faq-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;