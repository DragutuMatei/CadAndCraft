import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './HandbookSections.scss';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const HandbookAwards = () => {
    const { language } = useOutletContext();

    return (
        <div className="handbook-section">
            <SectionHeading level={1} id="awards">{language === 'RO' ? <><span className="num-font">5</span>. Premii</> : <><span className="num-font">5</span>. Awards</>}</SectionHeading>

            {language === 'RO' ? (
                <div className="handbook-block">
                    <SectionHeading level={2} id="university-awards"><span className="num-font">5.1</span> Pentru echipele din cadrul <span className="keyword-highlight">universitar</span>:</SectionHeading>
                    <p>
                        Premiile CAD<span className="brand-ampersand">&</span>CRAFT sunt destinate să recunoască și să răsplătească excelența în domeniul designului, al impactului și al promovării în cadrul comunității STEAM. În cadrul concursului, vor fi acordate distincții pentru următoarele categorii:
                    </p>

                    <SectionHeading level={3} id="design-award">Premiul pentru <span className="keyword-highlight">Design</span>, Powered by PTC</SectionHeading>
                    <ul>
                        <li><strong>Eficiență:</strong> Premiul va fi acordat echipei care demonstrează un design funcțional;</li>
                        <li><strong>Originalitate și inovație:</strong> Se apreciază ideile creative și sustenabile;</li>
                        <li><strong>Aspect:</strong> Se apreciază estetica vizuală, coerența designului și utilizarea inteligentă a resurselor disponibile;</li>
                        <li><strong>Proiectul trebuie realizat folosind Onshape.</strong></li>
                    </ul>

                    <SectionHeading level={3} id="impact-award">Premiul pentru <span className="keyword-highlight">Impact</span></SectionHeading>
                    <ul>
                        <li><strong>Prezentare:</strong> Se urmărește o prezentare care sa evidentieze implicarea întregii echipe în procesul de dezvoltare a proiectului.</li>
                        <li><strong>Pașii de dezvoltare:</strong> Este apreciată descrierea pașilor de dezvoltare și lucru utilizați în dezvoltare.</li>
                        <li><strong>Atractivitate:</strong> Utilizarea elementelor atractive de prezentare, precum un video sau alte materiale media reprezinta un bonus.</li>
                    </ul>

                    <SectionHeading level={2} id="high-school-awards"><span className="num-font">5.2</span> Pentru echipele din cadrul <span className="keyword-highlight">Preuniversitar</span>:</SectionHeading>
                    <p>
                        Premiul I, Premiul II și Premiul III vor fi atribuite în funcție de o serie de criterii specifice:
                    </p>
                    <ul>
                        <li><strong>Design:</strong> Unde se încurajează un echilibru între funcționalitate, estetică și eficiență. Un design simplu și bine gândit aduce un avantaj.</li>
                        <li><strong>Inovație:</strong> Se punctează mecanismele originale și soluțiile creative care îmbunătățesc performanța robotului.</li>
                        <li><strong>Prezentarea:</strong> Se apreciază explicațiile clare despre procesul de dezvoltare, provocările întâmpinate și soluțiile implementate.</li>
                    </ul>
                </div>
            ) : (
                <div className="handbook-block">
                    <SectionHeading level={2} id="university-awards"><span className="num-font">5.1</span> For <span className="keyword-highlight">University</span> Teams:</SectionHeading>
                    <p>
                        The CAD<span className="brand-ampersand">&</span>CRAFT awards are designed to recognize and reward excellence in design, impact, and community engagement within the STEAM field. The competition will grant distinctions in the following categories:
                    </p>

                    <SectionHeading level={3} id="design-award"><span className="keyword-highlight">Design</span> Award, Powered by PTC</SectionHeading>
                    <ul>
                        <li><strong>Efficiency:</strong> Awarded to the team that demonstrates a functional design.</li>
                        <li><strong>Originality and Innovation:</strong> Creative and sustainable ideas will be valued.</li>
                        <li><strong>Aesthetics:</strong> The visual appeal, design coherence, and intelligent use of available resources will be assessed.</li>
                        <li><strong>Requirement:</strong> The project must be created using Onshape.</li>
                    </ul>

                    <SectionHeading level={2} id="high-school-awards"><span className="num-font">5.2</span> For High School Teams: TBA</SectionHeading>
                    <p>
                        Awards for high school teams will be announced in a later version of this document, depending on the competition's progress and details. Stay tuned for official announcements regarding evaluation criteria and specific awards for this category.
                    </p>
                </div>
            )}
        </div>
    );
};

export default HandbookAwards;
