import React, { useState } from 'react';
import { FaTimes, FaCheck, FaBan, FaUser, FaSchool, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLink, FaSpinner } from 'react-icons/fa';
import './Admin.scss'; // We'll reuse/extend Admin.scss
import emailjs from '@emailjs/browser';

const TeamDetailsModal = ({ team, onClose, onStatusUpdate }) => {
    const [isSending, setIsSending] = useState(false);

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

    // Handle Email & Status Update
    const handleStatusAction = async (newStatus) => {
        setIsSending(true);
        try {
            // Determine dynamic values based on status
            const isAccepted = newStatus === 'accepted';

            // Set the single template ID you have set in your env
            const templateId = process.env.REACT_APP_ACCEPT;

            const templateParams = {
                to_email: team.contactEmail,
                to_name: team.member1Name || "Participant",
                team_name: team.teamName || "Participare Individuală",

                // Dynamic Content Variables
                header_color: isAccepted ? "#208A39" : "#FFC300",
                header_title_color: isAccepted ? "#208A39" : "#003566",
                title: isAccepted ? "Felicitări! Ești Acceptat" : "Rezultat Selecție",

                // The main message paragraph
                message_paragraph: isAccepted
                    ? `Ne bucurăm să te anunțăm că aplicația ta a fost <strong>acceptată</strong>. Felicitări!<br><br>În perioada următoare vei primi informații suplimentare legate de organizare, program și pașii următori pe care va trebui să îi parcurgi.`
                    : `În urma evaluării aplicațiilor, din păcate, de această dată <strong>nu ai fost selectat(ă)</strong> pentru participare.<br><br>Decizia a fost luată în urma unui proces competitiv de selecție destul de riguros. Cu toate acestea, te încurajăm să aplici și la edițiile viitoare sau la alte evenimente organizate de noi.`,

                // Highlighting the text block (optional style var)
                status_bg_color: isAccepted ? "#f4f8f4" : "#f8f9fa",
                status_border_color: isAccepted ? "#208A39" : "#003566",
                status_text_color: isAccepted ? "#1a6b2a" : "#333333",
            };

            // Send Email via EmailJS
            await emailjs.send(process.env.REACT_APP_M_ID, templateId, templateParams, process.env.REACT_APP_M_PUBLIC);

            // If email succeeded, update status in Firestore
            await onStatusUpdate(team.id, newStatus);
            alert(`Email trimis cu succes către ${team.contactEmail} și status actualizat la ${newStatus}.`);

        } catch (error) {
            console.error("Failed to send email or update status:", error);
            alert("A apărut o eroare la trimiterea emailului. Statusul NU a fost actualizat.");
        } finally {
            setIsSending(false);
        }
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
                        <button className="btn-accept" onClick={() => handleStatusAction('accepted')} disabled={isSending}>
                            {isSending ? <FaSpinner className="fa-spin" /> : <FaCheck />} Acceptă
                        </button>
                        <button className="btn-reject" onClick={() => handleStatusAction('rejected')} disabled={isSending}>
                            {isSending ? <FaSpinner className="fa-spin" /> : <FaBan />} Respinge
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
