import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './HandbookSections.scss';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const HandbookFormat = () => {
    const { language } = useOutletContext();

    return (
        <div className="handbook-section">
            <SectionHeading level={1} id="format">{language === 'RO' ? <><span className="num-font">3</span>. Formatul Evenimentului <span className="brand-ampersand">&</span> Event Flow</> : <><span className="num-font">3</span>. Event Flow <span className="brand-ampersand">&</span> Guidelines</>}</SectionHeading>

            {language === 'RO' ? (
                <div className="handbook-block">
                    <SectionHeading level={2} id="guidelines">Formatul Evenimentului <span className="keyword-highlight">CAD<span className="brand-ampersand">&</span>Craft</span></SectionHeading>
                    <ul>
                        <li><strong>Check-in-ul echipelor:</strong> Fiecare echipă trebuie să efectueze check-in-ul la sosire.</li>
                        <li><strong>Conferința de deschidere:</strong> După check-in, participanții vor lua parte la conferința de deschidere, unde va fi prezentat evenimentul. În cadrul acesteia, partenerii invitați vor dezvălui provocarea competiției.</li>
                        <li><strong>Atribuirea punctelor de lucru:</strong> Fiecărei echipe i se va aloca un punct de lucru, unde va primi kit-ul standard necesar pentru desfășurarea competiției.</li>
                        <li><strong>Începerea activității:</strong> Echipele vor începe efectiv lucrul la proiectele lor.</li>
                        <li><strong>Flexibilitate în gestionarea pauzelor:</strong> Pe parcursul competiției, echipele vor putea lua pauze oricând consideră necesar.</li>
                        <li><strong>Pregătirea discursului final:</strong> După încheierea timpului alocat construcției și testării, fiecare echipă este încurajată să își pregătească un discurs de prezentare pentru juriu.</li>
                        <li><strong>Jurizarea proiectelor:</strong> Echipele își vor susține prezentările în fața juriului. După ce toate proiectele au fost prezentate, comisia de jurizare le va evalua.</li>
                        <li><strong>Festivitatea de premiere:</strong> La finalul competiției, toate echipele, împreună cu invitații și membrii juriului, vor lua parte la festivitatea de premiere. În cadrul acesteia, vor fi anunțați câștigătorii și premiate cele mai bune proiecte, marcând încheierea oficială a evenimentului.</li>
                    </ul>
                </div>
            ) : (
                <div className="handbook-block">
                    <SectionHeading level={2} id="guidelines">Event Flow <span className="brand-ampersand">&</span> <span className="keyword-highlight">Guidelines</span></SectionHeading>
                    <ul>
                        <li><strong>Team Check-in:</strong> Each team must complete check-in upon arrival.</li>
                        <li><strong>Opening Conference:</strong> After check-in, participants will attend the opening conference, where the event details will be presented. Invited partners will also reveal the competition challenge.</li>
                        <li><strong>Workstation Allocation:</strong> Each team will be assigned a workstation and provided with a standard kit necessary for the competition.</li>
                        <li><strong>Start of Activities:</strong> Teams will officially begin working on their projects.</li>
                        <li><strong>Flexible Break Management:</strong> Teams can take breaks at their discretion throughout the competition.</li>
                        <li><strong>Final Presentation Preparation:</strong> After the construction and testing phase ends, teams are encouraged to prepare a presentation speech for the jury.</li>
                        <li><strong>Project Evaluation:</strong> Teams will present their projects before the jury. Once all presentations are complete, the jury panel will evaluate them.</li>
                        <li><strong>Awards Ceremony:</strong> At the end of the competition, all teams, along with guests and jury members, will attend the awards ceremony. The winners will be announced, and the best projects will be recognized, marking the official conclusion of the event.</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HandbookFormat;
