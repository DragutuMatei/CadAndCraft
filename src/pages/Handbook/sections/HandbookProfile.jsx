import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './HandbookSections.scss';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const HandbookProfile = () => {
    const { language } = useOutletContext();

    return (
        <div className="handbook-section">
            <SectionHeading level={1} id="candidate-profile">{language === 'RO' ? <><span className="num-font">6</span>. Profilul Candidatului</> : <><span className="num-font">6</span>. Candidate Profile</>}</SectionHeading>

            {language === 'RO' ? (
                <div className="handbook-block">
                    <p className="intro">
                        *-abilități, aspecte sau lucruri utile de avut dar nu obligatorii pentru o performanță satisfăcătoare la CAD<span className="brand-ampersand">&</span>CRAFT.
                    </p>

                    <SectionHeading level={2} id="hard-skills"><span className="num-font">1</span>. Hard Skills (Abilități Tehnice)</SectionHeading>
                    <p>
                        Candidatul ideal deține competențe solide în domenii tehnice esențiale pentru tema evenimentului, care implică proiectarea și implementarea unui sistem mecanic inovator. Aceste abilități asigură capacitatea de a transforma idei abstracte în modele funcționale, respectând constrângerile temei.
                    </p>
                    <ul>
                        <li><span className="keyword-highlight">Expertiză în CAD:</span> Cunoștințe în software de proiectare 3D. Abilitatea de a crea modele precise, cu simulări de mișcare și analize structurale, adaptate la soluții creative precum mecanisme bazate pe gravitație, fricțiune sau propulsie pasivă.</li>
                        <li><span className="keyword-highlight">Imprimare 3D și Prototipare:</span> Cunoștințe de bază în pregătirea fișierelor pentru imprimare 3D (de exemplu, formatul STL și slicing cu software precum Cura sau PrusaSlicer), familiarizare cu materialele comune (cum ar fi PLA și ABS) și noțiuni despre optimizarea designului pentru rezistență și greutate redusă, utile pentru testarea funcțională a robotului.</li>
                        <li><span className="keyword-highlight">Robotică și Mecanică:</span> Cunoștințe în principii de mecanică (fricțiune, echilibru, forțe), electronică de bază. Abilitatea de a aborda tema în moduri variate.</li>
                        <li><span className="keyword-highlight">Electronică:</span> Cunoștințe de bază în electronică.</li>
                        <li><span className="keyword-highlight">Alte Aspecte Tehnice:</span> Cunoștințe teoretice în ceea ce privește un ciclu complet de producție (de la concept la testare), pentru a fii capabil de depanare și optimizare.</li>
                    </ul>

                    <SectionHeading level={2} id="soft-skills"><span className="num-font">2</span>. Soft Skills (Abilități Interpersonale)</SectionHeading>
                    <p>
                        Evenimentul fiind bazat pe echipe și colaborare, candidatul ideal excelează în interacțiuni care facilitează munca în echipă sub presiune, stimulând creativitatea colectivă.
                    </p>
                    <ul>
                        <li><span className="keyword-highlight">Lucru în Echipă și Colaborare:</span> Capacitatea de a contribui constructiv în echipe mixte, împărțind sarcini eficient (ex. unul pe CAD, altul pe asamblare) și rezolvând conflicte rapid, esențial pentru un maraton de <span className="num-font">24</span> de ore.</li>
                        <li><span className="keyword-highlight">Comunicare Eficientă:</span> Abilitatea de a explica idei tehnice clar, fie verbal, fie prin documentație, facilitând feedback-ul rapid.</li>
                        <li><span className="keyword-highlight">Documentare și prezentare:</span> Aptitudini în maparea metodologiei și a procesului de realizare printr-o documentație, urmată de susținerea acesteia într-un context public, prin discurs liber, clar și eficient.</li>
                        <li><span className="keyword-highlight">Managementul Timpului și Adaptabilitate:</span> Competențe în prioritizarea sarcinilor sub constrângeri de timp, adaptându-se la tema surpriză și ajustând soluții pe parcurs (ex. pivotare de la o idee inițială la alta dacă testele eșuează).</li>
                        <li><span className="keyword-highlight">Rezolvarea Problemelor:</span> Gândire critică pentru a depăși obstacole neașteptate, cum ar fi limitări materiale sau erori de proiectare, promovând soluții inovatoare.</li>
                        <li><span className="keyword-highlight">Creativitate și Inovație:</span> Abilitatea de a gândi "out-of-the-box", explorând multiple abordări la temă (ex. bio-inspirație sau mecanisme hibride), fără a se limita la soluții convenționale.</li>
                    </ul>

                    <SectionHeading level={2} id="relevant-experience"><span className="num-font">3</span>. Experiență Relevantă</SectionHeading>
                    <p>Candidatul ideal are un background practic care demonstrează aplicarea abilităților în contexte similare, crescând șansele de succes în competiție.</p>
                    <ul>
                        <li>*Participare anterioară CADathon-uri (maratoane robotice) sau concursuri de robotică, unde au dezvoltat prototipuri sub presiune de timp.</li>
                        <li>Proiecte personale sau academice: construirea de roboți simpli, modele 3D imprimate sau experimente.</li>
                        <li>*Experiență în proiectare în cadrul cluburilor de inginerie sau robotică, stagii în companii de tehnologie sau voluntariat în proiecte open-source legate de CAD și imprimare 3D.</li>
                        <li>Portofoliu demonstrabil: orice proiect legat de robotica/inginerie/programare inclusiv modele CAD partajate pe platforme ca Thingiverse, GitHub sau GrabCAD, care arată cunoștințe în domeniu și dedicare.</li>
                    </ul>

                    <SectionHeading level={2} id="education"><span className="num-font">4</span>. Nivel de Educație și Calificări</SectionHeading>
                    <p>Evenimentul țintește studenți și elevi, deci profilul se concentrează pe nivele accesibile, dar cu potențial ridicat.</p>
                    <ul>
                        <li>*Studenți din domeniile mecanică, mecatronică și robotică, inginerie industrială, precum și orice alte specializări derivate din acestea, cum ar fi inginerie autovehicule rutiere, inginerie aerospațială etc., sau elevi de liceu cu specializare tehnică (ex. profile de matematică-informatică sau tehnic).</li>
                        <li>*Certificări relevante, cum ar fi cele de la Autodesk (Certified User in Inventor) sau Onshape (Associate Certification), care demonstrează competențe CAD.</li>
                        <li>*Cursuri online completate (ex. pe Coursera sau edX) în robotică, imprimare 3D sau inginerie, oferind o bază teoretică solidă.</li>
                    </ul>

                    <SectionHeading level={2} id="personality"><span className="num-font">5</span>. Trăsături de Personalitate și Stil de Lucru</SectionHeading>
                    <p>Personalitatea candidatului se aliniază cu dinamismul evenimentului, promovând reziliență și entuziasm prin:</p>
                    <ul>
                        <li><span className="keyword-highlight">Inovator și Curios:</span> O minte deschisă, mereu în căutare de soluții noi, entuziasmat de tema surpriză și de potențialul ei real.</li>
                        <li><span className="keyword-highlight">Gestionare bună a Stresului:</span> Capacitatea de a menține focusul în cele <span className="num-font">24</span> de ore, cu un stil de lucru intens, dar sustenabil, evitând burnout-ul prin pauze strategice.</li>
                        <li><span className="keyword-highlight">Colaborativ și Empatic:</span> Un stil de lucru inclusivist, care valorizează contribuțiile tuturor membrilor echipei, promovând diversitatea ideilor.</li>
                        <li><span className="keyword-highlight">Meticulos și Orientat spre Detalii:</span> Atenție la precizie în proiectare, esențială pentru modele funcționale, dar echilibrat cu flexibilitate pentru ajustări rapide.</li>
                        <li><span className="keyword-highlight">Pasionat și Motivat Intrinsec:</span> O pasiune clară pentru inginerie și proiectare, văzând evenimentul ca o oportunitate de creștere, nu doar competiție.</li>
                    </ul>

                    <SectionHeading level={2} id="objectives"><span className="num-font">6</span>. Obiective și Motivații</SectionHeading>
                    <p>Candidatul ideal este motivat de obiective aliniate cu spiritul CAD<span className="brand-ampersand">&</span>CRAFT, transformând participarea într-o experiență transformatoare.</p>
                    <ul>
                        <li>Să dezvolte abilități practice și să testeze idei inovatoare în context real, vizând soluții cu impact (ex. roboți eficienți energetic pentru medii restrictive).</li>
                        <li>Să construiască rețele profesionale, colaborând cu alți pasionați și potențiali angajatori din inginerie.</li>
                        <li>Să câștige premii, dar prioritar să învețe din eșecuri și succese, țintind cariere în robotică, design sau startup-uri tech.</li>
                        <li><span className="keyword-highlight">Obiective pe termen lung:</span> Contribuție la inovații sustenabile, inspirate de tema evenimentului.</li>
                    </ul>

                    <SectionHeading level={2} id="other"><span className="num-font">7</span>. Alte Aspecte Relevante</SectionHeading>
                    <ul>
                        <li><span className="keyword-highlight">Etica și Responsabilitate:</span> Conștientizare a aspectelor etice în inginerie (ex. siguranță în designul final al robotului), și angajament față de sustenabilitate (nu sa caute doar o soluție a temei, ci sa înțeleagă într-un mod mai profund și complet tema evenimentului).</li>
                        <li><span className="keyword-highlight">Disponibilitate și Logistica:</span> Posesia unui laptop sau calculator care să poată rula un program CAD. *Imprimantă 3D și filament de calitate și performanță considerată de către candidat.</li>
                    </ul>
                </div>
            ) : (
                <div className="handbook-block">
                    <p className="intro">
                        *-skills, aspects or useful things to have but not mandatory for a satisfactory performance at CAD<span className="brand-ampersand">&</span>CRAFT.
                    </p>

                    <SectionHeading level={2} id="hard-skills"><span className="num-font">1</span>. Hard Skills (Technical Abilities)</SectionHeading>
                    <p>
                        The ideal candidate possesses solid skills in essential technical areas for the event's theme, which involves the design and implementation of an innovative mechanical system. These skills ensure the ability to transform abstract ideas into functional models, respecting the theme's constraints.
                    </p>
                    <ul>
                        <li><span className="keyword-highlight">CAD Expertise:</span> Knowledge in 3D design software. Ability to create precise models, with motion simulations and structural analyzes, adapted to creative solutions such as mechanisms based on gravity, friction or passive propulsion.</li>
                        <li><span className="keyword-highlight">3D Printing and Prototyping:</span> Basic knowledge in preparing files for 3D printing (e.g. STL format and slicing with software such as Cura or PrusaSlicer), familiarity with common materials (such as PLA and ABS) and notions about design optimization for strength and low weight, useful for the functional testing of the robot.</li>
                        <li><span className="keyword-highlight">Robotics and Mechanics:</span> Knowledge of principles of mechanics (friction, balance, forces), basic electronics. Ability to approach the theme in varied ways.</li>
                        <li><span className="keyword-highlight">Electronics:</span> Basic knowledge in electronics.</li>
                        <li><span className="keyword-highlight">Other Technical Aspects:</span> Theoretical knowledge regarding a complete production cycle (from concept to testing), to be able to debug and optimize.</li>
                    </ul>

                    <SectionHeading level={2} id="soft-skills"><span className="num-font">2</span>. Soft Skills (Interpersonal Abilities)</SectionHeading>
                    <p>
                        As the event is team and collaboration based, the ideal candidate excels in interactions that facilitate teamwork under pressure, stimulating collective creativity.
                    </p>
                    <ul>
                        <li><span className="keyword-highlight">Teamwork and Collaboration:</span> Ability to contribute constructively in mixed teams, sharing tasks efficiently (e.g. one on CAD, another on assembly) and resolving conflicts quickly, essential for a <span className="num-font">24</span>-hour marathon.</li>
                        <li><span className="keyword-highlight">Effective Communication:</span> Ability to explain technical ideas clearly, either verbally or through documentation, facilitating quick feedback.</li>
                        <li><span className="keyword-highlight">Documentation and presentation:</span> Skills in mapping the methodology and the realization process through documentation, followed by supporting it in a public context, through free, clear and efficient speech.</li>
                        <li><span className="keyword-highlight">Time Management and Adaptability:</span> Competences in prioritizing tasks under time constraints, adapting to the surprise theme and adjusting solutions along the way (e.g. pivoting from an initial idea to another if tests fail).</li>
                        <li><span className="keyword-highlight">Problem Solving:</span> Critical thinking to overcome unexpected obstacles, such as material limitations or design errors, promoting innovative solutions.</li>
                        <li><span className="keyword-highlight">Creativity and Innovation:</span> Ability to think "out-of-the-box", exploring multiple approaches to the theme (e.g. bio-inspiration or hybrid mechanisms), without being limited to conventional solutions.</li>
                    </ul>

                    <SectionHeading level={2} id="relevant-experience"><span className="num-font">3</span>. Relevant Experience</SectionHeading>
                    <p>The ideal candidate has a practical background that demonstrates the application of skills in similar contexts, increasing the chances of success in the competition.</p>
                    <ul>
                        <li>*Past participation in CADathons (robotic marathons) or robotics competitions, where they developed prototypes under time pressure.</li>
                        <li>Personal or academic projects: building simple robots, 3D printed models or experiments.</li>
                        <li>*Design experience in engineering or robotics clubs, internships in tech companies or volunteering in open-source projects related to CAD and 3D printing.</li>
                        <li>Demonstrable portfolio: any project related to robotics/engineering/programming including CAD models shared on platforms like Thingiverse, GitHub or GrabCAD, showing knowledge in the field and dedication.</li>
                    </ul>

                    <SectionHeading level={2} id="education"><span className="num-font">4</span>. Education Level and Qualifications</SectionHeading>
                    <p>The event targets students and pupils, so the profile focuses on accessible levels, but with high potential.</p>
                    <ul>
                        <li>*Students from mechanics, mechatronics and robotics, industrial engineering, as well as any other specializations derived from them, such as road vehicle engineering, aerospace engineering, etc., or high school students with technical specialization (e.g. mathematics-informatics or technical profiles).</li>
                        <li>*Relevant certifications, such as those from Autodesk (Certified User in Inventor) or Onshape (Associate Certification), demonstrating CAD skills.</li>
                        <li>*Completed online courses (e.g. on Coursera or edX) in robotics, 3D printing or engineering, providing a solid theoretical foundation.</li>
                    </ul>

                    <SectionHeading level={2} id="personality"><span className="num-font">5</span>. Personality Traits and Work Style</SectionHeading>
                    <p>The candidate's personality aligns with the event's dynamism, promoting resilience and enthusiasm through:</p>
                    <ul>
                        <li><span className="keyword-highlight">Innovative and Curious:</span> An open mind, always looking for new solutions, excited about the surprise theme and its real potential.</li>
                        <li><span className="keyword-highlight">Good Stress Management:</span> The ability to maintain focus in the <span className="num-font">24</span> hours, with an intense but sustainable work style, avoiding burnout through strategic breaks.</li>
                        <li><span className="keyword-highlight">Collaborative and Empathetic:</span> An inclusive work style, which values the contributions of all team members, promoting the diversity of ideas.</li>
                        <li><span className="keyword-highlight">Meticulous and Detail-Oriented:</span> Attention to precision in design, essential for functional models, but balanced with flexibility for fast adjustments.</li>
                        <li><span className="keyword-highlight">Passionate and Intrinsically Motivated:</span> A clear passion for engineering and design, seeing the event as an opportunity for growth, not just competition.</li>
                    </ul>

                    <SectionHeading level={2} id="objectives"><span className="num-font">6</span>. Objectives and Motivations</SectionHeading>
                    <p>The ideal candidate is motivated by objectives aligned with the spirit of CAD<span className="brand-ampersand">&</span>CRAFT, turning participation into a transformative experience.</p>
                    <ul>
                        <li>To develop practical skills and test innovative ideas in a real context, aiming for solutions with impact (e.g. energy efficient robots for restrictive environments).</li>
                        <li>To build professional networks, collaborating with other enthusiasts and potential employers from engineering.</li>
                        <li>To win prizes, but primarily to learn from failures and successes, targeting careers in robotics, design or tech startups.</li>
                        <li><span className="keyword-highlight">Long-term objectives:</span> Contribution to sustainable innovations, inspired by the theme of the event.</li>
                    </ul>

                    <SectionHeading level={2} id="other"><span className="num-font">7</span>. Other Relevant Aspects</SectionHeading>
                    <ul>
                        <li><span className="keyword-highlight">Ethics and Responsibility:</span> Awareness of ethical aspects in engineering (e.g. safety in the final design of the robot), and commitment to sustainability (not only looking for a solution to the theme, but understanding the theme of the event in a deeper and complete way).</li>
                        <li><span className="keyword-highlight">Availability and Logistics:</span> Possession of a laptop or computer that can run a CAD program. *3D printer and filament of quality and performance considered by the candidate.</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HandbookProfile;
