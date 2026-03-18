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

                    <SectionHeading level={2} id="competition-rules"><span className="num-font">4.3</span>. Regulile din timpul competiției</SectionHeading>
                    <SectionHeading level={3} id="marathon-challenge">Proba Maraton</SectionHeading>
                    <p>Proba de Maraton constă într-o confruntare directă între două sau mai multe echipe, în care proiectele realizate sunt testate în condiții identice.</p>

                    <p><strong>Obiectiv:</strong></p>
                    <p>Robotul fiecărei echipe trebuie să transporte un recipient plin (doză sau cutie de suc) de-a lungul sforii, în direcția de deplasare stabilită, pe toate cele 3 trasee evaluate, în cel mai scurt timp posibil.</p>

                    <p><strong>Ce înseamnă “sensul de parcurgere al traseului”?</strong></p>
                    <p>Sensul de parcurgere al traseului reprezintă direcția obligatorie de deplasare pe sfoară; este unică și este indicată de punctul de “Start” și cel de “Finish”.</p>

                    <p><strong>Specificatii ale traseelor:</strong></p>
                    <ul>
                        <li>Proba practică este alcătuită din 3 (trei) trasee care trebuie parcurse de către fiecare robot:</li>
                        <li>Traseu 1:
                            <ul>
                                <li>Dispus paralel cu solul;</li>
                                <li>Distanța totală a sforii: 2000 mm;</li>
                                <li>Distanța utilă (de parcurs): 1500 mm (delimitată de marcajele de start și finish);</li>
                                <li>Înălțimea de amplasare a sforii față de sol: 600 mm.</li>
                            </ul>
                        </li>
                        <li>Traseu 2:
                            <ul>
                                <li>Înclinat la un unghi de aproximativ 25 de grade față de sol;</li>
                                <li>Distanța totală a sforii: 2000 mm;</li>
                                <li>Distanța utilă (de parcurs): 1500 mm (delimitată de marcajele de start și finish);</li>
                                <li>Înalțimea punctului de plecare raportat la sol: 400 mm;</li>
                                <li>Înalțimea punctului final raportat la sol: 1200 mm;</li>
                            </ul>
                        </li>
                    </ul>

                    <ul>
                        <li>Pentru evaluarea performanței fiecărui robot, pe lângă notarea juraților, se adoptă și un sistem de punctare obiectiv:
                            <ul>
                                <li>Toate traseele vor fi marcate la fiecare 300 mm cu un punct de control (checkpoint), reprezentat de un tub termocontractabil colorat, ultimul reprezentând chiar marcajul de sosire (finish);</li>
                                <li>Pentru fiecare punct de control atins de robot, echipei i se va acorda un punct;</li>
                                <li>Pentru punctajul pe distanță, se va lua în considerare cea mai mare distanță parcursă de robot pe fiecare traseu;</li>
                                <li>La fiecare încercare, pe oricare dintre trasee, roboții vor fi cronometrați;</li>
                                <li>În urma executării probei practice de către toate echipele, primilor trei roboți care au parcurs cea mai mare distanță în cel mai scurt timp li se vor acorda puncte de viteză astfel: 3 puncte pentru cel mai rapid, 2 puncte pentru al doilea și 1 punct pentru al treilea;</li>
                                <li>Punctele acordate pentru viteză vor fi distribuite separat pentru echipele din mediul preuniversitar și cele din mediul universitar, la fiecare traseu în parte;</li>
                            </ul>
                        </li>
                    </ul>

                    <p><strong>Terminologie:</strong></p>
                    <p>Pentru o bună înțelegere a punctelor ce urmează, se vor lua în considerare următoarele definiții:</p>
                    <ul>
                        <li>Axa longitudinală a robotului este axa paralelă cu direcția de deplasare (sensul de parcurgere a traseului);</li>
                        <li>Axa transversală a robotului este axa perpendiculară pe direcția de deplasare și paralelă cu solul;</li>
                        <li>Axa verticală a robotului este axa perpendiculară pe planul format de axa longitudinală și axa transversală;</li>
                    </ul>

                    <p><strong>Specificații ale proiectelor:</strong></p>
                    <ul>
                        <li>Dimensiunea maximă admisă pe axa longitudinală: 125 mm;</li>
                        <li>Dimensiunea maximă admisă pe axa transversală: 125 mm;</li>
                        <li>Dimensiunea maximă admisă pe axa verticală: 200 mm;</li>
                        <li>Robotul nu are voie să deterioreze traseul în timpul probelor/testelor;</li>
                        <li>Robotul trebuie să se afle permanent în contact cu sfoara traseului, în cel puțin un punct;</li>
                        <li>Robotul poate avea maxim 5 puncte de contact simultane cu sfoara;</li>
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

                    <SectionHeading level={2} id="competition-rules"><span className="num-font">4.3</span>. Competition Rules</SectionHeading>
                    <SectionHeading level={3} id="marathon-challenge">Marathon Challenge</SectionHeading>
                    <p>The Marathon Challenge is a direct showdown between two or more teams, where their completed projects are tested under identical conditions.</p>

                    <p><strong>Objective:</strong></p>
                    <p>Each team's robot must transport a full container (can or juice box) along the string, in the designated direction, across all 3 evaluated courses, in the shortest possible time.</p>

                    <p><strong>What does “course direction” mean?</strong></p>
                    <p>The course direction is the mandatory direction of travel on the string; it is strictly defined and indicated by the “Start” and “Finish” points.</p>

                    <p><strong>Course Specifications:</strong></p>
                    <ul>
                        <li>The practical challenge consists of 3 (three) courses that each robot must complete:</li>
                        <li>Course 1:
                            <ul>
                                <li>Positioned parallel to the ground;</li>
                                <li>Total string distance: 2000 mm;</li>
                                <li>Usable distance (to be traveled): 1500 mm (defined by the start and finish markers);</li>
                                <li>Height of the string from the ground: 600 mm.</li>
                            </ul>
                        </li>
                        <li>Course 2:
                            <ul>
                                <li>Inclined at an angle of approximately 25 degrees to the ground;</li>
                                <li>Total string distance: 2000 mm;</li>
                                <li>Usable distance (to be traveled): 1500 mm (defined by the start and finish markers);</li>
                                <li>Height of the starting point relative to the ground: 400 mm;</li>
                                <li>Height of the finish point relative to the ground: 1200 mm;</li>
                            </ul>
                        </li>
                    </ul>

                    <ul>
                        <li>To evaluate each robot's performance, in addition to jury scoring, an objective point system is adopted:
                            <ul>
                                <li>All courses will be marked every 300 mm with a checkpoint, represented by a colored heat-shrink tube, the last one being the finish marker;</li>
                                <li>For every checkpoint the robot reaches, the team will be awarded one point;</li>
                                <li>For distance scoring, the maximum distance traveled by the robot on each course will be considered;</li>
                                <li>On each attempt, on any of the courses, the robots will be timed;</li>
                                <li>Following the execution of the practical challenge by all teams, the top three robots covering the greatest distance in the shortest time will be awarded speed points as follows: 3 points for the fastest, 2 points for the second, and 1 point for the third;</li>
                                <li>The points awarded for speed will be distributed separately for pre-university and university teams, for each individual course;</li>
                            </ul>
                        </li>
                    </ul>

                    <p><strong>Terminology:</strong></p>
                    <p>For a clear understanding of the following points, the following definitions apply:</p>
                    <ul>
                        <li>The longitudinal axis of the robot is the axis parallel to the direction of travel (course direction);</li>
                        <li>The transverse axis of the robot is the axis perpendicular to the direction of travel and parallel to the ground;</li>
                        <li>The vertical axis of the robot is the axis perpendicular to the plane formed by the longitudinal and transverse axes;</li>
                    </ul>

                    <p><strong>Project Specifications:</strong></p>
                    <ul>
                        <li>Maximum allowed dimension on the longitudinal axis: 125 mm;</li>
                        <li>Maximum allowed dimension on the transverse axis: 125 mm;</li>
                        <li>Maximum allowed dimension on the vertical axis: 200 mm;</li>
                        <li>The robot is not allowed to damage the course during trials/tests;</li>
                        <li>The robot must remain in permanent contact with the course string at one point minimum;</li>
                        <li>The robot may have a maximum of 5 simultaneous contact points with the string;</li>
                    </ul>

                    <p>❗ The use of electronic components other than those provided by the organizers is prohibited!</p>
                </div>
            )}
        </div>
    );
};

export default HandbookRules;
