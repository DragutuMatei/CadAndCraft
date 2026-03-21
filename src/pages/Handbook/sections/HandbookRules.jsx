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
                        <li>Sunt permise orice platforme de proiectare CAD, inclusiv Onshape, Fusion 360, SolidWorks, dar este încurajată folosirea platformei Onshape.</li>
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
                    
                    <p><strong>Proba Maraton</strong><br />
                    Proba de Maraton constă într-o confruntare directă între două sau mai multe echipe, în care proiectele realizate sunt testate în condiții identice.</p>

                    <p><strong>Obiectiv:</strong><br />
                    Proba practică va pune la încercare adaptabilitatea și eficiența roboților, prin <span className="num-font">3</span> trasee, cu scopul de a le parcurge în cel mai scurt timp posibil.</p>

                    <p><strong>Specificații ale proiectelor (robotul):</strong></p>
                    <ul>
                        <li>Lungime maximă admisă: <span className="num-font">160</span> mm;</li>
                        <li>Lățime maximă admisă: <span className="num-font">160</span> mm;</li>
                        <li>Înălțime maximă admisă: <span className="num-font">200</span> mm;</li>
                        <li>Robotul poate dispune de un mecanism de prindere, acționare, strângere etc. modificabil între probe prin acționarea unor componente mecanice. Se consideră acceptată orice metodă de modificare a robotului cu condiția ca structura sa inițială (design-ul final) să nu sufere schimbări (adăugarea sau eliminarea de componente);</li>
                        <li>Robotul trebuie să permită montarea și transportarea unei doze, în momentele indicate de către organizatori;</li>
                        <li>Încercările de îndeplinire a probelor nu trebuie să afecteze starea traseului. Prin aceasta se înțelege că pe timpul testării și a validării pe timpul probelor, contactul traseelor cu robotul să nu se soldeze cu deteriorarea componentelor din care sunt alcătuite traseele.</li>
                    </ul>

                    <p>❗ Este interzisă utilizarea altor componente electronice în alcătuirea roboților, în afara celor oferite de către organizatori! Se interzice utilizarea oricăror componente mecanice care nu sunt obținute prin fabricație aditivă în timpul competiției sau furnizate de organizatori.</p>
                    <p>Este permisă utilizarea componentelor proprii de legătură (șuruburi, șaibe, piulițe etc.) care nu facilitează mecanismul final de acționare.</p>

                    <p><strong>Specificații pentru obiectul transportat:</strong></p>
                    <ul>
                        <li>În timpul probelor care specifică acest aspect, roboții vor trebui să transporte o doză de <span className="num-font">250</span> ml.</li>
                        <li>Doza trebuie să fie sigilată și plină (nu se acceptă doze goale sau perforate);</li>
                        <li>Ansamblul robotului cu doza trebuie să se încadreze în dimensiunile de gabarit definite ca limite de dimensionare ale robotului în prezentul document;</li>
                        <li>Ansamblul robotului cu doza trebuie să se realizeze fără îndepărtarea sau adăugarea de componente;</li>
                        <li>Doza, din moment ce este atașată robotului, nu are voie să atingă componentele traseelor în mod direct sau solul;</li>
                    </ul>

                    <p><strong>Specificațiile traseelor și desfășurarea probelor:</strong><br />
                    Proba practică este alcătuită din <span className="num-font">3</span> (trei) trasee care trebuie parcurse de către fiecare robot:</p>

                    <p><strong>Traseul 1 (format din <span className="num-font">2</span> părți):</strong><br />
                    <strong>Prima parte:</strong> O scară de lungimea de <span className="num-font">220</span> mm care face trecerea de la sol la o sfoară orizontală. Scara presupune un număr de <span className="num-font">8</span> trepte cu diametru de <span className="num-font">10</span> mm, aflate la <span className="num-font">25</span> mm una de alta, paralele cu sfoara orizontală. Lățimea scării este de <span className="num-font">70</span> mm, iar aceasta se află în contact permanent cu solul. Parcurgerea scării se efectuează în mod obligatoriu fără doză, dar se acordă o bonificație echipei care reușește parcurgerea cu tot cu doză. Parcurgerea scării are loc dinspre sol către sfoară, sfoara fiind considerată a <span className="num-font">9</span>-a treaptă, de care robotul trebuie să se atașeze, moment în care această parte a traseului se consideră îndeplintă.</p>
                    <p>La finalizarea parcurgerii scării, echipele pot dispune robotul pe noua direcție de deplasare. Dacă aceștia doresc să reconfigureze robotul (fără a elimina sau a adăuga componente), vor fi depunctați. În eventualitatea în care robotul nu va necesita o reorientare a direcției de deplasare, echipa va primi puncte extra. Pentru partea a doua, robotul trebuie încărcat cu doza în mod obligatoriu. În acest moment, se poate începe parcurgerea părții secundare a traseului.</p>

                    <p><strong>A doua parte parte:</strong> Sfoara orizontală de care este atașată scara anterior descrisă, trebuie parcursă în direcția indicată de organizatori. Distanța care trebuie parcursă este de <span className="num-font">1500</span> mm, iar traseul se consideră îndeplinit prin parcurgerea acestei distanțe. Robotul trebuie să se afle permanent în contact cu sfoara.</p>
                    <p>După finalizarea primului traseu, echipa care tocmai a terminat va exclude doza din ansamblul robotului, va reconfigura robotul fără a adăuga sau a elimina componente și va dispune robotul la următorul traseu, într-o zonă indicată de organizatori. Se așteaptă încercarea primului traseu de către toate echipele, după care cele care au finalizat cu succes primul traseu, vor dispune robotul pe al doilea traseu în aceeași ordine a încercării primului.</p>
                    <p>Parcurgerea traseului următor este condiționat de îndeplinirea primului traseu, integral.</p>

                    <p><strong>Traseul 2:</strong><br />
                    O sfoară dispusă perpendicular cu solul, agățată, care trebuie parcursă pe înălțimea de <span className="num-font">1500</span> mm. Traseul începe de la punctul indicat de organizatori, poziția inițială a robotului fiind în contact cu sfoara. Se parcurge traseul de la sol în sus, astfel robotul ”se cațără”, fără doză. Traseul este finalizat la momentul atingerii înălțimii indicate, punct în care robotul trebuie să fie în reapus. Prin aceasta se înțelege că robotul rămâne agățat de sfoara verticală la finalul acestui traseu, reprezentând punctul de începere celui de-al treilea traseu. Pe tot parcursul acestui traseu, robotul trebuie să fie în contact permanent cu sfoara.</p>
                    <p>Finalizarea cu succes a treseului doi reprezintă condiția pentru încercarea traseului trei. Se respectă regula anterioară, prin care echipele dispun pe rând roboții pentru a încerca al treilea traseu, după care vor asambla doza, vor reconfigura robotul fără a adăuga sau a elimina componente și vor aștepta finalizarea acestui traseu de către toate echipele. Ordinea finalizării reprezintă ordinea începerii ultimului traseu.</p>

                    <p><strong>Traseul 3:</strong><br />
                    O sfoară verticală, aceeași ca la traseul numărul doi care trebuie parcursă în sens invers, adică de la punctul de finalizare al traseului anterior până la punctul de începere al traseului anterior, printr-o coborâre controlată, cu tot cu doza. Robotul trebuie să fie în contact permanent cu sfoara, iar finalizarea traseului este considerată validă dacă robotul coboară controlat, adică nu se poate interpreta drept cădere parcugerea acestui traseu.</p>

                    <ul>
                        <li>Toate sforile din componența traseelor vor avea material termocontractant pe suprafața lor;</li>
                        <li>Sforile au un diametru de <span className="num-font">10</span> mm;</li>
                        <li>Scara utlizată la primul traseu este din acid polilactic, fabricat aditiv, iar profilele treptelor sunt circulare pe o parte și paralelipipedice pe partea opusă;</li>
                        <li>Toate sforile care se vor afla în contact cu roboții vor fi tensionate prin noduri și șuruburi de tensionare astfel încât roboții să parcurgă un traseu cât mai rigid;</li>
                        <li>Este responsabilitatea fiecărei echipe ca în momentul testării roboților, în cazul în care prototipul eșuează, să nu se piardă progresul realizat până la acel punct.</li>
                    </ul>

                    <p><strong>Regulament privind incercarile:</strong></p>
                    <ul>
                        <li>Parcurgerea componentei secundare și traseele doi și trei sunt condiționate;</li>
                        <li>Echipele au trei încercări pentru fiecare traseu, în cazul în care îndeplinesc condițiile de parcurgere;</li>
                        <li>Jurizarea din punct de vedere al funcționalității are în vedere criteriul îndeplinirii traseelor, iar pentru ierarhizare timpul de parcurgere;</li>
                        <li>În timpul alocat fiecărui traseu, chiar dacă un robot parcurge traseul fără a necesita încercări ulterioare din cele trei, echipa se poate folosi de acele încercări pentru a obține, eventual, un timp mai bun;</li>
                        <li>Fiecare încercare va fi cronometrată de către un membru al organizării;</li>
                        <li>Se va lua în considerare timpul cel mai bun de parcurgere al traseelor</li>
                        <li>Pentru primul traseu, echipele dispun de <span className="num-font">3</span> minute (pentru întregul traseu) pentru a-l îndeplini;</li>
                        <li>Pentru cel de-al doilea și cel de-al treilea traseu, sunt dispuse câte un minut și <span className="num-font">30</span> de secunde pentru fiecare dintre cele două trasee;</li>
                        <li>Dacă durata maximă alocată traseului expiră în timpul unei parcurgeri, echipa pierde dreptul de a susține încercările rămase;</li>
                        <li>În cazul în care robotul unei echipe, într-una din cele trei încercări cu timp rămas pentru parcurgere, se defectează, timpul nu este oprit pentru ca echipa să remedieze problema apărută. Orice timp de mentenanță intervenit în timpul probei se include în timpul total alocat acelui traseu;</li>
                        <li>Repararea unei defecțiuni se poate realiza doar dacă configurația finală a robotului nu se modifică;</li>
                        <li>Jurații vor fi prezenți la fiecare dintre încercări pentru a evalua performanța;</li>
                        <li>Organizatorii au dreptul de a dispune orice metodă organizatorică pentru buna desfășurare a probelor;</li>
                        <li>Participanții sunt obligați să mențină o conduită decentă în timpul încercărilor proprii și a echipelor celelalte.</li>
                    </ul>
                </div>
            ) : (
                <div className="handbook-block">
                    <SectionHeading level={2} id="general-rules"><span className="num-font">4.1</span>. General <span className="keyword-highlight">Rules</span></SectionHeading>
                    <ul>
                        <li>Each team must design and build a <span className="keyword-highlight">functional product</span> according to the theme announced at the beginning of the competition.</li>
                        <li>Any CAD design platform is allowed, including Onshape, Fusion 360, and SolidWorks, but the use of <span className="keyword-highlight">Onshape</span> is encouraged.</li>
                        <li>Participants must adhere to fair-play rules and collaborate ethically.</li>
                        <li>Organizers will provide logistical support but will not intervene in the design or construction process.</li>
                        <li>The use of electrical components not included in the participation kit is strictly prohibited.</li>
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
                    <p>During the event, participants are encouraged to uphold a respectful and fair competition environment:</p>
                    <ul>
                        <li>Teams should demonstrate their skills ethically, respecting the competition rules and jury decisions.</li>
                        <li>The competition must be conducted fairly, without unfair practices or disrespect toward other participants.</li>
                        <li>Each team member has a responsibility to actively contribute to their team's collective effort.</li>
                        <li>Exclusion or marginalization of any participant based on any criteria is strictly discouraged.</li>
                        <li>Respecting the jury's decisions is mandatory and part of the competition spirit.</li>
                        <li>Any conflicts must be handled civilly; if necessary, organizers will intervene to ensure a proper resolution.</li>
                    </ul>

                    <SectionHeading level={2} id="competition-rules"><span className="num-font">4.3</span>. Competition Rules</SectionHeading>
                    
                    <p><strong>Marathon Challenge</strong><br />
                    The Marathon Challenge is a direct showdown between two or more teams, where their completed projects are tested under identical conditions.</p>

                    <p><strong>Objective</strong><br />
                    The practical test will challenge the robots’ adaptability and efficiency through three courses, with the goal of completing them in the shortest possible time.</p>

                    <p><strong>Project Specifications (Robot)</strong></p>
                    <ul>
                        <li>Maximum length: <span className="num-font">125</span> mm</li>
                        <li>Maximum width: <span className="num-font">125</span> mm</li>
                        <li>Maximum height: <span className="num-font">200</span> mm</li>
                        <li>The robot may include a gripping, actuating, or clamping mechanism that can be adjusted between trials by operating mechanical components. Any modification method is allowed, provided that the robot’s initial structure (final design) is not altered (no components may be added or removed).</li>
                        <li>The robot must be capable of mounting and transporting a can at moments specified by the organizers.</li>
                        <li>Attempts to complete the courses must not damage the track. This means that during testing and official runs, any contact between the robot and the track must not result in deterioration of the track components.</li>
                    </ul>

                    <p>❗ The use of any electronic components other than those provided by the organizers is strictly prohibited.<br />
                    The use of mechanical components not produced through additive manufacturing during the competition or supplied by the organizers is also prohibited.</p>
                    <p>Participants are allowed to use their own fastening components (screws, washers, nuts, etc.), as long as they do not contribute to the robot’s functional mechanism.</p>

                    <p><strong>Specifications for the Transported Object</strong></p>
                    <ul>
                        <li>During tasks that require it, robots must transport a <span className="num-font">250</span> ml can.</li>
                        <li>The can must be sealed and full (empty or punctured cans are not allowed).</li>
                        <li>The robot + can assembly must fit within the size constraints defined above.</li>
                        <li>The can must be attached without adding or removing components.</li>
                        <li>Once attached, the can must not directly touch the track components or the ground.</li>
                    </ul>

                    <p><strong>Course Specifications and Trial Structure</strong><br />
                    The practical test consists of three courses that each robot must complete:</p>

                    <p><strong>Course 1 (Two Parts)</strong><br />
                    <strong>Part 1:</strong> A ladder of length Y mm that transitions from the ground to a horizontal rope. The ladder has <span className="num-font">8</span> steps, each with a diameter of <span className="num-font">10</span> mm, spaced <span className="num-font">25</span> mm apart, and parallel to the horizontal rope. The ladder is <span className="num-font">70</span> mm wide and remains in constant contact with the ground.<br />
                    The ladder must be completed without the can; however, a bonus is awarded if a team completes it while carrying the can.<br />
                    The climb is performed from the ground upward, with the rope considered the <span className="num-font">9</span>th step. The robot must attach itself to the rope—at that point, this part is considered complete.</p>
                    <p>After finishing the ladder, teams may reposition the robot in the new direction of movement, reconfigure it (without adding or removing components), and must attach the can before starting the second part.</p>

                    <p><strong>Part 2:</strong> The horizontal rope attached to the ladder must be traversed in the direction specified by the organizers. Distance: X mm. The robot must remain in continuous contact with the rope. The course is completed once this distance is covered.</p>
                    <p>After completing Course 1, teams must remove the can, reconfigure the robot (without adding/removing components), and position it at the next course in a designated area. All teams must attempt Course 1 before moving on. Only those who successfully complete it may proceed to Course 2, in the same order.</p>

                    <p><strong>Course 2</strong><br />
                    A vertical rope suspended perpendicular to the ground must be climbed over a height of X mm.<br />
                    The robot starts at a position indicated by the organizers, already in contact with the rope.<br />
                    The robot climbs upward without the can.<br />
                    The course is completed when the required height is reached.<br />
                    At the end, the robot must remain attached to the rope—this becomes the starting point for Course 3.<br />
                    The robot must maintain continuous contact with the rope throughout.</p>

                    <p><strong>Course 3</strong><br />
                    The same vertical rope from Course 2 must now be traversed in reverse—from the previous endpoint back to the starting point—by a controlled descent, this time carrying the can.<br />
                    The robot must remain in continuous contact with the rope.<br />
                    The descent must be controlled (it must not simply fall).<br />
                    The course is considered complete only if the descent is clearly controlled.</p>

                    <p><strong>Additional Track Details</strong></p>
                    <ul>
                        <li>All ropes will be covered with heat-shrink material.</li>
                        <li>Rope diameter: <span className="num-font">10</span> mm.</li>
                        <li>The ladder is made of additively manufactured polylactic acid (PLA), with steps that are circular on one side and rectangular on the other.</li>
                        <li>All ropes will be properly tensioned to ensure rigidity.</li>
                        <li>Each team is responsible for ensuring that, during testing, any failure of their prototype does not result in losing previously achieved progress.</li>
                    </ul>

                    <p><strong>Attempt Rules</strong></p>
                    <ul>
                        <li>The second part of Course 1, as well as Courses 2 and 3, are conditional upon completing the previous stages.</li>
                        <li>Each team has three attempts per course (if progression conditions are met).</li>
                        <li>Evaluation is based on course completion, with ranking determined by completion time.</li>
                        <li>Even if a robot completes a course in one attempt, remaining attempts may be used to improve the time.</li>
                        <li>Each attempt is timed by an organizer.</li>
                        <li>The best completion time will be considered.</li>
                        <li>Time limit for Course 1: <span className="num-font">3</span> minutes (total).</li>
                        <li>Time limit for Courses 2 and 3: 1 minute <span className="num-font">30</span> seconds each.</li>
                        <li>If the time limit expires during an attempt, the team loses any remaining attempts.</li>
                        <li>If a robot malfunctions during an attempt, the timer will not be stopped. Any repair time counts toward the total allotted time.</li>
                        <li>Repairs are allowed only if the robot’s final configuration remains unchanged.</li>
                        <li>Judges will be present during all attempts.</li>
                        <li>Organizers reserve the right to implement any necessary measures to ensure the smooth running of the competition.</li>
                        <li>Participants are required to maintain proper conduct during both their own attempts and those of other teams.</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HandbookRules;
