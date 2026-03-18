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
                    <SectionHeading level={2} id="legacy-award"><span className="keyword-highlight">Legacy Award</span></SectionHeading>
                    <p>
                        Acest premiu este cea mai înaltă distincție a competiției, accesibilă ambelor categorii (preuniversitar și universitar), care recompensează excelența absolută și este acordat echipei care reprezintă un etalon de performanță tehnică, organizare și atitudine.
                    </p>

                    <SectionHeading level={2} id="prodigy-award"><span className="keyword-highlight">Prodigy Award</span></SectionHeading>
                    <p>
                        Acest premiu este dedicat exclusiv echipelor din mediul <strong>preuniversitar</strong>. Sunt vizate cele care se impun prin capacitatea de adaptare, profunzimea gândirii și dorința de a învăța, valorificând evoluția echipei și modul în care aceasta a reușit să compenseze diferența de experiență față de concurenții din mediul universitar.
                    </p>

                    <SectionHeading level={2} id="rising-engineer-award"><span className="keyword-highlight">The Rising Engineer Award</span></SectionHeading>
                    <p>
                        Acest premiu este dedicat exclusiv echipelor din mediul <strong>preuniversitar</strong> și recompensează pasiunea pentru un robot proiectat impecabil. Distincția se acordă echipei care reușește să îmbine armonios funcționalitatea cu forma, prezentând un model eficient, practic, robust și elegant.
                    </p>

                    <SectionHeading level={2} id="blueprint-award"><span className="keyword-highlight">Blueprint Award</span></SectionHeading>
                    <p>
                        Acest premiu este dedicat exclusiv echipelor din mediul <strong>universitar</strong>. Distincția recompensează capacitatea de a inova pornind de la un fundament tehnic solid, valorificând experiența și cunoștințele avansate ale echipei pentru a crea un produs real, eficient și funcțional.
                    </p>

                    <SectionHeading level={2} id="engineering-award"><span className="keyword-highlight">Engineering Award</span></SectionHeading>
                    <p>
                        Acest premiu este dedicat exclusiv echipelor din mediul <strong>universitar</strong>. Distincția recompensează esența ingineriei aplicate: rezolvarea unei probleme în cel mai eficient mod posibil. Echipa câștigătoare demonstrează maturitate tehnică, cu un calcul riguros și o asamblare pentru un prototip cât mai fiabil, cu gândul de a implementa o soluție simplă, funcțională și precisă, evitând complexitatea inutilă.
                    </p>
                </div>
            ) : (
                <div className="handbook-block">
                    <SectionHeading level={2} id="legacy-award"><span className="keyword-highlight">Legacy Award</span></SectionHeading>
                    <p>
                        This is the highest distinction of the competition, open to both categories (pre-university and university). It recognizes absolute excellence and is awarded to the team that sets the benchmark in technical performance, organization, and professional attitude.
                    </p>

                    <SectionHeading level={2} id="prodigy-award"><span className="keyword-highlight">Prodigy Award</span></SectionHeading>
                    <p>
                        This award is exclusively dedicated to <strong>pre-university</strong> teams. It highlights those who stand out through adaptability, depth of thinking, and a strong willingness to learn, recognizing the team's growth and how it successfully compensates for the experience gap compared to university competitors.
                    </p>

                    <SectionHeading level={2} id="rising-engineer-award"><span className="keyword-highlight">The Rising Engineer Award</span></SectionHeading>
                    <p>
                        This award is exclusively dedicated to <strong>pre-university</strong> teams and recognizes the passion behind a <strong>well-designed</strong> robot. It is given to the team that successfully combines functionality and aesthetics, presenting a model that is efficient, practical, robust, and elegant.
                    </p>

                    <SectionHeading level={2} id="blueprint-award"><span className="keyword-highlight">Blueprint Award</span></SectionHeading>
                    <p>
                        This award is exclusively dedicated to <strong>university</strong> teams. It recognizes the ability to innovate based on a strong technical foundation, leveraging the team's advanced knowledge and experience to develop a real, efficient, and functional product.
                    </p>

                    <SectionHeading level={2} id="engineering-award"><span className="keyword-highlight">Engineering Award</span></SectionHeading>
                    <p>
                        This award is exclusively dedicated to <strong>university</strong> teams. It celebrates the essence of applied engineering: solving a problem in the most efficient way possible. The winning team demonstrates technical maturity through rigorous calculations and precise assembly, focusing on implementing a solution that is simple, functional, and reliable while avoiding unnecessary complexity.
                    </p>
                </div>
            )}
        </div>
    );
};

export default HandbookAwards;
