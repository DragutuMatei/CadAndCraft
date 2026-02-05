import React from 'react';
import { FaTimes, FaCheck, FaBan, FaUser, FaSchool, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLink } from 'react-icons/fa';
import './Admin.scss'; // We'll reuse/extend Admin.scss

const TeamDetailsModal = ({ team, onClose, onStatusUpdate }) => {
    if (!team) return null;

    const isHighSchool = team.teamEnvironment === 'highschool';
    const numMembers = parseInt(team.teamSize);

    const renderMember = (index) => {
        if (index > numMembers) return null;

        // Dynamic access to fields
        const name = team[`member${index}Name`];
        const email = team[`member${index}Email`];
        const phone = team[`member${index}Phone`];
        const city = team[`member${index}City`];
        const institution = team[`member${index}Institution`];
        const details = team[`member${index}Details`]; // Class/Faculty
        const year = team[`member${index}Year`];
        const social = team[`member${index}Social`];
        const cv = team[`member${index}Cv`]; // University only
        const food = team[`member${index}Food`];
        const allergies = team[`member${index}Allergies`];
        const tshirt = team[`member${index}Tshirt`];

        return (
            <div className="member-card" key={index}>
                <h4><FaUser /> Membru {index} {index === 1 && '(Căpitan)'}</h4>
                <div className="member-details">
                    <p><strong>Nume:</strong> {name}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
                    <p><strong>Telefon:</strong> <a href={`tel:${phone}`}>{phone}</a></p>
                    <p><strong>Oraș:</strong> {city}</p>
                    <p><strong>{isHighSchool ? 'Liceu' : 'Facultate'}:</strong> {institution}</p>
                    <p><strong>{isHighSchool ? 'Clasa' : 'Specializare'}:</strong> {details}</p>
                    {year && <p><strong>An:</strong> {year}</p>}
                    <p><strong>Mărime Tricou:</strong> {tshirt}</p>
                    <p><strong>Mâncare:</strong> {food}</p>
                    {allergies && <p className="allergies"><strong>Alergii:</strong> {allergies}</p>}

                    <div className="member-links">
                        {social && <a href={social} target="_blank" rel="noopener noreferrer" className="link-btn"><FaLink /> Social</a>}
                        {cv && <a href={cv} target="_blank" rel="noopener noreferrer" className="link-btn"><FaLink /> CV</a>}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal wide" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>{team.teamName || 'Participare Individuală'}</h2>
                        <span className={`status-badge ${team.status || 'new'}`}>{team.status || 'New'}</span>
                        <span className="env-badge">{isHighSchool ? 'Liceu' : 'Universitate'}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="modal-scroll-content">
                    {/* Actions Toolbar */}
                    <div className="actions-toolbar">
                        <strong>Acțiuni:</strong>
                        <button className="btn-accept" onClick={() => onStatusUpdate(team.id, 'accepted')}>
                            <FaCheck /> Acceptă
                        </button>
                        <button className="btn-reject" onClick={() => onStatusUpdate(team.id, 'rejected')}>
                            <FaBan /> Respinge
                        </button>
                    </div>

                    <div className="info-section">
                        <h3>Detalii Logistică & Contact</h3>
                        <div className="grid-2">
                            <div>
                                <p><FaEnvelope /> <strong>Contact Email:</strong> {team.contactEmail}</p>
                                <p><FaPhone /> <strong>Contact Tel:</strong> {team.contactPhone}</p>
                                <p><strong>Data Înscrierii:</strong> {team.submittedAt}</p>
                            </div>
                            <div>
                                <p><strong>Cazare:</strong> {team.accommodation || 'Nu'}</p>
                                {isHighSchool && <p><strong>Acord Parental:</strong> {team.parentalConsent ? 'Da' : 'Nu'}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Proiecte & Motivație</h3>
                        <p><strong>Proiecte Anterioare:</strong></p>
                        <div className="text-content">
                            {team.previousProjects.startsWith('http') ?
                                <a href={team.previousProjects} target="_blank" rel="noreferrer">{team.previousProjects}</a> :
                                team.previousProjects
                            }
                        </div>
                        <p><strong>Motivație:</strong> {team.motivation}</p>
                        {team.finalThoughts && <p><strong>Alte Gânduri:</strong> {team.finalThoughts}</p>}
                    </div>

                    <div className="members-grid">
                        {[1, 2, 3].map(i => renderMember(i))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamDetailsModal;
