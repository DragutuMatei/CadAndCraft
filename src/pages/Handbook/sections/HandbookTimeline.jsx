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
                            <td className="date">2 FEBRUARIE</td>
                            <td className="event">➜ {language === 'RO' ? 'START ÎNSCRIERI' : 'REGISTRATIONS OPEN'}</td>
                        </tr>
                        <tr>
                            <td className="date">7 MARTIE</td>
                            <td className="event">
                                ➜ {language === 'RO' ? 'STOP ÎNSCRIERI' : 'REGISTRATIONS CLOSE'} <br />
                                ➜ {language === 'RO' ? 'ÎNCEPEREA PROCESULUI DE SELECȚIE' : 'TEAM SELECTION BEGINS'}
                            </td>
                        </tr>
                        <tr>
                            <td className="date">TBA</td>
                            <td className="event">➜ {language === 'RO' ? 'CAZARE' : 'ACCOMMODATION'}</td>
                        </tr>
                        <tr>
                            <td className="date">TBA</td>
                            <td className="event">➜ COMPETITION START</td>
                        </tr>
                        <tr>
                            <td className="date">TBA</td>
                            <td className="event">➜ Challenge End</td>
                        </tr>
                        <tr>
                            <td className="date">TBA</td>
                            <td className="event">➜ Participant Check-out</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HandbookTimeline;
