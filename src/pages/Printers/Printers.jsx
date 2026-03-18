import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/fire';
import './Printers.scss';
import { FaPrint, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Printers = () => {
    const [printers, setPrinters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const q = query(collection(db, 'printers'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sorteaza alfabetic
            data.sort((a, b) => (a.nume || '').localeCompare(b.nume || ''));
            setPrinters(data);
            setLoading(false);
        });

        // Cleanup
        return () => unsubscribe();
    }, []);

    // Timer pentru actualizare in timp real (in fiecare secunda)
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-check for expired printers
    useEffect(() => {
        const checkExpired = async () => {
            const now = new Date();
            const currentHHMM = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            for (const printer of printers) {
                if (printer.status === 'Ocupat' && printer.ocupataPanaLa) {
                    if (currentHHMM >= printer.ocupataPanaLa) {
                        try {
                            await updateDoc(doc(db, 'printers', printer.id), {
                                ocupataPanaLa: '',
                                status: 'Liber'
                            });
                            console.log(`Public view auto-released printer ${printer.nume}`);
                        } catch (error) {
                            console.error("Error auto-releasing printer:", error);
                        }
                    }
                }
            }
        };

        if (printers.length > 0) {
            checkExpired();
        }
    }, [printers]);

    // Helper pt a calcula formatul HH:MM:SS rams
    const getRemainingTimeFormat = (targetTimeStr) => {
        if (!targetTimeStr) return null;
        const [targetHours, targetMinutes] = targetTimeStr.split(':').map(Number);
        
        const targetDate = new Date(currentTime);
        targetDate.setHours(targetHours, targetMinutes, 0, 0);

        let diff = targetDate.getTime() - currentTime.getTime();

        if (diff <= 0) {
            return "00:00:00"; // Expirat/Liber
        }

        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="printers-page">
            <header className="printers-hero">
                <div className="hero-content">
                    <h1>Status Imprimante 3D</h1>
                    <p>Verifică în timp real disponibilitatea imprimantelor 3D din cadrul evenimentului.</p>
                </div>
            </header>

            <main className="printers-main-content">
                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Se încarcă statusul...</p>
                    </div>
                ) : (
                    <div className="printers-grid">
                        {printers.length === 0 ? (
                            <div className="no-printers">
                                <FaExclamationCircle className="icon" />
                                <p>Nu există nicio imprimantă adăugată în sistem în acest moment.</p>
                            </div>
                        ) : (
                            printers.map((printer) => {
                                const isOccupied = printer.status === 'Ocupat' && printer.ocupataPanaLa;
                                let remainingTimeStr = null;
                                
                                if (isOccupied) {
                                    remainingTimeStr = getRemainingTimeFormat(printer.ocupataPanaLa);
                                }

                                return (
                                    <div key={printer.id} className={`printer-card ${isOccupied && remainingTimeStr !== "00:00:00" ? 'status-occupied' : 'status-free'}`}>
                                        <div className="printer-icon">
                                            <FaPrint />
                                        </div>
                                        <div className="printer-info">
                                            <h2>{printer.nume}</h2>
                                            {printer.descriere && <p className="description">{printer.descriere}</p>}
                                        </div>
                                        
                                        <div className="printer-status-bar">
                                            {isOccupied && remainingTimeStr !== "00:00:00" ? (
                                                <div className="status occupied">
                                                    <FaClock className="status-icon" />
                                                    <span style={{display: 'flex', flexDirection: 'column'}}>
                                                        <span>Ocupată până la <strong>{printer.ocupataPanaLa}</strong></span>
                                                        <span style={{fontSize: '0.9rem', color: '#666', marginTop: '5px'}}>
                                                            Timp rămas: <strong style={{color: '#D94436', background: 'transparent', padding: 0, border: 'none', boxShadow: 'none'}}>{remainingTimeStr}</strong>
                                                        </span>
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="status free">
                                                    <FaCheckCircle className="status-icon" />
                                                    <span>Liberă</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Printers;
