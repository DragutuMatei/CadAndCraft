import {
  collection,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { auth, db } from "../../utils/fire";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaSignOutAlt, FaGoogle, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";
import STATUS_CONFIRMARE from "../../utils/STATUS_CONFIRMARE";
import "./QrScan.scss";

function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [docRef, setDocRef] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Auth Check ---
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
      if (
        adminDoc.exists() ||
        email === "matei.dragutu@osfiir.ro" ||
        email === "drgutumatei@gmail.com"
      ) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error checking admin:", error);
    }
    setLoading(false);
  };

  // --- Data Fetch ---
  useEffect(() => {
    if (!isAdmin) return;

    const getConfirmare = async () => {
      const id = searchParams.get("id");
      if (!id) {
        setFetchLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "confirmari"),
          where("secure_id", "==", id),
          limit(1),
        );
        const response = await getDocs(q);
        if (!response.empty) {
          setData(response.docs[0].data());
          setDocRef(response.docs[0].ref);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    getConfirmare();
  }, [isAdmin, searchParams]);

  const updateConfirmare = async () => {
    if (!docRef) return;
    if (!data || data.status !== STATUS_CONFIRMARE.CONFIRMAT) {
      alert("Check-in-ul nu este posibil. Participantul trebuie să completeze mai întâi formularul de confirmare prezență.");
      return;
    }
    try {
      await updateDoc(docRef, {
        status: STATUS_CONFIRMARE.VENIT,
      });
      setData((prev) => ({ ...prev, status: STATUS_CONFIRMARE.VENIT }));
    } catch (e) {
      console.log(e);
      alert("Eroare la updatarea statusului!");
    }
  };

  if (loading) {
    return <div className="qr-scan-page"><div className="qr-content">Checking access...</div></div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="admin-login-page">
        <div className="login-card">
          <h1>Admin Restricted</h1>
          <p>Trebuie să fiți autentificat ca Admin pentru a vizualiza rezultatele.</p>
          {!user && (
              <button onClick={() => navigate("/admin")} className="btn-google">
                <FaGoogle /> Sign in via Admin Dashboard
              </button>
          )}
          {user && !isAdmin && (
             <button onClick={() => auth.signOut()}>Sign Out</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="qr-scan-page">
      <header className="admin-header">
        <h2>Rezultat Scanare</h2>
        <div className="user-info">
            <button className="btn-back">
                <Link to="/admin/confirmare/check">Scanează Altul</Link>
            </button>
        </div>
      </header>

      <div className="qr-content">
        {fetchLoading ? (
            <div className="scan-card">
                <p>Se încarcă datele...</p>
            </div>
        ) : !data ? (
             <div className="scan-card">
                <FaTimesCircle size={40} color="#dc3545" style={{marginBottom: "15px"}}/>
                <h3>Cod Invalid</h3>
                <p>Acest cod QR nu a fost găsit în baza de date.</p>
             </div>
        ) : (
            <div className="result-card">
                <div className="result-header">
                    <h3>Confirmare Participant</h3>
                    <span className={`badge ${data.status || 'neconfirmat'}`}>
                        {data.status || "NECONFIRMAT"}
                    </span>
                </div>
                
                <div className="info-grid">
                  <div className="info-item">
                        <span className="label">Nume:</span>
                        <span className="value">{data.nume} {data.prenume}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Email:</span>
                        <span className="value">{data.email}</span>
                    </div>
                      <div className="info-item">
                        <span className="label">Echipa:</span>
                        <span className="value">{data.echipa}</span>
                    </div>
                </div>
                
                <div className="actions">
                    {data.status === STATUS_CONFIRMARE.VENIT ? (
                        <div style={{ textAlign: "center", color: "#2e7d32", fontWeight: "bold" }}>
                            <FaCheckCircle size={20} style={{verticalAlign: "middle", marginRight: "8px"}} />
                            Participantul a făcut check-in deja.
                        </div>
                    ) : data.status === STATUS_CONFIRMARE.CONFIRMAT ? (
                        <button onClick={updateConfirmare}>
                            Confirmă Prezența
                        </button>
                    ) : (
                        <div style={{ textAlign: "center", color: "#b45309", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                            <FaExclamationCircle size={20} style={{verticalAlign: "middle", marginRight: "8px"}} />
                            Participantul nu a completat formularul de confirmare.
                            <span style={{ fontWeight: "normal", fontSize: "0.9em", color: "#78350f" }}>
                                Check-in-ul nu poate fi efectuat până când participantul nu completează formularul de confirmare prezență.
                            </span>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default Results;