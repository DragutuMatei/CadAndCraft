import React, { useState, useEffect, useMemo } from 'react';
import './Admin.scss';
import TeamDetailsModal from './TeamDetailsModal'; // Import Modal
import { auth, googleProvider, db } from '../../utils/fire';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, getDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { FaSignOutAlt, FaGoogle, FaTrash, FaEye, FaTimes, FaUserShield, FaSearch } from 'react-icons/fa';
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
    const [searchTerm, setSearchTerm] = useState(''); // New State for Search

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

    const handleStatusUpdate = async (teamId, newStatus) => {
        if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;

        try {
            await updateDoc(doc(db, "inscrieri", teamId), {
                status: newStatus
            });
            // Optimization: Local state will update via listener
            if (selectedReg && selectedReg.id === teamId) {
                setSelectedReg(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const normalizeYear = (val) => {
        if (!val) return 'N/A';
        let s = val.toString().trim().toLowerCase();
        s = s.replace(/anul|an|year/g, '').trim();

        // Roman to Number
        if (s === 'i' || s === '1') return 'Anul 1';
        if (s === 'ii' || s === '2') return 'Anul 2';
        if (s === 'iii' || s === '3') return 'Anul 3';
        if (s === 'iv' || s === '4') return 'Anul 4';

        // Master
        if (s.includes('master') || s === 'm1' || s === 'm2') return 'Master';

        return `Anul ${s.toUpperCase()}`; // Fallback
    };

    // --- Statistics Processing ---
    const stats = useMemo(() => {
        if (!registrations.length) return null;

        const timeline = {};
        const teamSizes = { '1': 0, '2': 0, '3': 0 };
        const environments = { 'highschool': 0, 'university': 0 };
        const hsClasses = {};
        const faculties = {};
        const cities = {};
        const uniYears = {};

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

            // Teams per City (Based on Captain's City)
            if (reg.member1City) {
                const city = reg.member1City.trim(); // Formatting could be improved
                cities[city] = (cities[city] || 0) + 1;
            }

            // Teams per Faculty (Only University)
            if (reg.teamEnvironment === 'university' && reg.member1Details) {
                // Often "Faculty of ..." or similar.
                const faculty = reg.member1Details.trim();
                faculties[faculty] = (faculties[faculty] || 0) + 1;

                // Years
                [1, 2, 3].forEach(i => {
                    const y = reg[`member${i}Year`];
                    if (y && i <= parseInt(reg.teamSize)) {
                        const norm = normalizeYear(y);
                        uniYears[norm] = (uniYears[norm] || 0) + 1;
                    }
                });

            } else if (reg.teamEnvironment === 'highschool') {
                // Keep class logic if desired, or skip
                [1, 2, 3].forEach(i => {
                    const details = reg[`member${i}Details`];
                    if (details && i <= parseInt(reg.teamSize)) {
                        const key = details.trim().toUpperCase();
                        hsClasses[key] = (hsClasses[key] || 0) + 1;
                    }
                });
            }
        });

        return { timeline, teamSizes, environments, hsClasses, faculties, cities, uniYears };
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
            label: 'Clase (Liceu)',
            data: stats ? Object.values(stats.hsClasses) : [],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
        }]
    };

    const chartFaculties = {
        labels: stats ? Object.keys(stats.faculties) : [],
        datasets: [{
            label: 'Echipe pe Facultate',
            data: stats ? Object.values(stats.faculties) : [],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
        }]
    };

    const chartCities = {
        labels: stats ? Object.keys(stats.cities) : [],
        datasets: [{
            label: 'Echipe pe Oraș',
            data: stats ? Object.values(stats.cities) : [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }]
    };

    const chartYears = {
        labels: stats ? Object.keys(stats.uniYears).sort() : [],
        datasets: [{
            label: 'Studenți pe An',
            data: stats ? Object.keys(stats.uniYears).sort().map(k => stats.uniYears[k]) : [],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }]
    };

    // --- Search Filtering ---
    const filteredRegistrations = useMemo(() => {
        if (!searchTerm.trim()) return registrations;

        const lowerTerm = searchTerm.toLowerCase();
        return registrations.filter(reg => {
            // Check main fields
            if (reg.teamName?.toLowerCase().includes(lowerTerm)) return true;
            if (reg.contactEmail?.toLowerCase().includes(lowerTerm)) return true;
            if (reg.id?.toLowerCase().includes(lowerTerm)) return true;

            // Check Members
            for (let i = 1; i <= 3; i++) {
                if (reg[`member${i}Name`]?.toLowerCase().includes(lowerTerm)) return true;
                if (reg[`member${i}City`]?.toLowerCase().includes(lowerTerm)) return true;
                if (reg[`member${i}Details`]?.toLowerCase().includes(lowerTerm)) return true; // Faculty/Class
                if (reg[`member${i}Institution`]?.toLowerCase().includes(lowerTerm)) return true; // Uni/HS Name
            }

            return false;
        });
    }, [registrations, searchTerm]);

    // --- Detailed Stats Component ---
    const StatsList = ({ title, data }) => (
        <div className="stats-list-box">
            <h4>{title}</h4>
            <ul>
                {Object.entries(data).sort((a, b) => b[1] - a[1]).map(([key, count]) => (
                    <li key={key}>
                        <span className="name">{key || 'N/A'}</span>
                        <span className="count">{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );


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
                            <h4>Clase (Liceu)</h4>
                            <Bar data={chartClasses} />
                        </div>
                        <div className="chart-box">
                            <h4>Facultăți</h4>
                            <Bar data={chartFaculties} />
                        </div>
                        <div className="chart-box">
                            <h4>Ani Studiu</h4>
                            <Bar data={chartYears} />
                        </div>
                        <div className="chart-box">
                            <h4>Orașe</h4>
                            <Bar data={chartCities} />
                            <StatsList title="Toate Orașele" data={stats ? stats.cities : {}} />
                        </div>
                    </div>
                    {/* Detailed Stats Lists Row for Universities/HS */}
                    <div className="stats-details-grid">
                        {stats && Object.keys(stats.faculties).length > 0 && (
                            <StatsList title="Toate Facultățile" data={stats.faculties} />
                        )}
                        {stats && Object.keys(stats.hsClasses).length > 0 && (
                            <StatsList title="Toate Clasele (Liceu)" data={stats.hsClasses} />
                        )}
                        {stats && Object.keys(stats.environments).length > 0 && (
                            <StatsList title="Mediu" data={stats.environments} />
                        )}
                        {stats && Object.keys(stats.uniYears).length > 0 && (
                            <StatsList title="Ani de Studiu" data={stats.uniYears} />
                        )}
                    </div>
                </div>

                <div className="admin-section">
                    <div className="section-header-row">
                        <h3>Înscrieri Recente ({filteredRegistrations.length})</h3>
                        <div className="search-bar">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Caută echipă, membru, oraș, școală..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
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
                                {filteredRegistrations.map(reg => (
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
                                            {(() => {
                                                const createdDate = reg.createdAt?.toDate ? reg.createdAt.toDate() : new Date();
                                                const isToday = createdDate.toLocaleDateString('ro-RO') === new Date().toLocaleDateString('ro-RO');
                                                const currentStatus = reg.status || 'new'; // Default to 'new' if missing

                                                let displayStatus = currentStatus;
                                                let badgeClass = currentStatus;

                                                // "statusul sa fie new doar daca e din ziua actuala"
                                                if (currentStatus === 'new' && !isToday) {
                                                    displayStatus = 'Pending';
                                                    badgeClass = 'pending';
                                                }

                                                return (
                                                    <span className={`status-badge ${badgeClass}`}>
                                                        {displayStatus}
                                                    </span>
                                                );
                                            })()}
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
                <TeamDetailsModal
                    team={selectedReg}
                    onClose={() => setSelectedReg(null)}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </div>
    );
};

export default Admin;