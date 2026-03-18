import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './HandbookSections.scss';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const HandbookRules = () => {
    const { language } = useOutletContext();

    return (
        <div className="handbook-section">
            <SectionHeading level={1} id="rules">{language === 'RO' ? <><span className="num-font">4</span>. Regulament CAD<span className="brand-ampersand">&</span>Craft</> : <><span className="num-font">4</span>. Rules CAD<span className="brand-ampersand">&</span>Craft</>}</SectionHeading>

            {language === 'RO' ? (
                <div className="handbook-block">
                    <SectionHeading level={2} id="general-rules"><span className="num-font">4.1</span>. Reguli <span className="keyword-highlight">Generale</span></SectionHeading>
                    <ul>
                        <li>Fiecare echipă trebuie să proiecteze și să construiască un <span className="keyword-highlight">produs funcțional</span> conform temei anunțate la începutul competiției.</li>
                        <li>Sunt permise orice platforme de proiectare CAD, inclusiv Onshape, Fusion 360, SolidWorks, dar este încurajată folosirea platformei <span className="keyword-highlight">Onshape</span>.</li>
                        <li>Participanții trebuie să respecte regulile de fair-play și să colaboreze în mod etic.</li>
                        <li>Organizatorii vor oferi suport logistic, dar nu vor interveni în procesul de proiectare sau construcție.</li>
                        <li>Este interzisă utilizarea altor componente electrice ce nu se află în kitul de participare.</li>
                        <li>Echipele trebuie să finalizeze proiectele în intervalul de timp stabilit.</li>
                        <li>Orice formă de sabotaj asupra echipelor concurente sau a echipamentelor este strict interzisă.</li>
                        <li>Fiecare echipă este responsabilă de siguranța și buna funcționare a propriului echipament.</li>
                        <li>Comunicarea și colaborarea între echipe sunt permise, dar fiecare echipă trebuie să realizeze un proiect propriu.</li>
                    </ul>

                    <SectionHeading level={3} id="team-completion"><span className="num-font">4.1.1</span>. Înscrieri individuale și completarea echipelor:</SectionHeading>
                    <ul>
                        <li>Deși echipele sunt formate ideal din <span className="num-font">3</span> participanți, se acceptă și înscrieri individuale sau cu un număr mai mic de membri.</li>
                        <li>Participanții înscriși în echipe ”incomplete” vor fi alocați altor echipe pentru a asigura completarea acestora și pentru a maximiza numărul de echipe participante.</li>
                    </ul>

                    <SectionHeading level={2} id="ethics"><span className="num-font">4.2</span>. Etică și Respect în Competiție</SectionHeading>
                    <p>În cadrul evenimentului, participanții sunt încurajați să adopte un comportament care promovează respectul reciproc:</p>
                    <ul>
                        <li>Echipele sunt încurajate să își demonstreze abilitățile într-un mod etic, respectând regulile competiției și deciziile juriului.</li>
                        <li>Competiția trebuie să se desfășoare într-un cadru fair-play, fără practici incorecte, sau lipsă de respect față de ceilalți participanți.</li>
                        <li>Fiecare membru al echipei are responsabilitatea de a contribui activ la efortul colectiv al echipei sale.</li>
                        <li>Excluderea sau marginalizarea unui participant pe orice criteriu este strict descurajată.</li>
                        <li>Respectarea deciziilor juriului este obligatorie și face parte din spiritul competiției.</li>
                        <li>Orice conflict trebuie gestionat în mod civilizat, iar în caz de necesitate, organizatorii vor interveni pentru a asigura o soluționare adecvată.</li>
                    </ul>
 
                  
                    <p>❗ Este interzisă utilizarea altor componente electronice în afara celor oferite de către organizatori!</p>
                </div>
            ) : (
                <div className="handbook-block">
                    <SectionHeading level={2} id="general-rules"><span className="num-font">4.1</span>. General <span className="keyword-highlight">Rules</span></SectionHeading>
                    <ul>
                        <li>Each team must design and build a <span className="keyword-highlight">functional product</span> according to the theme announced at the beginning of the competition.</li>
                        <li>Any CAD design platform is allowed, including Onshape, Fusion 360, and SolidWorks, but the use of <span className="keyword-highlight">Onshape</span> is encouraged.</li>
                        <li>Participants must adhere to fair-play rules and collaborate ethically.</li>
                        <li>Organizers will provide logistical support but will not intervene in the design or construction process.</li>
                        <li>The use of electrical components not included in the participation kit is <span className="keyword-highlight">strictly prohibited</span>.</li>
                        <li>Teams must complete their projects within the allotted time frame.</li>
                        <li>Any form of sabotage against competing teams or equipment is strictly forbidden.</li>
                        <li>Each team is responsible for the safety and proper functioning of its own equipment.</li>
                        <li>Communication and collaboration between teams are allowed, but each team must develop its own project.</li>
                    </ul>

                    <SectionHeading level={3} id="team-completion"><span className="num-font">4.1.1</span>. Individual Registrations and Team Completion</SectionHeading>
                    <ul>
                        <li>Although teams are ideally composed of three participants, individual or smaller-team registrations are accepted.</li>
                        <li>Participants in “incomplete” teams will be allocated to other teams to ensure full participation and maximize the number of competing teams.</li>
                    </ul>

                    <SectionHeading level={2} id="ethics"><span className="num-font">4.2</span>. <span className="keyword-highlight">Ethics and Respect</span> in Competition</SectionHeading>
                    <p>During the event, participants are encouraged to adopt behavior that promotes mutual respect:</p>
                    <ul>
                        <li>Teams should demonstrate their skills ethically, respecting the competition rules and jury decisions.</li>
                        <li>The competition must be conducted fairly, without unfair practices or disrespect toward other participants.</li>
                        <li>Each team member has a responsibility to actively contribute to their team's collective effort.</li>
                        <li>Exclusion or marginalization of any participant based on any criteria is strictly discouraged.</li>
                        <li>Respecting the jury's decisions is mandatory and part of the competition spirit.</li>
                        <li>Any conflict must be handled in a civilized manner, and if necessary, the organizers will intervene to ensure an appropriate resolution.</li>
                    </ul>

                  
                    <p>❗ The use of electronic components other than those provided by the organizers is prohibited!</p>
                </div>
            )}
        </div>
    );
};

export default HandbookRules;
