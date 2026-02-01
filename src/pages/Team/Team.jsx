import React, { useEffect } from 'react';
import './Team.scss';

// Importing images dynamically would be cleaner but direct imports ensure specific order matching the list
// Assuming the user wants them in the order of the file list vs the name list
import img1 from '../../assets/images/echipa/DSC02243 1.webp';
import img2 from '../../assets/images/echipa/DSC02251 1.webp';
import img3 from '../../assets/images/echipa/DSC02277 1.webp';
import img4 from '../../assets/images/echipa/DSC02291 1.webp';
import img5 from '../../assets/images/echipa/DSC02311 1.webp';
import img6 from '../../assets/images/echipa/DSC02325 1.webp';
import img7 from '../../assets/images/echipa/DSC02356 1.webp';
import img8 from '../../assets/images/echipa/DSC02417 1.webp';
import imgDavid from '../../assets/images/echipa/david_andrei.jpeg';

const Team = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const teamMembers = [
        {
            name: 'Gava Cosmin',
            role: 'Responsabil de Eveniment',
            roleEn: 'Event Coordinator',
            email: 'cosmin.gava@osfiir.ro',
            image: img2
        },
        {
            name: 'Negrilă Gabriel',
            role: 'Tehnic',
            roleEn: 'Technical Support',
            email: 'gabriel.negrila@osfiir.ro',
            image: img8
        },
        {
            name: 'Draguțu Matei',
            role: 'Social Media & PR',
            roleEn: 'Social Media & PR',
            email: 'matei.dragutu@osfiir.ro',
            image: img6
        },
        {
            name: 'David-Ioan Andrei',
            role: 'Logistica',
            roleEn: 'Logistics',
            email: 'david.andrei@osfiir.ro',
            image: imgDavid
        },
        {
            name: 'Nedelcu Alexandru-Andrei',
            role: 'Human Resources',
            roleEn: 'Human Resources',
            email: 'alexandru.nedelcu@osfiir.ro',
            image: img5
        },
        {
            name: 'Ionița Maria',
            role: 'Fundraising',
            roleEn: 'Fundraising',
            email: 'maria.ionita@osfiir.ro',
            image: img1
        },
        {
            name: 'Șchiopu Bogdan',
            role: 'Academic',
            roleEn: 'Academic',
            email: 'bogdan.schiopu@osfiir.ro',
            image: img4
        },
        {
            name: 'Ușurelu Andrei',
            role: 'Vocațional',
            roleEn: 'Vocational',
            email: 'andrei.usurelu@osfiir.ro',
            image: img7
        }
    ];

    return (
        <div className="team-page">
            <div className="team-container">
                <h1>Echipa CAD<span className="text-highlight">&</span>CRAFT</h1>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div className="team-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="team-image">
                                <img src={member.image} alt={member.name} loading="lazy" />
                            </div>
                            <div className="team-info">
                                <h3>{member.name}</h3>
                                <span className="role">{member.role}</span>
                                <a href={`mailto:${member.email}`} className="email-link">
                                    {member.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
