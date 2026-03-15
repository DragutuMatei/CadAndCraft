import React, { useState, useEffect, useMemo } from "react";
import emailjs from '@emailjs/browser';
import "./Admin.scss";
import TeamDetailsModal from "./TeamDetailsModal"; // Import Modal
import QRCode from "qrcode";
import { auth, googleProvider, db } from "../../utils/fire";
import { v4 as uuidv4 } from "uuid";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  addDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  FaSignOutAlt,
  FaGoogle,
  FaTrash,
  FaEye,
  FaTimes,
  FaUserShield,
  FaSearch,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
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
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import STATUS_CONFIRMARE from "../../utils/STATUS_CONFIRMARE";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Admin = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [selectedReg, setSelectedReg] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New State for Search
  const [accessToken, setAccessToken] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [gata, setGata] = useState("");
  const [isTableOpen, setIsTableOpen] = useState(false);

  const [accepteds, setAccepteds] = useState([]);
  const getAccepted = () => {
    const q = collection(db, "confirmari");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAccepteds(data);
    });
    return unsubscribe;
  };
  // Listen for auth state
  useEffect(() => {
    let unsubscribeConfirmari;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await checkAdminStatus(currentUser.email);
        unsubscribeConfirmari = getAccepted();
      } else {
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
      if (unsubscribeConfirmari) unsubscribeConfirmari();
    };
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
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistrations(data);
    });
    return unsubscribe;
  };

  const fetchAdmins = async () => {
    const q = query(collection(db, "admins"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id, // email is likely the ID
        ...doc.data(),
      }));
      setAdmins(data);
    });
    return unsubscribe;
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
      }
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
        addedAt: new Date(),
      });
      alert(`Admin ${newAdminEmail} added!`);
      setNewAdminEmail("");
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
    if (
      !window.confirm(`Are you sure you want to change status to ${newStatus}?`)
    )
      return;

    try {
      await updateDoc(doc(db, "inscrieri", teamId), {
        status: newStatus,
      });
      // Optimization: Local state will update via listener
      if (selectedReg && selectedReg.id === teamId) {
        setSelectedReg((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const normalizeYear = (val) => {
    if (!val) return "N/A";
    let s = val.toString().trim().toLowerCase();
    s = s.replace(/anul|an|year/g, "").trim();

    // Roman to Number
    if (s === "i" || s === "1") return "Anul 1";
    if (s === "ii" || s === "2") return "Anul 2";
    if (s === "iii" || s === "3") return "Anul 3";
    if (s === "iv" || s === "4") return "Anul 4";

    // Master
    if (s.includes("master") || s === "m1" || s === "m2") return "Master";

    return `Anul ${s.toUpperCase()}`; // Fallback
  };

  // --- Statistics Processing ---
  const stats = useMemo(() => {
    if (!registrations.length) return null;

    const timeline = {};
    const teamSizes = { 1: 0, 2: 0, 3: 0 };
    const environments = { highschool: 0, university: 0 };
    const hsClasses = {};
    const faculties = {};
    const cities = {};
    const uniYears = {};

    registrations.forEach((reg) => {
      // Timeline (Group by Day)
      const date = reg.createdAt?.toDate().toLocaleDateString("ro-RO");
      if (date) {
        timeline[date] = (timeline[date] || 0) + 1;
      }

      // Team Size
      if (reg.teamSize)
        teamSizes[reg.teamSize] = (teamSizes[reg.teamSize] || 0) + 1;

      // Environment
      if (reg.teamEnvironment)
        environments[reg.teamEnvironment] =
          (environments[reg.teamEnvironment] || 0) + 1;

      // Teams per City (Based on Captain's City)
      if (reg.member1City) {
        const city = reg.member1City.trim(); // Formatting could be improved
        cities[city] = (cities[city] || 0) + 1;
      }

      // Teams per Faculty (Only University)
      if (reg.teamEnvironment === "university" && reg.member1Details) {
        // Often "Faculty of ..." or similar.
        const faculty = reg.member1Details.trim();
        faculties[faculty] = (faculties[faculty] || 0) + 1;

        // Years
        [1, 2, 3].forEach((i) => {
          const y = reg[`member${i}Year`];
          if (y && i <= parseInt(reg.teamSize)) {
            const norm = normalizeYear(y);
            uniYears[norm] = (uniYears[norm] || 0) + 1;
          }
        });
      } else if (reg.teamEnvironment === "highschool") {
        // Keep class logic if desired, or skip
        [1, 2, 3].forEach((i) => {
          const details = reg[`member${i}Details`];
          if (details && i <= parseInt(reg.teamSize)) {
            const key = details.trim().toUpperCase();
            hsClasses[key] = (hsClasses[key] || 0) + 1;
          }
        });
      }
    });

    return {
      timeline,
      teamSizes,
      environments,
      hsClasses,
      faculties,
      cities,
      uniYears,
    };
  }, [registrations]);

  // --- Chart Configs ---
  const chartTimeline = {
    labels: stats ? Object.keys(stats.timeline) : [],
    datasets: [
      {
        label: "Înscrieri pe Zile",
        data: stats ? Object.values(stats.timeline) : [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartTeamSize = {
    labels: ["1 Persoană", "2 Persoane", "3 Persoane"],
    datasets: [
      {
        label: "Mărime Echipă",
        data: stats
          ? [stats.teamSizes["1"], stats.teamSizes["2"], stats.teamSizes["3"]]
          : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
      },
    ],
  };

  const chartEnv = {
    labels: ["Liceu", "Facultate"],
    datasets: [
      {
        label: "Mediu",
        data: stats
          ? [stats.environments["highschool"], stats.environments["university"]]
          : [],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const chartClasses = {
    labels: stats ? Object.keys(stats.hsClasses) : [],
    datasets: [
      {
        label: "Clase (Liceu)",
        data: stats ? Object.values(stats.hsClasses) : [],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  const chartFaculties = {
    labels: stats ? Object.keys(stats.faculties) : [],
    datasets: [
      {
        label: "Echipe pe Facultate",
        data: stats ? Object.values(stats.faculties) : [],
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  const chartCities = {
    labels: stats ? Object.keys(stats.cities) : [],
    datasets: [
      {
        label: "Echipe pe Oraș",
        data: stats ? Object.values(stats.cities) : [],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const chartYears = {
    labels: stats ? Object.keys(stats.uniYears).sort() : [],
    datasets: [
      {
        label: "Studenți pe An",
        data: stats
          ? Object.keys(stats.uniYears)
            .sort()
            .map((k) => stats.uniYears[k])
          : [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // --- Export Google Sheets ---
  const exportToGoogleSheets = async () => {
    if (!registrations || registrations.length === 0) {
      alert("Nu există înscrieri de exportat.");
      return;
    }

    let token = accessToken;

    // Automatically prompt for sheet scope consent if missing
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/spreadsheets");
      provider.addScope("https://www.googleapis.com/auth/drive"); // Full drive scope to access the specific folder/search

      // Force the consent screen to ensure the new 'drive' scope is actually granted
      // otherwise Firebase might silently reused a cached token with only the old 'drive.file' scope.
      provider.setCustomParameters({
        prompt: "consent",
      });

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      token = credential?.accessToken;
      if (token) setAccessToken(token);
    } catch (error) {
      console.error("Auth failed:", error);
      alert(
        "Autentificarea a eșuat. Aveți nevoie de permisiuni Google Sheets și Drive.",
      );
      return;
    }

    if (!token) {
      alert("Nu s-a putut obține token-ul Google pentru export.");
      return;
    }

    setIsExporting(true);

    const headers = [
      "ID",
      "Data Înscrierii",
      "Nume Echipă",
      "Mărime Echipă",
      "Mediu",
      "Email Contact",
      "Telefon Contact",
      "Status",
      "Membru 1 Nume",
      "Membru 1 Email",
      "Membru 1 Telefon",
      "Membru 1 Oraș",
      "Membru 1 Instituție",
      "Membru 1 Detalii/Clasă/Facultate",
      "Membru 1 An",
      "Membru 1 Discord",
      "Membru 1 Tricou",
      "Membru 2 Nume",
      "Membru 2 Email",
      "Membru 2 Telefon",
      "Membru 2 Oraș",
      "Membru 2 Instituție",
      "Membru 2 Detalii/Clasă/Facultate",
      "Membru 2 An",
      "Membru 2 Discord",
      "Membru 2 Tricou",
      "Membru 3 Nume",
      "Membru 3 Email",
      "Membru 3 Telefon",
      "Membru 3 Oraș",
      "Membru 3 Instituție",
      "Membru 3 Detalii/Clasă/Facultate",
      "Membru 3 An",
      "Membru 3 Discord",
      "Membru 3 Tricou",
    ];

    const rows = registrations.map((reg) => {
      const date = reg.createdAt?.toDate
        ? reg.createdAt.toDate().toLocaleString("ro-RO")
        : reg.submittedAt || "";
      return [
        reg.id || "",
        date,
        reg.teamName || "",
        reg.teamSize || "",
        reg.teamEnvironment || "",
        reg.contactEmail || "",
        reg.contactPhone || "",
        reg.status || "",
        reg.member1Name || "",
        reg.member1Email || "",
        reg.member1Phone || "",
        reg.member1City || "",
        reg.member1Institution || "",
        reg.member1Details || "",
        reg.member1Year || "",
        reg.member1Discord || "",
        reg.member1Tshirt || "",
        reg.member2Name || "",
        reg.member2Email || "",
        reg.member2Phone || "",
        reg.member2City || "",
        reg.member2Institution || "",
        reg.member2Details || "",
        reg.member2Year || "",
        reg.member2Discord || "",
        reg.member2Tshirt || "",
        reg.member3Name || "",
        reg.member3Email || "",
        reg.member3Phone || "",
        reg.member3City || "",
        reg.member3Institution || "",
        reg.member3Details || "",
        reg.member3Year || "",
        reg.member3Discord || "",
        reg.member3Tshirt || "",
      ].map((val) => String(val));
    });

    try {
      const folderId = "1Cci5Yhbf8qTGsZkQZGfBfdaoIrvPMF-2";
      const fileName = "Inscrieri CAD&Craft Export";

      // In loc de search (care da gres din cauza problemelor de api/permisiuni Google Drive pentru aplicatii terte nevalidate),
      // Salvam ID-ul fisierului creat direct in Firebase pentru a-l refolosi de fiecare data.
      const configRef = doc(db, "config", "export");
      const configSnap = await getDoc(configRef);

      let spreadsheetId = null;
      let isNewFile = false;

      if (configSnap.exists() && configSnap.data().spreadsheetId) {
        spreadsheetId = configSnap.data().spreadsheetId;
        console.log(
          "Found existing spreadsheet ID in Firebase:",
          spreadsheetId,
        );
      } else {
        // Nu exista ID salvat in Firebase, creăm fisierul
        isNewFile = true;
        const createRes = await fetch(
          "https://sheets.googleapis.com/v4/spreadsheets",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              properties: {
                title: fileName,
              },
            }),
          },
        );

        if (!createRes.ok) {
          const errData = await createRes.json();
          console.error("API Sheets error (create):", errData);
          throw new Error("Eroare la crearea fișierului Sheets automat.");
        }

        const sheetData = await createRes.json();
        spreadsheetId = sheetData.spreadsheetId;

        // Move the newly created file to the specific folder
        const getFileRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${spreadsheetId}?fields=parents&supportsAllDrives=true`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (getFileRes.ok) {
          const fileMeta = await getFileRes.json();
          const previousParents = fileMeta.parents
            ? fileMeta.parents.join(",")
            : "";

          await fetch(
            `https://www.googleapis.com/drive/v3/files/${spreadsheetId}?addParents=${folderId}&removeParents=${previousParents}&supportsAllDrives=true`,
            {
              method: "PATCH",
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        }

        // Salvam ID-ul in Firebase ca sa dam overwrite data viitoare
        try {
          await setDoc(
            configRef,
            { spreadsheetId: spreadsheetId },
            { merge: true },
          );
          console.log("Saved new spreadsheet ID to Firebase config/export");
        } catch (firebaseErr) {
          console.error(
            "Nu s-a putut salva ID-ul fisierului in DB. La urmatoarea exportare va face alt fisier nou.",
            firebaseErr,
          );
        }
      }

      // 3. Clear existing data to ensure we don't have left-over rows if the new data is smaller
      if (!isNewFile) {
        // Testam daca fisierul vechi chiar mai exista sau l-a sters manual userul
        const clearRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z:clear`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!clearRes.ok) {
          const errorData = await clearRes.json();
          if (errorData.error?.status === "NOT_FOUND") {
            console.log(
              "Sheet-ul vechi salvat in baza de date a fost sters. Resetam...",
            );
            // Fisierul a fost sters din Drive, stergem id-ul din baza de date si cerem userului sa mai dea click o data
            await deleteDoc(configRef);
            setIsExporting(false);
            alert(
              "Fișierul vechi folosit pentru export a fost șters din Drive manual. Am resetat legătura în sistem.\nTe rog APASĂ DIN NOU BUTONUL de EXPORT pentru a crea unul nou.",
            );
            return; // oprim
          } else {
            // Alta eroare la clear (ex: permisiuni)
            throw new Error(
              `Nu s-a putut curăța fișierul existent. Eroare: ${errorData.error?.message}`,
            );
          }
        }
      }

      // 4. Update the spreadsheet with new data using PUT
      const updateRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            range: "A1",
            majorDimension: "ROWS",
            values: [headers, ...rows],
          }),
        },
      );

      if (!updateRes.ok) {
        const errData = await updateRes.json();
        console.error("API Sheets error (update):", errData);
        throw new Error(
          "Datele nu au putut fi salvate în fișier (Eroare " +
          (errData.error?.message || updateRes.status) +
          ").",
        );
      }

      // 5. Format the Spreadsheet (Bold Headers, Auto-resize columns, Background color)
      const formatData = {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: headers.length,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 }, // Dark Gray
                  textFormat: {
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, // White Text
                    bold: true,
                    fontSize: 11,
                  },
                  horizontalAlignment: "CENTER",
                  verticalAlignment: "MIDDLE",
                },
              },
              fields:
                "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)",
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: headers.length,
              },
            },
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId: 0,
                gridProperties: {
                  frozenRowCount: 1, // Freeze header row
                },
              },
              fields: "gridProperties.frozenRowCount",
            },
          },
        ],
      };

      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatData),
        },
      );

      window.open(
        `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
        "_blank",
      );
    } catch (error) {
      console.error("Export error:", error);
      alert("A apărut o eroare: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  // --- Search Filtering ---
  const filteredRegistrations = useMemo(() => {
    if (!searchTerm.trim()) return registrations;

    const lowerTerm = searchTerm.toLowerCase();
    return registrations.filter((reg) => {
      // Check main fields
      if (reg.teamName?.toLowerCase().includes(lowerTerm)) return true;
      if (reg.contactEmail?.toLowerCase().includes(lowerTerm)) return true;
      if (reg.id?.toLowerCase().includes(lowerTerm)) return true;

      // Check Members
      for (let i = 1; i <= 3; i++) {
        if (reg[`member${i}Name`]?.toLowerCase().includes(lowerTerm))
          return true;
        if (reg[`member${i}City`]?.toLowerCase().includes(lowerTerm))
          return true;
        if (reg[`member${i}Details`]?.toLowerCase().includes(lowerTerm))
          return true; // Faculty/Class
        if (reg[`member${i}Institution`]?.toLowerCase().includes(lowerTerm))
          return true; // Uni/HS Name
      }

      return false;
    });
  }, [registrations, searchTerm]);

  // --- Detailed Stats Component ---
  const StatsList = ({ title, data }) => (
    <div className="stats-list-box">
      <h4>{title}</h4>
      <ul>
        {Object.entries(data)
          .sort((a, b) => b[1] - a[1])
          .map(([key, count]) => (
            <li key={key}>
              <span className="name">{key || "N/A"}</span>
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
        <p>
          Your email <strong>{user.email}</strong> is not on the allowlist.
        </p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  const prepare = async () => {
    setGata(false);
    const q = query(
      collection(db, "inscrieri"),
      where("status", "==", "accepted"),
    );
    const refs = await getDocs(q);
    refs.forEach(async (ref) => {
      const data = ref.data();
      console.log("Preparing team:", data.teamName);
      if (data.member3Email) {
        await addDoc(collection(db, "confirmari"), {
          secure_id: uuidv4(),
          email: data.member3Email,
          status: STATUS_CONFIRMARE.NECONFIRMAT,
          createdAt: serverTimestamp(),

        });
      }

      if (data.member2Email) {
        await addDoc(collection(db, "confirmari"), {
          secure_id: uuidv4(),
          email: data.member2Email,
          createdAt: serverTimestamp(),
          status: STATUS_CONFIRMARE.NECONFIRMAT,
        });
      }

      if (data.member1Email) {
        await addDoc(collection(db, "confirmari"), {
          secure_id: uuidv4(),
          email: data.member1Email,
          createdAt: serverTimestamp(),
          status: STATUS_CONFIRMARE.NECONFIRMAT,
        });
      }
    });
    setGata(true);
  };
  const sendmails = async () => {
    const data =
      await getDocs(collection(db, "confirmari"));
      // [
      //   {
      //     email: "mateidr7@gmail.com",
      //     secure_id: "85aca453-86a1-9c4c-a2e8-a9dd3402722t",
      //     status: "neconfirmat",
      //   },
      // ];

    data.forEach(async (d) => {
      const link = `${process.env.REACT_APP_LINK}/formular/?id=${d.secure_id}&mail=${d.email}`;

      const linkQR = `${process.env.REACT_APP_LINK}/admin/confirmare/verif/?id=${d.secure_id}`;
      const qrDataUrl = await QRCode.toDataURL(linkQR);
      console.log("Generated QR code data URL:", qrDataUrl);

      await emailjs.send(process.env.REACT_APP_M_ID, process.env.REACT_APP_ACCEPT, {
        secure_id: d.secure_id,
        email: d.email,
        qrUrl: qrDataUrl,
      }, process.env.REACT_APP_M_PUBLIC);

    });
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>CAD&Craft Admin</h2>
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt />
          </button>
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
              <div
                style={{
                  maxHeight: "200px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
              <StatsList
                title="Toate Orașele"
                data={stats ? stats.cities : {}}
              />
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
            <h3
              onClick={() => setIsTableOpen(!isTableOpen)}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", userSelect: "none" }}
              title="Apasă pentru a ascunde / afișa tabelul"
            >
              Înscrieri Recente ({filteredRegistrations.length})
              <span style={{ fontSize: "14px", color: "#666" }}>
                {isTableOpen ? "▲ ascunde" : "▼ afișează"}
              </span>
            </h3>
            <div
              className="header-actions"
              style={{ display: "flex", gap: "15px", alignItems: "center" }}
            >
              <button
                onClick={exportToGoogleSheets}
                disabled={isExporting}
                className="btn-export"
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#109D59",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isExporting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  opacity: isExporting ? 0.7 : 1,
                }}
              >
                {isExporting ? (
                  <FaSpinner
                    className="fa-spin"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <FaDownload />
                )}
                {isExporting ? "Se creează..." : "Export to Google Sheets"}
              </button>
              <button
                onClick={async () => await prepare()}
                className="btn-prepare"
              >
                {gata == ""
                  ? "Put accepted in baza de date"
                  : gata
                    ? "Gata!"
                    : "Loading"}
              </button>
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
          </div>
          {isTableOpen && (
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
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id}>
                      <td>
                        {reg.submittedAt || "N/A"}
                        <br />
                        <small style={{ color: "#999" }}>
                          {reg.id.slice(0, 5)}...
                        </small>
                      </td>
                      <td>{reg.teamName || "Individual"}</td>
                      <td>
                        <span style={{ fontWeight: "bold" }}>{reg.teamSize}</span>
                        <span style={{ fontSize: "0.8em", color: "#666" }}>
                          {" "}
                          ({reg.teamEnvironment === "highschool" ? "Lic" : "Univ"}
                          )
                        </span>
                      </td>
                      <td>
                        {reg.contactEmail}
                        <br />
                        <small>{reg.contactPhone}</small>
                      </td>
                      <td>
                        {(() => {
                          const createdDate = reg.createdAt?.toDate
                            ? reg.createdAt.toDate()
                            : new Date();
                          const isToday =
                            createdDate.toLocaleDateString("ro-RO") ===
                            new Date().toLocaleDateString("ro-RO");
                          const currentStatus = reg.status || "new"; // Default to 'new' if missing

                          let displayStatus = currentStatus;
                          let badgeClass = currentStatus;

                          // "statusul sa fie new doar daca e din ziua actuala"
                          if (currentStatus === "new" && !isToday) {
                            displayStatus = "Pending";
                            badgeClass = "pending";
                          }

                          return (
                            <span className={`status-badge ${badgeClass}`}>
                              {displayStatus}
                            </span>
                          );
                        })()}
                      </td>
                      <td>
                        <button
                          className="btn-view"
                          onClick={() => setSelectedReg(reg)}
                        >
                          <FaEye /> Detalii
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="admin-section">
          <div className="section-header-row">
            <h3>Confirmări Prezență (Live)</h3>
            <div className="header-actions">
              <button onClick={async () => await sendmails()} className="btn-export"
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#109D59",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}>
                Trimite Email-uri Check-IN
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nume Participant</th>
                  <th>Echipă</th>
                  <th>Vârsta</th>
                  <th>Email</th>
                  <th>Acord Parental</th>
                  <th>Status Check-IN</th>
                </tr>
              </thead>
              <tbody>
                {accepteds &&
                  accepteds.map((a, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {a?.nume} {a?.prenume}
                        </td>
                        <td>{a?.echipa}</td>
                        <td>{a?.varsta}</td>
                        <td>{a?.email}</td>
                        <td>
                          {a?.acordParental
                            ? a?.varsta === "minor"
                              ? "Are"
                              : "E major, nu are nevoie"
                            : "Nu are"}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${a?.status || "pending"}`}
                          >
                            {a?.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="admin-section">
          <h3>Manage Admins</h3>
          <div className="admins-list">
            <ul>
              {admins.map((admin) => (
                <li key={admin.id}>
                  <FaUserShield /> {admin.id}
                  {admin.id !== user.email && (
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteAdmin(admin.id)}
                      title="Remove Admin"
                    >
                      <FaTrash />
                    </button>
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
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAYAAADApo5rAAANlUlEQVR4AeyWgXLcOAxD8+7//7k3t+2lS7QRl6Fky150pqkRkiAEFTP654f/2AE78OnAPx/+YwfswKcDDsSnFf6wAx8fDoT/F9iBJwcciCcz/GkHLhQIX5YdWO+AA7HeY2+4kAMOxIUuy1LXO+BArPfYGy7kgANxocuy1PUOOBArPDbnZR1wIC57dRa+wgEHYoWr5rysAw7EZa/Owlc44ECscNWcl3XAgbjs1c0RbpboQDsQwAcc9zfKX4+gdjZVBOfOqx7FMNaX9WtdMYz5YW5d91dxOxDVhe63Azs74EDsfDvWdrgDDsThlnvhzg5MD8SPHz8+Zv7tmgfjN2rGn50lm9d6l687D9EP5VO9irUfIp/2K9b5Av7r/yvl7+LpgegK8rwdONMBB+JM9717OwcciO2uxILOdGB5ICC+MWGMq2ZA5NN5faNqHeI8RKz9ijP+rA7jfdm86lEMY37o1Wfrg6gHItbzzcbLAzFbsPnswEoH5gRipUJz24EDHXAgDjTbq/Z34PaBgPgGzd68Woc4X71SqM1D7IeIq/v1PDqv9Qzr/N3w7QNxtwvzedY64ECs9dfsF3Pg7QJxsfux3IMduH0g9E0MvTe53g+M+bL9Wld+rUPcBzU8mw/iftV/NXz7QFztQqz3XAcciHP99/bNHHAgNrsQyznXgeWB0Ddrhs+148/tqhfim1nrfzLE32g/RL6n7r9+6rzivw49/RLivmxe64qfqL/1qXwZ/taSwtDyQBS0uNUOnO6AA3H6FVjATg44EDvdhrWc7sD0QEB8o0IPdx2CuF/fqBk/jOch1pUPxnXtV30wnodY1/kqv85D5Fe+KobIBz1c3Z/1Tw9EttD1OzpwnzM5EPe5S59kggMOxAQTTXEfB9qB0DfnajzbetUL8U1brXf1wbn7Vb+eX+sZ1vnVONOT1duByBa4bgeu5IADcaXbsta+AwmDA5EY5PJ7OdAOBMQ3r9oHsQ49rPz6Jq3Wq/3ZPojn034Y17Vf9WUYIr/2Q6zrPoj16nzWD5Efalj5Z+N2IGYLMp8dONMBB+JM9717OwcciO2uxILOdKAdiOwNqnXFT4d/fGpdMYzfnA+Spx8w7odYfxp9fEKswxg/hp5+QOx/Kj0+YW5d/XosefqhdYj7s/oT1eMT4jxE/Gh6+qH8T6XHZ1aHMf+DpPGjHYjGbo/age0ccCC2uxILOtMBB+JM9717OwemB0LfgBDffBBx5gj0+lVPhjM92bzWlS+ra79inVes/Yoh+lmd1/4Md/dX+XVfFU8PRFXANfut+q4OOBB3vVmf61sOOBDfss1Dd3WgHQiIb9LZRnXfkBD1QcSZXt2v/VDj03nlhzEfxDpErPxdrPqUD8b7dV4xxHmIuLpP+6u4HYjqQvfbgZ0dcCB2vp0Z2sxRcsCBKNnl5rs7cHgg9A2pGOIbEiLOLkT5tF/rEPkhYp1XnPFpf4aVr4phrF/5VA+M56FX131VPVm/8lfx4YGoCnS/HTjSAQfiSLe9a3sHHIjtr+h9BO5w0uWByN58MH6TZvNqIoz5tH82Vr2KdR/09EKcr+6D2rzyK9bzKYa4DyLWfsUQ+yFi7a/i5YGoCnK/HTjTAQfiTPe9ezsHHIjtrsSCznSgHQh9Q0J800HEelid1zrEeYhY+zMM43nVA7EfIs72aR3ifLZP5xVn81rPsPJD1NutV/frvu688il+MRA6ZmwH7umAA3HPe/WpvumAA/FN4zx2TwfagYDxG1PffBD7IWK1WecznM1X69qvGMb6oVfXfYoh8qs/EOvZvNaVr1rXfhjr0f5sP9T4lF9xOxBKaGwHruzA/QJx5duw9tMdcCBOvwIL2MmBdiD0jacYxm887VcMcR4iXm2m6slwVc9sPoj+KH+mD+I8RJzNa726X/sh7oeItV/3V3E7ENWF7rcDOzvgQOx8O9Z2uAMOxOGW/17or/0cmB4ImPvG0zeiYoj71GKI9ep8xgeRHyLWfVW+rD/j13nFOq9Y+yGeDyLO+pUfxvPan/FrvYqnB6IqwP12YCcHHIidbsNaTnfAgTj9CixgJwfagYD4BszefFkdIh+MccanZkPk03mIdZ3XfsXar7jan83DWC/EOoyx7vuFP/9R/VX8SfTFB0R9X7R9/lr3fxa++dEOxDf3eswObOmAA7HltVjUWQ44EGc5771bOjA9EBDfgBCxugDjevZGhPG87qtiGPNDr149H4z36fmUP8PZPMT9UMPKr1j1aV0xxP1ar+LpgagKcL8dmOtAj82B6Pnn6Zs54EDc7EJ9nJ4D7UDomy/DKjfrh7lvRN2vONOj/YqzeYjngYirfFk/RH4YY+WD2J+dL6tD5Mv2QexXfp3v4nYgugI8bwd2csCB2Ok2rOV0Bw4NxOmntQA7kDgwPRAQ33zJ/rScvRm1rjhdIA0w1g+1Ooz7M70Q5yFikf8HVH7FfwzIL7Qf4n6oYaFPYbY/JSg2TA9Ecb/b7cBWDjgQW12HxZztgANx9g14/1YOTA9E980H4zepuge1ftWnfL/w5z8Q+T8Lvz6Ur4p/0Xz5T8angzDWC7U6xP5Mj9ZV3+x6xqf7Mzw9ENlC1+3Azg44EDvfjrUd7oADcbjlXrizA8sDoW88iG/SzBydV5zNZ3Wo6cn4qnWo7YfYr34ohnG/6tV5xRD5dF6xzmu9iiHuh4irfNq/PBC60Hi2A+ab6YADMdNNc13eAQfi8lfoA8x0YHkgYPzGg169a0b2xtW6Yoj6IeJMn/Ip1vmsDr39MJ7v7ofIn/FVz6/9Vbw8EFVB7rcDZzrgQJzp/rvtvsB5HYgLXJIlHudAOxAQ34QQcfZG1HqGq9Yon85D1Kv1DCu/Yoj8sBbr/kw/RD06D7EOY5zNZ3WI/Jl+5cv6s3o7ENkC1+3AlRxwIK50W9a63AEHYrnFXnAlB/4PxGGaq28+iG9KiLjKVz0oxH0wxsqv+hRn/dU6RH26D2r11fur/No/Gx8eiNkHMJ8dmOmAAzHTTXNd3gEH4vJX6APMdGB6IPTNqmIhvmG1rlj5FGu/Yli7b7YeiHqVH2Jdz6v9WlcMkS+bh9ivfF0Ma/kzfdMDkS3s181gB9Y54ECs89bMF3TAgbjgpVnyOgeWBwLGb0KIdajhddb8ZIao5+dvf/+EWIeIf3e+9qVveKjxQeyHiJVfVUGtP+NTfu1XrP0Q9VTr2p/h5YHIBLhuB3ZywIFYeRvmvpwDDsTlrsyCVzqwPBD6RpyN1Rzl13qGIb5ZMz6tK4Yxn/arPq1nOJuHsR6dh3E/xLrOK4bYDxFn54PYr/xdvDwQXYGetwNHOuBAHOm2d23vgAOx/RUdI9BbfjqwPBAQ33wQ8U8ZX/+E2A9jrEz6JoU43+2HMZ/yK4Y4Dz1cPS/EfTqvGHr9ev6MH2r7lL+KlweiKsj9duBMBxyIM9337u0ccCC2uxILOtOB5YHQN2J2WBi/GbN5rUPk03oXV8+n+64+D4f7qxZOxcsDMVWtyezAYgcciMUGm/5aDjgQ17ovq13swPJAQO+NCXG++ubO+rUO431Zf/W+YLyvy9edh6gv44Nef+Yv1PgzvVpfHghdaGwHdnZgbiB2Pqm12YEXHHAgXjDJLe/jQDsQ+uZT67SuuNuv84ohvjmr+2fzwbF69LyKIerR82q/1hVrf4Z1HqIenc/6tV7F7UBUF7rfDuzsgAOx8+1Y2+EOvG0gDnfaCy/hQDsQEN98sBarq/rGhLhf6zpfxVU+GOuBWFc9EOu6X7HOK4bIp/XZGGr7svNoXXFXfzsQXQGetwM7OeBA7HQb1nK6Aw7E6VdgATs5MD0Q+qbr4swsiG9U3ZfNax0in9YVw7g/0/NC/eO5p7ofevogzj9r+e9b9Sj+r+f5r9Z3w9MDsdsBrccOVBxwICpuuff2DjgQt79iH7DiwPJAQHyDwhhXxL/SC3GfzsC4fnY/1PSp3uf3+9++u/06D1EvjHF3HiK/8lXx8kBUBbn/yg5cX7sDcf079AkmOuBATDTTVNd34PaB0HczxDen1hV3r1j5IO6HiHVfNq91nYcxv/YrhvF8tr9az/pVX7Vf5xXfPhB6YGM7MHLAgRi549p9HfjiZA7EF8b41+/pwO0CAfHNCxHrmxNiHSLO/ltkfDqv/VrPcHce4vkg4my/1mE8D7U6xH49r2LV08W3C0TXEM+/twMOxHvfv08vDjgQYojhezuwPBD65svwx8dH6Ua6fDqvy2H8poVaXfmz/dqvGOJ+rXf5dR7G+3S/YuWr1qG3X/cpXh4IXWhsB3Z2wIHY+Xas7XAHHIjDLffCnR2YHgiIbzzo4cw8iPzan71ZYTyvfBD7lR9qdeVXPq1Dj1/5dB9Efu1XrPMZhhp/tk/rXTw9EF1B15q32rs54EDc7UZ9npYDDkTLPg/fzYF2ILI34+y6XoDyaz3DOl/Fyq/z1br2K+7yr55XvYp1v2LtPxq3A3G0YO+zAysdcCBWursTt7W85IAD8ZJNbnoXBxyId7lpn/MlBxyIl2xy07s44EC8y037nC854EC8ZJObjnTgzF0OxJnue/d2DjgQ212JBZ3pgANxpvvevZ0DDsR2V2JBZzrgQJzpvndv50AxENvptyA7MNUBB2KqnSa7ugMOxNVv0PqnOvAvAAAA//8/w4ixAAAABklEQVQDAF6cD+E5LJxKAAAAAElFTkSuQmCC" width="200" alt="" />
    </div>
  );
};

export default Admin;
