import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './HandbookSections.scss';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const HandbookContact = () => {
    const { language } = useOutletContext();

    return (
        <div className="handbook-section">
            <SectionHeading level={1} id="contact">{language === 'RO' ? <><span className="num-font">7</span>. Contact</> : <><span className="num-font">7</span>. Contact</>}</SectionHeading>

            <div className="handbook-block">
                <p>
                    {language === 'RO'
                        ? 'Dacă ai întrebări sau ai nevoie de ajutor pe durata evenimentului, nu ezita să ne contactezi.'
                        : 'If you have any questions or need assistance during the event, don\'t hesitate to reach out.'}
                </p>
                <SectionHeading level={3} id="main-contacts">{language === 'RO' ? 'Contacte principale:' : 'Main Contacts:'}</SectionHeading>
                <p>📧 Email: <a href="mailto:office@osfiir.ro">office@osfiir.ro</a></p>
                <p>📧 Email: <a href="mailto:cadathon2026@osfiir.ro">cadathon<span className="num-font">2026</span>@osfiir.ro</a></p>

                <SectionHeading level={2} id="organizing-team">{language === 'RO' ? 'Echipa de organizare' : 'Organizing Team'}</SectionHeading>
                <div className="handbook-table-container">
                    <table className="handbook-table">
                        <thead>
                            <tr>
                                <th>{language === 'RO' ? 'Nume' : 'Name'}</th>
                                <th>{language === 'RO' ? 'Rol' : 'Role'}</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Gava Cosmin</td>
                                <td>{language === 'RO' ? 'Responsabil de Eveniment' : 'Event Coordinator'}</td>
                                <td><a href="mailto:cosmin.gava@osfiir.ro">cosmin.gava@osfiir.ro</a></td>
                            </tr>
                            <tr>
                                <td>Negrilă Gabriel</td>
                                <td>{language === 'RO' ? 'Tehnic' : 'Technical Support'}</td>
                                <td><a href="mailto:gabriel.negrila@osfiir.ro">gabriel.negrila@osfiir.ro</a></td>
                            </tr>
                            <tr>
                                <td>Draguțu Matei</td>
                                <td>Social Media & PR</td>
                                <td><a href="mailto:matei.dragutu@osfiir.ro">matei.dragutu@osfiir.ro</a></td>
                            </tr>
                            <tr>
                                <td>David-Ioan Andrei</td>
                                <td>{language === 'RO' ? 'Logistica' : 'Logistics'}</td>
                                <td><a href="mailto:david.andrei@osfiir.ro">david.andrei@osfiir.ro</a></td>
                            </tr>
                            <tr>
                                <td>Nedelcu Alexandru-Andrei</td>
                                <td>Human Resources</td>
                                <td><a href="mailto:alexandru.nedelcu@osfiir.ro">alexandru.nedelcu@osfiir.ro</a></td>
                            </tr>
                            <tr>
                                <td>Ionița Maria</td>
                                <td>Fundraising</td>
                                <td><a href="mailto:maria.ionita@osfiir.ro">maria.ionita@osfiir.ro</a></td>
                            </tr>
                            <tr>
                                <td>Șchiopu Bogdan</td>
                                <td>Academic</td>
                                <td><a href="mailto:bogdan.schiopu@osfiir.ro">bogdan.schiopu@osfiir.ro</a></td>
                            </tr>
                            <tr>
                                <td>Ușurelu Andrei</td>
                                <td>{language === 'RO' ? 'Vocațional' : 'Vocational'}</td>
                                <td><a href="mailto:andrei.usurelu@osfiir.ro">andrei.usurelu@osfiir.ro</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <SectionHeading level={2} id="follow-us">{language === 'RO' ? 'Urmărește-ne pentru actualizări pe:' : 'Follow Us for Updates:'}</SectionHeading>
            <p>Instagram: <a href="https://www.instagram.com/osfiir/" target="_blank" rel="noopener noreferrer">@osfiir</a></p>
            <p>Facebook: <a href="https://www.facebook.com/OSFIIR/" target="_blank" rel="noopener noreferrer">OSFIIR</a></p>
        </div>
    );
};

export default HandbookContact;
