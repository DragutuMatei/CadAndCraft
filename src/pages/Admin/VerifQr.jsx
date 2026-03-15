import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../utils/fire";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaSignOutAlt, FaGoogle } from "react-icons/fa";
import "./QrScan.scss";

function CheckQR() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const onScanSuccess = (decodedText, decodedResult) => {
    // The "decoder" usually returns the full link, e.g. "https://domain.com/admin/confirmare/verif/?id=..."
    // We only need the path part to navigate
    try {
        const url = new URL(decodedText);
        navigate(url.pathname + url.search);
    } catch(e) {
        // Fallback incase decodedText is not an absolute URL but already a relative path
        navigate(decodedText);
    }
  };

  const onScanFailure = (error) => {
    // console.log(`Code scan error = ${error}`);
  };

  useEffect(() => {
    if (isAdmin) {
        const config = {
          qrbox: { width: 300, height: 300 },
          fps: 10,
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        };
        const html5QrcodeScanner = new Html5QrcodeScanner(
          "reader",
          config,
          /* verbose= */ false,
        );
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }
  }, [isAdmin, navigate]);

  if (loading) {
    return <div className="qr-scan-page"><div className="qr-content">Checking access...</div></div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="admin-login-page">
        <div className="login-card">
          <h1>Admin Restricted</h1>
          <p>Trebuie să fiți autentificat ca Admin pentru a folosi scanner-ul.</p>
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
        <h2>Scanner Check-IN</h2>
        <div className="user-info">
            <button className="btn-back">
                <Link to="/admin">Înapoi la Dashboard</Link>
            </button>
        </div>
      </header>

      <div className="qr-content">
        <div className="scan-card">
            <h3>Scanează Cod QR</h3>
            <p>Poziționați codul QR al participantului în centrul chenarului.</p>
            <div id="reader" style={{ width: "100%", maxWidth: "500px" }}></div>
        </div>
      </div>
    </div>
  );
}

export default CheckQR;
