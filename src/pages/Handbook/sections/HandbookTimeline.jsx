import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './HandbookSections.scss';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const HandbookTimeline = () => {
    const { language } = useOutletContext();

    return (
        <div className="handbook-section">
            <SectionHeading level={1} id="timeline">{language === 'RO' ? '2. Timeline' : '2. Event Timeline'}</SectionHeading>

            <div className="handbook-table-container">
                <table className="handbook-table">
                    <thead>
                        <tr>
                            <th>{language === 'RO' ? 'Data' : 'Date'}</th>
                            <th>{language === 'RO' ? 'Eveniment' : 'Event'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="date">{language === 'RO' ? '2 FEBRUARIE' : 'February 2'}</td>
                            <td className="event">➜ {language === 'RO' ? 'START ÎNSCRIERI' : 'REGISTRATIONS OPEN'}</td>
                        </tr>
                        <tr>
                            <td className="date">{language === 'RO' ? '6 MARTIE' : 'March 7'}</td>
                            <td className="event">
                                ➜ {language === 'RO' ? 'STOP ÎNSCRIERI' : 'REGISTRATIONS CLOSE'} <br />
                                ➜ {language === 'RO' ? 'ÎNCEPEREA PROCESULUI DE SELECȚIE A ECHIPELOR' : 'TEAM SELECTION PROCESS BEGINS'}
                            </td>
                        </tr>
                        <tr>
                            <td className="date">{language === 'RO' ? '20 MARTIE' : 'March 20'}</td>
                            <td className="event">
                                ➜ {language === 'RO' ? 'CAZARE' : 'Participants Check-in'} <br />
                                {language === 'RO' ? 'Dupa ora 12:00' : 'after 12:00AM'}
                            </td>
                        </tr>
                        <tr>
                            <td className="date">{language === 'RO' ? '21 MARTIE' : 'March 21'}</td>
                            <td className="event">
                                <strong>{language === 'RO' ? 'START COMPETIȚIE' : 'COMPETITION START'}</strong><br />
                                ➜ 08:00-09:30 – {language === 'RO' ? 'Check-in participanți' : 'Participant Check-in'}<br />
                                ➜ 10:00 – {language === 'RO' ? 'Ceremonie de deschidere' : 'Event Opening'}<br />
                                ➜ 11:30 – {language === 'RO' ? 'Pauză' : 'Break'}<br />
                                ➜ 12:00 – {language === 'RO' ? 'Start competiție' : 'Challenge Start'}
                            </td>
                        </tr>
                        <tr>
                            <td className="date">{language === 'RO' ? '22 MARTIE' : 'March 22'}</td>
                            <td className="event">
                                <strong>{language === 'RO' ? 'STOP COMPETIȚIE' : 'Challenge End'}</strong> {language === 'RO' ? '+ Pauză' : '+ Break'} (12:00)<br />
                                ➜ 13:00 – {language === 'RO' ? 'Testare Robot' : 'Competition Trial'}<br />
                                ➜ 14:30 – {language === 'RO' ? 'Prezentare + Jurizare' : 'Team Discussions + Judging'}<br />
                                ➜ 18:00 – {language === 'RO' ? 'Premiere + Ceremonie de închidere' : 'Awards Ceremony & Closing Festivities'}
                            </td>
                        </tr>
                        <tr>
                            <td className="date">{language === 'RO' ? '22-23 MARTIE' : 'March 22-23'}</td>
                            <td className="event">
                                ➜ <strong>{language === 'RO' ? 'DECAZARE' : 'Participant Check-out'}</strong><br />
                                {language === 'RO' ? 'Până la ora 8:00AM pe 23 Martie' : 'To be done till 8:00AM on 23 March'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HandbookTimeline;
