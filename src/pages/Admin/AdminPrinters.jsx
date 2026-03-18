import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth, googleProvider } from '../../utils/fire';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import './AdminPrinters.scss';
import { FaTrash, FaCheck, FaTimes, FaGoogle, FaSignOutAlt } from 'react-icons/fa';

const AdminPrinters = () => {
    const [printers, setPrinters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPrinter, setNewPrinter] = useState({ nume: '', descriere: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Auth states
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await checkAdminStatus(currentUser.email);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const checkAdminStatus = async (email) => {
        try {
            const adminDoc = await getDoc(doc(db, "admins", email));
            if (
                adminDoc.exists() ||
                email === "matei.dragutu@osfiir.ro" ||
                email === "drgutumatei@gmail.com"
            ) {
                setIsAdmin(true);
                fetchPrinters();
            } else {
                setIsAdmin(false);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error checking admin:", error);
            setLoading(false);
        }
    };

    const fetchPrinters = () => {
        const q = query(collection(db, 'printers'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sorteaza dupa nume
            data.sort((a, b) => (a.nume || '').localeCompare(b.nume || ''));
            setPrinters(data);
            setLoading(false);
        });
        return unsubscribe; // not purely cleanup here but handled by react strict rules if needed. 
        // For simplicity, we just leave it active or attach to state later.
    };

    // Auto-check for expired printers
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentHHMM = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            printers.forEach(printer => {
                if (printer.status === 'Ocupat' && printer.ocupataPanaLa) {
                    // Check if current time is >= occupied until time
                    // Simple HH:MM comparison works for same-day context
                    if (currentHHMM >= printer.ocupataPanaLa) {
                        console.log(`Auto-releasing printer ${printer.nume} (expired at ${printer.ocupataPanaLa})`);
                        setFree(printer.id);
                    }
                }
            });
        }, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, [printers]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setIsAdmin(false);
    };

    const handleAddPrinter = async (e) => {
        e.preventDefault();
        
        // Strict validation: both nume and descriere must be filled and not just whitespace
        if (!newPrinter.nume || !newPrinter.nume.trim()) {
            alert("Numele imprimantei este obligatoriu.");
            return;
        }
        if (!newPrinter.descriere || !newPrinter.descriere.trim()) {
            alert("Descrierea este obligatorie.");
            return;
        }

        try {
            await addDoc(collection(db, 'printers'), {
                nume: newPrinter.nume.trim(),
                descriere: newPrinter.descriere.trim(),
                ocupataPanaLa: '', // empty means not occupied
                status: 'Liber' // 'Liber' sau 'Ocupat'
            });
            setNewPrinter({ nume: '', descriere: '' });
            setIsModalOpen(false); // Close modal on success
        } catch (error) {
            console.error("Error adding printer:", error);
            alert("Eroare la adăugarea imprimantei.");
        }
    };

    const handleDeletePrinter = async (id) => {
        if (window.confirm("Sigur vrei să ștergi această imprimantă?")) {
            try {
                await deleteDoc(doc(db, 'printers', id));
            } catch (error) {
                console.error("Error deleting printer:", error);
                alert("Eroare la ștergerea imprimantei.");
            }
        }
    };

    const handleUpdateStatus = async (id, time) => {
        try {
            let status = 'Liber';
            if (time && time.trim() !== '') {
                status = 'Ocupat';
            }
            await updateDoc(doc(db, 'printers', id), {
                ocupataPanaLa: time,
                status: status
            });
        } catch (error) {
            console.error("Error updating printer status:", error);
            alert("Eroare la actualizarea statusului.");
        }
    };

    const setFree = async (id) => {
        try {
            await updateDoc(doc(db, 'printers', id), {
                ocupataPanaLa: '',
                status: 'Liber'
            });
        } catch (error) {
            console.error("Error setting printer free:", error);
            alert("Eroare la eliberarea imprimantei.");
        }
    };

    if (loading) return <div className="admin-loading">Checking access...</div>;

    if (!user) {
        return (
            <div className="admin-login-page">
                <div className="login-card">
                    <h1>Admin Login</h1>
                    <p>Access restricted to authorized personnel.</p>
                    <button onClick={handleLogin} className="btn-google">
                        <FaGoogle /> Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="admin-unauthorized">
                <h1>Unauthorized</h1>
                <p>
                    Your email <strong>{user.email}</strong> is not on the allowlist.
                </p>
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        );
    }

    return (
        <div className="admin-printers-container dark-theme">
            <div className="header-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1>🔌 Gestiune Imprimante 3D</h1>
                        <p>Adaugă imprimante noi și actualizează statusul live al acestora.</p>
                    </div>
                    <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: '#aaa' }}>{user.email}</span>
                        <button onClick={handleLogout} className="btn-logout" style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '1.2rem' }}>
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>
            </div>

            <div className="controls-section" style={{ marginBottom: '2rem' }}>
                <button 
                    className="btn-open-modal" 
                    onClick={() => setIsModalOpen(true)}
                >
                    + Adaugă Imprimantă
                </button>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay popup-modal" onClick={() => setIsModalOpen(false)}>
                    <div className="admin-modal dark-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Adaugă Imprimantă Nouă</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-content">
                            <form onSubmit={handleAddPrinter} className="add-printer-form">
                                <div className="form-group">
                                    <label>Nume Imprimantă <span style={{color: '#ff4d4f'}}>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Prusa i3 MK3S+"
                                        value={newPrinter.nume}
                                        onChange={(e) => setNewPrinter({ ...newPrinter, nume: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descriere <span style={{color: '#ff4d4f'}}>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Filament PLA, masa încălzită..."
                                        value={newPrinter.descriere}
                                        onChange={(e) => setNewPrinter({ ...newPrinter, descriere: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Anulează</button>
                                    <button type="submit" className="btn-add">Adaugă Imprimantă</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="printers-list">
                <h2>Lista Imprimante ({printers.length})</h2>
                <div className="printers-grid">
                    {printers.map(printer => (
                        <div key={printer.id} className={`printer-card ${printer.status === 'Ocupat' ? 'ocupat' : 'liber'}`}>
                            <div className="printer-header">
                                <h3>{printer.nume}</h3>
                                <button className="btn-delete" onClick={() => handleDeletePrinter(printer.id)} title="Șterge Imprimanta">
                                    <FaTrash />
                                </button>
                            </div>
                            {printer.descriere && <p className="printer-desc">{printer.descriere}</p>}
                            
                            <div className="printer-status-control">
                                <label>Ocupată Până La (Oră:Minut)</label>
                                <div className="time-control-row">
                                    <input 
                                        type="time" 
                                        className="time-input"
                                        value={printer.ocupataPanaLa || ''}
                                        onChange={(e) => handleUpdateStatus(printer.id, e.target.value)}
                                    />
                                    {printer.status === 'Ocupat' && (
                                        <button className="btn-free" onClick={() => setFree(printer.id)} title="Marchează Liberă">
                                            <FaCheck /> Eliberează
                                        </button>
                                    )}
                                </div>
                                <div className="status-badge">
                                    Status curent: <strong>{printer.status}</strong> 
                                    {printer.status === 'Ocupat' && ` (până la ${printer.ocupataPanaLa})`}
                                </div>
                            </div>
                        </div>
                    ))}
                    {printers.length === 0 && (
                        <p className="no-data">Nu există imprimante adăugate.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPrinters;
