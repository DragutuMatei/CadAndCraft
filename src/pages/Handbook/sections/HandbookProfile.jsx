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
                        Candidatul ideal posedă competențe solide în domenii tehnice esențiale pentru tema evenimentului, care implică proiectarea și implementarea unui sistem mecanic inovator. Aceste abilități asigură capacitatea de a transforma idei abstracte în modele funcționale, respectând constrângerile temei.
                    </p>
                    <ul>
                        <li><span className="keyword-highlight">Expertiză în CAD:</span> Cunoștințe în software de proiectare 3D. Abilitatea de a crea modele precise, cu simulări de mișcare și analize structurale, adaptate la soluții creative precum mecanisme bazate pe gravitație, fricțiune sau propulsie pasivă.</li>
                        <li><span className="keyword-highlight">Imprimare 3D și Prototipare:</span> Cunoștințe de bază în pregătirea fișierelor pentru imprimare 3D (ex. STL, slicing cu Cura/PrusaSlicer), familiarizare cu materiale comune (PLA, ABS) și optimizarea designului pentru rezistență și greutate.</li>
                        <li><span className="keyword-highlight">Robotică și Mecanică:</span> Cunoștințe în principii de mecanică (fricțiune, echilibru, forțe), electronică de bază. Abilitatea de a aborda tema în moduri variate.</li>
                        <li><span className="keyword-highlight">Simulare:</span> Competențe în simulări rapide și electronică de bază, asigurând eficiența în cele <span className="num-font">24</span> de ore.</li>
                        <li><span className="keyword-highlight">Alte Aspecte Tehnice:</span> Cunoștințe teoretice moderate despre ciclul complet de producție (de la concept la testare) pentru depanare și optimizare.</li>
                    </ul>

                    <SectionHeading level={2} id="soft-skills"><span className="num-font">2</span>. Soft Skills (Abilități Interpersonale)</SectionHeading>
                    <p>
                        Evenimentul fiind bazat pe echipe și colaborare, candidatul ideal excelează în interacțiuni care facilitează munca în echipă sub presiune.
                    </p>
                    <ul>
                        <li><span className="keyword-highlight">Lucru în Echipă:</span> Capacitatea de a contribui constructiv în echipe mixte, împărțind sarcini eficient și rezolvând conflicte rapid.</li>
                        <li><span className="keyword-highlight">Comunicare Eficientă:</span> Abilitatea de a explica idei tehnice clar, verbal sau prin documentație.</li>
                        <li><span className="keyword-highlight">Managementul Timpului:</span> Prioritizarea sarcinilor sub constrângeri de timp, adaptându-se la tema surpriză.</li>
                        <li><span className="keyword-highlight">Rezolvarea Problemelor:</span> Gândire critică pentru a depăși obstacole neașteptate (limitări materiale, erori de proiectare).</li>
                        <li><span className="keyword-highlight">Creativitate și Inovație:</span> Gândire "out-of-the-box", explorând abordări diverse (ex. bio-inspirație).</li>
                    </ul>

                    <SectionHeading level={2} id="relevant-experience"><span className="num-font">3</span>. Experiență Relevantă</SectionHeading>
                    <ul>
                        <li>Participare anterioară la <span className="keyword-highlight">CADathon-uri</span> sau concursuri de robotică.</li>
                        <li>Proiecte personale/academice (roboți simpli, modele 3D).</li>
                        <li>Experiență în proiectare sau voluntariat în proiecte open-source.</li>
                        <li>Portofoliu demonstrabil (Thingiverse, GitHub, GrabCAD).</li>
                    </ul>

                    <SectionHeading level={2} id="education"><span className="num-font">4</span>. Nivel de Educație și Calificări</SectionHeading>
                    <ul>
                        <li>*Studenți din mecanică, mecatronică, robotică, inginerie industrială sau elevi cu specializare tehnică.</li>
                        <li>*Certificări relevante (ex. Autodesk Certified User, Onshape Associate).</li>
                        <li>*Cursuri online completate (Coursera, edX) în robotică sau inginerie.</li>
                    </ul>

                    <SectionHeading level={2} id="personality"><span className="num-font">5</span>. Trăsături de Personalitate</SectionHeading>
                    <ul>
                        <li><strong>Inovator și Curios:</strong> Mereu în căutare de soluții noi.</li>
                        <li><strong>Gestionare bună a Stresului:</strong> Focus susținut în cele <span className="num-font">24</span> de ore.</li>
                        <li><strong>Colaborativ și Empatic:</strong> Valorizează contribuțiile echipei.</li>
                        <li><strong>Meticulos:</strong> Atenție la precizie, echilibrată cu flexibilitate.</li>
                        <li><strong>Pasionat:</strong> Motivație intrinsecă pentru inginerie.</li>
                    </ul>

                    <SectionHeading level={2} id="objectives"><span className="num-font">6</span>. Obiective și Motivații</SectionHeading>
                    <ul>
                        <li>Dezvoltarea abilităților practice și testarea ideilor inovatoare.</li>
                        <li>Construirea de rețele profesionale.</li>
                        <li>Învățare din eșecuri și succese, țintind cariere în domeniu.</li>
                        <li><strong>Obiectiv pe termen lung:</strong> Contribuție la inovații sustenabile.</li>
                    </ul>

                    <SectionHeading level={2} id="other"><span className="num-font">7</span>. Alte Aspecte</SectionHeading>
                    <p>Etică și responsabilitate în inginerie. Disponibilitate logistică (laptop capabil CAD).</p>
                </div>
            ) : (
                <div className="handbook-block">
                    <p className="intro">
                        *-skills or useful aspects to have, but not mandatory for satisfactory performance at CAD<span className="brand-ampersand">&</span>CRAFT.
                    </p>

                    <SectionHeading level={2} id="hard-skills"><span className="num-font">1</span>. Hard Skills (Technical Skills)</SectionHeading>
                    <p>
                        The ideal candidate possesses solid skills in technical areas essential to the event theme, involving the design and implementation of an innovative mechanical system.
                    </p>
                    <ul>
                        <li><span className="keyword-highlight">CAD Expertise:</span> Knowledge of 3D design software. Ability to create precise models with motion simulations and structural analysis.</li>
                        <li><span className="keyword-highlight">3D Printing & Prototyping:</span> Basic knowledge of preparing files for 3D printing (STL, slicing), familiarity with common materials (PLA, ABS), and design optimization.</li>
                        <li><span className="keyword-highlight">Robotics & Mechanics:</span> Mechanics principles (friction, balance, forces), basic electronics. Ability to approach the theme in varied ways.</li>
                        <li><span className="keyword-highlight">Simulation:</span> Rapid simulation skills, basic electronics ensuring efficiency within the <span className="num-font">24</span> hours.</li>
                    </ul>

                    <SectionHeading level={2} id="soft-skills"><span className="num-font">2</span>. Soft Skills (Interpersonal Skills)</SectionHeading>
                    <ul>
                        <li><span className="keyword-highlight">Teamwork:</span> Ability to contribute constructively in mixed teams, sharing tasks efficiently.</li>
                        <li><span className="keyword-highlight">Effective Communication:</span> Explaining technical ideas clearly.</li>
                        <li><span className="keyword-highlight">Time Management:</span> Prioritizing tasks under time constraints.</li>
                        <li><span className="keyword-highlight">Problem Solving:</span> Critical thinking to overcome unexpected obstacles.</li>
                        <li><span className="keyword-highlight">Creativity & Innovation:</span> "Out-of-the-box" thinking.</li>
                    </ul>

                    <SectionHeading level={2} id="relevant-experience"><span className="num-font">3</span>. Relevant Experience</SectionHeading>
                    <ul>
                        <li>Previous participation in <span className="keyword-highlight">CADathons</span> or robotics competitions.</li>
                        <li>Personal/academic projects (simple robots, 3D models).</li>
                        <li>Design experience or volunteering in open-source projects.</li>
                        <li>Demonstrable portfolio (Thingiverse, GitHub, GrabCAD).</li>
                    </ul>

                    <SectionHeading level={2} id="education"><span className="num-font">4</span>. Education Level</SectionHeading>
                    <ul>
                        <li>*Students in mechanics, mechatronics, robotics, industrial engineering, or high school students with technical specialization.</li>
                        <li>*Relevant certifications (Autodesk, Onshape).</li>
                        <li>*Online courses (Coursera, edX).</li>
                    </ul>

                    <SectionHeading level={2} id="personality"><span className="num-font">5</span>. Personality Traits</SectionHeading>
                    <ul>
                        <li><strong>Innovative & Curious</strong></li>
                        <li><strong>Stress Management</strong></li>
                        <li><strong>Collaborative & Empathetic</strong></li>
                        <li><strong>Meticulous</strong></li>
                        <li><strong>Passionate</strong></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HandbookProfile;
