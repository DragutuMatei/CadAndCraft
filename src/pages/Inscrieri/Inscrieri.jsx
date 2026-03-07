import React from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from '../../components/Countdown/Countdown';

const Inscrieri = () => {
    return (
        <main className="page-inscrieri" style={{ minHeight: '100vh', paddingTop: '100px', backgroundColor: '#EBF2FA', paddingBottom: '60px' }}>
            <Countdown />
        </main>
    );
};

export default Inscrieri;
