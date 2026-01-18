import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect immediately to the homepage #inscrieri section
        // Replace prevents this intermediate page from being in the history stack
        navigate('/#inscrieri', { replace: true });

        // Fallback: direct window location manipulation if navigate doesn't handle hash jump immediately
        // setTimeout(() => {
        //   window.location.href = '/#inscrieri';
        // }, 50);
    }, [navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E8EFF7',
            fontFamily: "'Bricolage Grotesque', sans-serif"
        }}>
            <h2>Redirecționare către înscriere...</h2>
        </div>
    );
};

export default Register;
