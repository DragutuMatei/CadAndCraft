import React, { useState, useEffect, useMemo } from 'react';
import './Admin.scss';
import { auth, googleProvider, db } from '../../utils/fire';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, getDoc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { FaSignOutAlt, FaGoogle, FaTrash, FaEye, FaTimes, FaUserShield } from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Admin = () => {
    const [user, setUser] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [selectedReg, setSelectedReg] = useState(null);

    // Listen for auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await checkAdminStatus(currentUser.email);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const checkAdminStatus = async (email) => {
        try {
            const adminDoc = await getDoc(doc(db, "admins", email));
            if (adminDoc.exists() || email === 'matei.dragutu@osfiir.ro' || email === 'drgutumatei@gmail.com') {
                setIsAdmin(true);
                fetchRegistrations();
                fetchAdmins();
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            console.error("Error checking admin:", error);
        }
        setLoading(false);
    };

    const fetchRegistrations = () => {
        const q = query(collection(db, "inscrieri"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRegistrations(data);
        });
        return unsubscribe;
    };

    const fetchAdmins = async () => {
        const q = query(collection(db, "admins"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id, // email is likely the ID
                ...doc.data()
            }));
            setAdmins(data);
        });
        return unsubscribe;
    };

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
        setRegistrations([]);
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        if (!newAdminEmail) return;
        try {
            await setDoc(doc(db, "admins", newAdminEmail), {
                addedBy: user.email,
                addedAt: new Date()
            });
            alert(`Admin ${newAdminEmail} added!`);
            setNewAdminEmail('');
        } catch (error) {
            console.error("Error adding admin:", error);
        }
    };

    const handleDeleteAdmin = async (email) => {
        if (window.confirm(`Are you sure you want to remove ${email}?`)) {
            try {
                await deleteDoc(doc(db, "admins", email));
            } catch (error) {
                console.error("Error removing admin:", error);
            }
        }
    };

    // --- Statistics Processing ---
    const stats = useMemo(() => {
        if (!registrations.length) return null;

        const timeline = {};
        const teamSizes = { '1': 0, '2': 0, '3': 0 };
        const environments = { 'highschool': 0, 'university': 0 };
        const hsClasses = {};
        const hsYears = {}; // Actually university years or HS years? Request said "HS: Class, Year" 
        // Usually HS has Class (9-12). University has Year (1-4).
        // Let's track both from 'member1Details' etc if available? 
        // Actually 'details' field usually holds Class/Year.

        registrations.forEach(reg => {
            // Timeline (Group by Day)
            const date = reg.createdAt?.toDate().toLocaleDateString('ro-RO');
            if (date) {
                timeline[date] = (timeline[date] || 0) + 1;
            }

            // Team Size
            if (reg.teamSize) teamSizes[reg.teamSize] = (teamSizes[reg.teamSize] || 0) + 1;

            // Environment
            if (reg.teamEnvironment) environments[reg.teamEnvironment] = (environments[reg.teamEnvironment] || 0) + 1;

            // Classes/Years (Naive extraction from 'Details' fields for simplification)
            // We'll iterate members
            [1, 2, 3].forEach(i => {
                const details = reg[`member${i}Details`]; // e.g., "11C" or "Anul 2"
                if (details && i <= parseInt(reg.teamSize)) {
                    // Very basic cleaning
                    const key = details.trim().toUpperCase();
                    if (reg.teamEnvironment === 'highschool') {
                        hsClasses[key] = (hsClasses[key] || 0) + 1;
                    }
                }
            });
        });

        return { timeline, teamSizes, environments, hsClasses };
    }, [registrations]);

    // --- Chart Configs ---
    const chartTimeline = {
        labels: stats ? Object.keys(stats.timeline) : [],
        datasets: [{
            label: 'Înscrieri pe Zile',
            data: stats ? Object.values(stats.timeline) : [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const chartTeamSize = {
        labels: ['1 Persoană', '2 Persoane', '3 Persoane'],
        datasets: [{
            label: 'Mărime Echipă',
            data: stats ? [stats.teamSizes['1'], stats.teamSizes['2'], stats.teamSizes['3']] : [],
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
        }]
    };

    const chartEnv = {
        labels: ['Liceu', 'Facultate'],
        datasets: [{
            label: 'Mediu',
            data: stats ? [stats.environments['highschool'], stats.environments['university']] : [],
            backgroundColor: ['#FF6384', '#36A2EB'],
        }]
    };

    const chartClasses = {
        labels: stats ? Object.keys(stats.hsClasses) : [],
        datasets: [{
            label: 'Distribuție Clase/Ani (Brut)',
            data: stats ? Object.values(stats.hsClasses) : [],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
        }]
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
                <p>Your email <strong>{user.email}</strong> is not on the allowlist.</p>
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h2>CAD&Craft Admin</h2>
                <div className="user-info">
                    <span>{user.email}</span>
                    <button onClick={handleLogout} className="btn-logout"><FaSignOutAlt /></button>
                </div>
            </header>

            <div className="admin-content">
                {/* Statistics Row */}
                <div className="admin-section stats-grid">
                    <h3>Statistici Înscrieri</h3>
                    <div className="charts-container">
                        <div className="chart-box">
                            <h4>Evoluție Înscrieri</h4>
                            <Line data={chartTimeline} />
                        </div>
                        <div className="chart-box">
                            <h4>Mărime Echipe</h4>
                            <Bar data={chartTeamSize} />
                        </div>
                        <div className="chart-box half">
                            <h4>Liceu vs Facultate</h4>
                            <div style={{ maxHeight: '200px', display: 'flex', justifyContent: 'center' }}>
                                <Pie data={chartEnv} />
                            </div>
                        </div>
                        <div className="chart-box">
                            <h4>Distribuție Clase/Ani</h4>
                            <Bar data={chartClasses} />
                        </div>
                    </div>
                </div>

                <div className="admin-section">
                    <h3>Înscrieri Recente ({registrations.length})</h3>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Când</th>
                                    <th>Echipă</th>
                                    <th>Membri</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Acțiuni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map(reg => (
                                    <tr key={reg.id}>
                                        <td>
                                            {reg.submittedAt || 'N/A'}<br />
                                            <small style={{ color: '#999' }}>{reg.id.slice(0, 5)}...</small>
                                        </td>
                                        <td>{reg.teamName || 'Individual'}</td>
                                        <td>
                                            <span style={{ fontWeight: 'bold' }}>{reg.teamSize}</span>
                                            <span style={{ fontSize: '0.8em', color: '#666' }}> ({reg.teamEnvironment === 'highschool' ? 'Lic' : 'Univ'})</span>
                                        </td>
                                        <td>
                                            {reg.contactEmail}<br />
                                            <small>{reg.contactPhone}</small>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${reg.status || 'new'}`}>{reg.status || 'New'}</span>
                                        </td>
                                        <td>
                                            <button className="btn-view" onClick={() => setSelectedReg(reg)}><FaEye /> Detalii</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="admin-section">
                    <h3>Manage Admins</h3>
                    <div className="admins-list">
                        <ul>
                            {admins.map(admin => (
                                <li key={admin.id}>
                                    <FaUserShield /> {admin.id}
                                    {admin.id !== user.email && (
                                        <button className="btn-delete" onClick={() => handleDeleteAdmin(admin.id)} title="Remove Admin"><FaTrash /></button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={handleAddAdmin} className="add-admin-form">
                        <input
                            type="email"
                            placeholder="Email address to authorize"
                            value={newAdminEmail}
                            onChange={(e) => setNewAdminEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Add Admin</button>
                    </form>
                </div>
            </div>

            {/* Details Modal */}
            {selectedReg && (
                <div className="admin-modal-overlay" onClick={() => setSelectedReg(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Detalii Înscriere</h3>
                            <button className="close-btn" onClick={() => setSelectedReg(null)}><FaTimes /></button>
                        </div>
                        <div className="modal-body">
                            <pre>{JSON.stringify(selectedReg, null, 2)}</pre>
                            {/* Improved display could go here, but JSON is requested "all details" */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;