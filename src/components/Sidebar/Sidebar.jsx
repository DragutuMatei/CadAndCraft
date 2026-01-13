import React, { useState } from 'react';
import { 
  FaInfoCircle, FaHistory, FaListAlt, FaBook, 
  FaTrophy, FaUserTie, FaEnvelope, FaCommentDots 
} from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import './Sidebar.scss';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Despre CAD&CRAFT', icon: <FaInfoCircle />, link: '/about' },
    { label: 'Event Timeline', icon: <FaHistory />, link: '#timeline' },
    { label: 'Event Format', icon: <FaListAlt />, link: '#format' },
    { label: 'Rules', icon: <FaBook />, link: '/handbook' },
    { label: 'Awards', icon: <FaTrophy />, link: '#awards' },
    { label: 'Profilul candidatului', icon: <FaUserTie />, link: '#profile' },
    { label: 'Contact', icon: <FaEnvelope />, link: '#contact' },
    { label: 'Feedback', icon: <FaCommentDots />, link: '#feedback' },
  ];

  return (
    <>
      {/* Overlay pentru mobil */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(false)}
      />

      <aside className={`floating-sidebar ${isOpen ? 'open' : ''}`}>
        
        <div className="floating-sidebar__toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </div>

        <ul className="floating-sidebar__menu">
          {menuItems.map((item, index) => (
            <li key={index} className="floating-sidebar__item">
              <a href={item.link} className="floating-sidebar__link" onClick={() => setIsOpen(false)}>
                <span className="icon">{item.icon}</span>
                <span className="text">{item.label}</span>
              </a>
              {/* Tooltip-ul a fost șters complet de aici */}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;