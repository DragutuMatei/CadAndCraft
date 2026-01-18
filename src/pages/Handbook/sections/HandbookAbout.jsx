import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './HandbookSections.scss';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const HandbookAbout = () => {
    const { language } = useOutletContext();

    return (
        <div className="handbook-section">
            <SectionHeading level={1} id="about">{language === 'RO' ? <><span className="num-font">1</span>. About CAD<span className="brand-ampersand">&</span>Craft</> : <><span className="num-font">1</span>. About CAD<span className="brand-ampersand">&</span>Craft</>}</SectionHeading>

            {language === 'RO' ? (
                <>
                    <div className="handbook-block">
                        <SectionHeading level={2} id="what-is"><span className="num-font">1.1</span> Ce este <span className="keyword-highlight">CAD<span className="brand-ampersand">&</span>Craft</span>?</SectionHeading>
                        <p>
                            <span className="keyword-highlight">CAD<span className="brand-ampersand">&</span>Craft</span> este un eveniment de tip <span className="keyword-highlight">CADATHON</span>, inspirat de formatul Hackathon-urilor, care se concentrează pe aplicarea cunoștințelor de proiectare pentru a rezolva o temă prestabilită. Participanții sunt provocați să își folosească creativitatea în proiectare asistată pe calculator pentru a dezvolta soluții inovative și eficiente, într-un cadru colaborativ și competitiv.
                        </p>
                        <p>
                            Evenimentul, ce implică o competiție intensă, invită studenții pasionați de inginerie și proiectare asistată de calculator să colaboreze și să își dezvolte abilitățile practice în modelarea 3D a unei piese folosind platforma <span className="keyword-highlight">Onshape</span> sau alt software CAD.
                        </p>
                        <p>
                            Participanții își pot pune la încercare cunoștințele tehnice în cadrul unei provocări captivante ce presupune transformarea ideilor în realitate. Concurenții vor fi împărțiți în echipe, în cadrul unui maraton de <span className="keyword-highlight"><span className="num-font">24</span> de ore</span>.
                        </p>
                        <p>
                            Tema proiectului va fi dezvăluită la începutul evenimentului, asigurând astfel o provocare echitabilă pentru toți participanții și stimulându-le capacitatea de adaptare și găsirea unor soluții îndrăznețe.
                        </p>
                    </div>

                    <div className="handbook-block">
                        <SectionHeading level={2} id="objectives"><span className="num-font">1.2</span> <span className="keyword-highlight">OBIECTIVE</span>:</SectionHeading>
                        <ul>
                            <li>Rezultatul final să fie un <span className="keyword-highlight">produs finit și funcțional</span>;</li>
                            <li>Îmbunătățirea modului de colaborare între membrii echipei, pentru finalizarea temei propuse;</li>
                            <li>Oportunitatea de a cunoaște alți profesioniști din industrie;</li>
                            <li>Găsirea unor soluții inovative pentru a dezvolta un prototip funcțional;</li>
                            <li>Dezvoltarea abilităților de proiectare asistată pe calculator cu ajutorul platformei <span className="keyword-highlight">Onshape</span> și nu numai.</li>
                        </ul>
                        <p>
                            CAD<span className="brand-ampersand">&</span>Craft a pornit de la ideea de a lansa o provocare către studenții și elevii ce dispun de cunoștințe în concepte de <span className="keyword-highlight">CAD, CAE, CAM</span>. Acest eveniment reprezintă oportunitatea de a aplica aceste cunoștințe practic pentru a crea un produs funcțional.
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="handbook-block">
                        <SectionHeading level={2} id="what-is"><span className="num-font">1.1</span> What is <span className="keyword-highlight">CAD<span className="brand-ampersand">&</span>Craft</span>?</SectionHeading>
                        <p>
                            <span className="keyword-highlight">CAD<span className="brand-ampersand">&</span>Craft</span> is a <span className="keyword-highlight">CADATHON</span> event, inspired by the Hackathon format, focusing on applying design knowledge to solve a predefined challenge. Participants are encouraged to use their creativity in computer-aided design (CAD) to develop innovative and efficient solutions in a collaborative and competitive environment.
                        </p>
                        <p>
                            This high-intensity competition invites students passionate about engineering and CAD to collaborate and enhance their practical skills in 3D modeling using <span className="keyword-highlight">Onshape</span> or other CAD software.
                        </p>
                        <p>
                            Participants will test their technical knowledge in an exciting challenge that involves turning ideas into reality. Competitors will be divided into teams for a <span className="keyword-highlight"><span className="num-font">24</span>-hour marathon</span>.
                        </p>
                        <p>
                            The project theme will be revealed at the start of the event, ensuring a fair challenge for all participants while stimulating their adaptability and bold problem-solving skills.
                        </p>
                    </div>

                    <div className="handbook-block">
                        <SectionHeading level={2} id="objectives"><span className="num-font">1.2</span> <span className="keyword-highlight">OBJECTIVES</span>:</SectionHeading>
                        <ul>
                            <li>The final result should be a <span className="keyword-highlight">finished and functional product</span>;</li>
                            <li>Improve collaboration among team members to complete the given challenge;</li>
                            <li>Provide an opportunity to meet other industry professionals;</li>
                            <li>Find innovative solutions to develop a functional prototype;</li>
                            <li>Develop CAD design skills using <span className="keyword-highlight">Onshape</span> and other software.</li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default HandbookAbout;
