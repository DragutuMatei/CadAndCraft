import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  FaEdit,
  FaCheck,
  FaPaperPlane,
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
  const navigate = useNavigate();
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
  const [confirmariSearchTerm, setConfirmariSearchTerm] = useState("");
  const [isMailing, setIsMailing] = useState(false);
  const [mailingStatus, setMailingStatus] = useState({ total: 0, current: 0, successes: 0, errors: 0, details: [] });
  const [editingEmailId, setEditingEmailId] = useState(null);
  const [tempEmail, setTempEmail] = useState("");
  const [resendingEmailId, setResendingEmailId] = useState(null);

  const [accepteds, setAccepteds] = useState([]);
  const getAccepted = () => {
    const q = collection(db, "confirmari");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
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

  const filteredConfirmari = useMemo(() => {
    if (!confirmariSearchTerm.trim()) return accepteds;
    const lowerTerm = confirmariSearchTerm.toLowerCase();
    return accepteds.filter((a) => a.email?.toLowerCase().includes(lowerTerm));
  }, [accepteds, confirmariSearchTerm]);

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
    if (isMailing) return;
    
    const querySnapshot = await getDocs(collection(db, "confirmari"));
    const total = querySnapshot.docs.length;
    
    if (total === 0) {
      alert("Nu există email-uri de trimis.");
      return;
    }

    if (!window.confirm(`Ești sigur că vrei să trimiți ${total} email-uri?`)) return;

    setIsMailing(true);
    setMailingStatus({ total, current: 0, successes: 0, errors: 0, details: [] });

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const d = querySnapshot.docs[i];
      const docData = d.data();
      const email = docData.email;
      
      try {
        const linkQR = `${process.env.REACT_APP_LINK}/admin/confirmare/verif/?id=${docData.secure_id}`;
        const qrDataUrl = await QRCode.toDataURL(linkQR);
        
        await emailjs.send(process.env.REACT_APP_M_ID, process.env.REACT_APP_TEM_ID, {
          secure_id: docData.secure_id,
          email: email,
          qrUrl: qrDataUrl,
        }, process.env.REACT_APP_M_PUBLIC);
        
        setMailingStatus(prev => ({
          ...prev,
          current: i + 1,
          successes: prev.successes + 1,
          details: [...prev.details, { email, status: 'success' }]
        }));
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        setMailingStatus(prev => ({
          ...prev,
          current: i + 1,
          errors: prev.errors + 1,
          details: [...prev.details, { email, status: 'error', error: error.message }]
        }));
      }
    }
    
    setIsMailing(false);
    alert(`Proces finalizat: ${querySnapshot.docs.length} email-uri procesate.`);
  };

  const handleUpdateEmail = async (id, newEmail) => {
    if (!newEmail || !newEmail.includes('@')) {
      alert("Te rog introdu o adresă de email validă.");
      return;
    }
    try {
      const docRef = doc(db, "confirmari", id);
      await updateDoc(docRef, { email: newEmail });
      setEditingEmailId(null);
      alert("Email actualizat cu succes!");
    } catch (error) {
      console.error("Error updating email:", error);
      alert("Eroare la actualizarea email-ului.");
    }
  };

  const handleSingleResend = async (record) => {
    if (resendingEmailId) return;
    if (!window.confirm(`Vrei să retrimiti email-ul către ${record.email}?`)) return;

    setResendingEmailId(record.id);
    try {
      const linkQR = `${process.env.REACT_APP_LINK}/admin/confirmare/verif/?id=${record.secure_id}`;
      const qrDataUrl = await QRCode.toDataURL(linkQR);
      
      await emailjs.send(process.env.REACT_APP_M_ID, process.env.REACT_APP_TEM_ID, {
        secure_id: record.secure_id,
        email: record.email,
        qrUrl: qrDataUrl,
      }, process.env.REACT_APP_M_PUBLIC);
      
      alert(`Email trimis cu succes către ${record.email}!`);
    } catch (error) {
      console.error(`Error sending email to ${record.email}:`, error);
      alert(`Eroare la trimiterea email-ului: ${error.message}`);
    } finally {
      setResendingEmailId(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <h2>CAD&Craft Admin</h2>
          <div className="admin-quick-actions">
            <button onClick={() => navigate('/admin/confirmare/check')} className="admin-action-btn btn-primary">
              <span className="icon">📷</span> Scan QR
            </button>
            <button onClick={() => navigate('/admin/printers')} className="admin-action-btn btn-warning">
              <span className="icon">🔌</span> Imprimante
            </button>
          </div>
        </div>

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
            <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div className="search-bar">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Caută după email..."
                  value={confirmariSearchTerm}
                  onChange={(e) => setConfirmariSearchTerm(e.target.value)}
                />
              </div>
              <button onClick={async () => { console.log(uuidv4());console.log(await serverTimestamp()) }}>generate id</button>
              <button 
                onClick={async () => await sendmails()} 
                className="btn-export"
                disabled={isMailing}
                style={{
                  padding: "8px 12px",
                  backgroundColor: isMailing ? "#ccc" : "#109D59",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isMailing ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}>
                {isMailing ? <FaSpinner className="spinner" /> : null}
                {isMailing ? `Se trimit... (${mailingStatus.current}/${mailingStatus.total})` : "Trimite Email-uri Check-IN"}
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
                  <th style={{ textAlign: "center" }}>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {filteredConfirmari &&
                  filteredConfirmari.map((a, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {a?.nume} {a?.prenume}
                        </td>
                        <td>{a?.echipa}</td>
                        <td>{a?.varsta}</td>
                        <td style={{ minWidth: "250px" }}>
                          {editingEmailId === a.id ? (
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                              <input
                                type="email"
                                value={tempEmail}
                                onChange={(e) => setTempEmail(e.target.value)}
                                style={{
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  border: "1px solid #3b82f6",
                                  fontSize: "0.9rem",
                                  width: "100%",
                                  outline: "none",
                                }}
                                autoFocus
                              />
                              <button
                                onClick={() => handleUpdateEmail(a.id, tempEmail)}
                                style={{
                                  background: "#109D59",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  padding: "5px 8px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                title="Salvează"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => setEditingEmailId(null)}
                                style={{
                                  background: "#d32f2f",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  padding: "5px 8px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                title="Anulează"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span>{a?.email}</span>
                              <button
                                onClick={() => {
                                  setEditingEmailId(a.id);
                                  setTempEmail(a.email);
                                }}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "#666",
                                  cursor: "pointer",
                                  padding: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  transition: "color 0.2s",
                                }}
                                className="edit-email-btn"
                                title="Editează Email"
                              >
                                <FaEdit />
                              </button>
                            </div>
                          )}
                        </td>
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
                        <td style={{ textAlign: "center" }}>
                          <button
                            onClick={() => handleSingleResend(a)}
                            disabled={resendingEmailId === a.id}
                            title="Retrimite Email cu noile date"
                            style={{
                              background: resendingEmailId === a.id ? "#ccc" : "#3b82f6",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              padding: "8px 12px",
                              cursor: resendingEmailId === a.id ? "not-allowed" : "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background 0.2s",
                            }}
                          >
                            {resendingEmailId === a.id ? (
                              <FaSpinner className="fa-spin" style={{ animation: "spin 1s linear infinite" }} />
                            ) : (
                              <FaPaperPlane />
                            )}
                          </button>
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

      {/* Mailing Progress Modal */}
      {(isMailing || mailingStatus.details.length > 0) && (
        <div className="admin-modal-overlay" style={{ zIndex: 1100 }}>
          <div className="admin-modal" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2>Status Trimitere Email-uri</h2>
              {!isMailing && (
                <button className="close-btn" onClick={() => setMailingStatus({ total: 0, current: 0, successes: 0, errors: 0, details: [] })}>
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="modal-scroll-content">
              <div className="mailing-progress-summary" style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Progres: <strong>{mailingStatus.current} / {mailingStatus.total}</strong></span>
                  <span>Succes: <strong style={{ color: '#2e7d32' }}>{mailingStatus.successes}</strong></span>
                  <span>Erori: <strong style={{ color: '#d32f2f' }}>{mailingStatus.errors}</strong></span>
                </div>
                <div className="progress-bar-container" style={{ width: '100%', height: '10px', background: '#eee', borderRadius: '5px', overflow: 'hidden' }}>
                  <div className="progress-bar" style={{ 
                    width: mailingStatus.total > 0 ? `${(mailingStatus.current / mailingStatus.total) * 100}%` : '0%', 
                    height: '100%', 
                    backgroundColor: '#3b82f6', 
                    transition: 'width 0.3s' 
                  }}></div>
                </div>
              </div>
              <div className="mailing-details-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #eee' }}>Email</th>
                      <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #eee' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mailingStatus.details.map((detail, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #f9f9f9', fontSize: '0.9rem' }}>{detail.email}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #f9f9f9', textAlign: 'right' }}>
                          <span className={`status-badge ${detail.status === 'success' ? 'venit' : 'anulat'}`}>
                            {detail.status === 'success' ? 'Trimis' : 'Eroare'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {!isMailing && (
              <div style={{ padding: '15px', textAlign: 'right', borderTop: '1px solid #eee' }}>
                <button 
                  className="btn-view" 
                  onClick={() => setMailingStatus({ total: 0, current: 0, successes: 0, errors: 0, details: [] })}
                >
                  Închide
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
