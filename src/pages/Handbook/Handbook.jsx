import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HandbookSidebar from '../../components/HandbookSidebar/HandbookSidebar';
import './Handbook.scss';
import LogoSVG from '../../assets/icons/logo.svg';

const Handbook = () => {
  const { pathname } = useLocation();
  const [language, setLanguage] = React.useState('RO'); // 'RO' or 'EN'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="handbook-page">
      <div className="handbook-container">
        <HandbookSidebar language={language} setLanguage={setLanguage} />
        <main className="handbook-content">
          <Outlet context={{ language }} />
        </main>
      </div>
    </div>
  );
};

export default Handbook;