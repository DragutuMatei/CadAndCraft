import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaInfoCircle, FaBook, FaCalendarAlt, FaPenNib, FaEnvelope, FaListUl
} from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import './HandbookSidebar.scss';

const HandbookSidebar = ({ language, setLanguage }) => {
    // isOpen controls the expansion on mobile/tablet
    const [isOpen, setIsOpen] = useState(false);

    // On desktop, we don't use toggle, it's always fully visible.
    // On mobile/tablet, it starts "small" (icons only) and toggles to "big" (full).
    // The CSS @media (max-width: 1024px) handles the "small" state by default when not .open

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const sections = [
        { label: language === 'RO' ? <>Despre CAD<span className="brand-ampersand">&</span>Craft</> : <>About CAD<span className="brand-ampersand">&</span>Craft</>, icon: <FaInfoCircle />, link: '/handbook/about' },
        { label: 'Timeline', icon: <FaCalendarAlt />, link: '/handbook/timeline' },
        { label: language === 'RO' ? 'Format Eveniment' : 'Event Format', icon: <FaListUl />, link: '/handbook/format' },
        { label: language === 'RO' ? 'Regulament' : 'Rules', icon: <FaBook />, link: '/handbook/rules' },
        { label: language === 'RO' ? 'Premii' : 'Awards', icon: <FaPenNib />, link: '/handbook/awards' },
        { label: language === 'RO' ? 'Profil Candidat' : 'Candidate Profile', icon: <FaInfoCircle />, link: '/handbook/profile' },
        { label: 'Contact', icon: <FaEnvelope />, link: '/handbook/contact' }
    ];

    return (
        <>
            <div
                className={`handbook-sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
            />

            <aside className={`handbook-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="handbook-sidebar__toggle" onClick={toggleSidebar}>
                    {isOpen ? <HiX /> : <HiMenu />}
                </div>

                <div className="handbook-sidebar__content">

                    <div className="handbook-sidebar__lang-switch">
                        <button
                            className={`lang-btn ${language === 'RO' ? 'active' : ''}`}
                            onClick={() => setLanguage('RO')}
                        >RO</button>
                        <button
                            className={`lang-btn ${language === 'EN' ? 'active' : ''}`}
                            onClick={() => setLanguage('EN')}
                        >EN</button>
                    </div>

                    <nav className="handbook-sidebar__nav">
                        {sections.map((section, index) => (
                            <NavLink
                                key={index}
                                to={section.link}
                                className={({ isActive }) => `handbook-sidebar__link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="icon">{section.icon}</span>
                                <span className="text">{section.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* <div className="handbook-sidebar__footer" style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        <a
                            href="/Handbook 2026 (PENTRU INSCRIERI)_organized.pdf"
                            download
                            className="handbook-sidebar__download-btn"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                width: '100%', padding: '12px', background: '#208A39', color: '#EBF2FA',
                                textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.9rem',
                                marginTop: '10px'
                            }}
                        >
                            <FaBook /> Download PDF
                        </a>
                    </div> */}
                </div>
            </aside>
        </>
    );
};

export default HandbookSidebar;
