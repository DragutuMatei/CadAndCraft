import {
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../utils/fire";
import STATUS_CONFIRMARE from "../../utils/STATUS_CONFIRMARE";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import "./Form.scss";

function Form() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mail = searchParams.get("mail");
  
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [echipa, setEchipa] = useState("");
  const [email, setEmail] = useState("");
  
  const [isMinor, setIsMinor] = useState(false);
  const [isMajor, setIsMajor] = useState(false);
  const [hasParentalConsent, setHasParentalConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    console.log(id, mail);
  }, [id, mail]);

  const isEmptyOrFalse = (str) => {
    str = JSON.stringify(str);
    str = str.trim().toLowerCase();

    if (str === "false") {
      return true;
    } else {
      return str === '""';
    }
  };

  const submit = async () => {
    setErr("");
    setSuccess("");
    setLoading(true);
    
    if (
      isEmptyOrFalse(nume) ||
      isEmptyOrFalse(prenume) ||
      isEmptyOrFalse(echipa) ||
      isEmptyOrFalse(email) ||
      isEmptyOrFalse((isMinor || isMajor) && (!isMinor || hasParentalConsent))
    ) {
      setLoading(false);
      setErr(
        "Toate câmpurile sunt obligatorii și trebuie să fie completate corect!"
      );
      
      // Auto dismiss error toast after 5s
      setTimeout(() => setErr(""), 5000);
      return;
    }

    try {
      const q = query(
        collection(db, "confirmari"),
        where("secure_id", "==", id),
        limit(1)
      );
      const response = await getDocs(q);
      
      if (!response.empty) {
        if (response.docs[0].data().email !== mail) {
          setErr("Nu ai completat cu mailul cu care te-ai inscris!");
          setLoading(false);
          setTimeout(() => setErr(""), 5000);
          return;
        }
      } else {
        setErr("Acest link nu este valid sau a expirat.");
        setLoading(false);
        setTimeout(() => setErr(""), 5000);
        return;
      }

      try {
        await updateDoc(response.docs[0].ref, {
          ...response.docs[0].data(),
          nume,
          prenume,
          echipa,
          email,
          varsta: isMinor ? "minor" : isMajor ? "major" : "neselectat",
          acordParental: isMinor
            ? hasParentalConsent
            : "E major, nu are nevoie",
          updatedAt: serverTimestamp(),
          status: STATUS_CONFIRMARE.CONFIRMAT,
        });

        // SUCCESS!
        setSuccess("Confirmarea a fost înregistrată cu succes! Te așteptăm!");
        
        // Hide success toast after 6s
        setTimeout(() => setSuccess(""), 6000);

      } catch (e) {
        setErr(`A apărut o eroare la trimiterea datelor. Te rugăm să încerci din nou.2, ${e}`);
        setTimeout(() => setErr(""), 5000);
      }
    } catch (e) {
      setErr(`A apărut o eroare la trimiterea datelor. Te rugăm să încerci din nou.1, ${e}`);
      setTimeout(() => setErr(""), 5000);
    }
    
    setLoading(false);
  };

  const majorRef = useRef(null);
  const minorRef = useRef(null);

  const checkMinorMajor = (clicked) => {
    if (clicked === "minor") {
      if (isMinor) {
        setIsMinor(false);
        return;
      }
      if(majorRef.current) majorRef.current.checked = false;
      setIsMajor(false);
      setIsMinor(true);
    } else {
      if (isMajor) {
        setIsMajor(false);
        return;
      }
      if(minorRef.current) minorRef.current.checked = false;
      setIsMinor(false);
      setIsMajor(true);
    }
  };

  return (
    <div className="form-page">
      <div className="toast-container">
        <AnimatePresence>
          {success && (
            <motion.div
              className="toast success-toast"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FiCheckCircle size={20} />
              <span>{success}</span>
            </motion.div>
          )}

          {err && (
            <motion.div
              className="toast error-toast"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FiAlertCircle size={20} />
              <span>{err}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="form-container">
        <main className="form-content">
          <form onSubmit={(e) => e.preventDefault()}>
            <motion.div
              className="form-step"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2>Confirmare Prezență</h2>
              
              <div className="register-card">
                <div className="section-description">
                  <p><strong>Te așteptăm cu drag la eveniment!</strong></p>
                  <p>Completează datele de mai jos pentru a confirma participarea.</p>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Nume <span className="required">*</span></label>
                    <input
                      type="text"
                      placeholder=""
                      value={nume}
                      onChange={(e) => setNume(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label>Prenume <span className="required">*</span></label>
                    <input
                      type="text"
                      placeholder=""
                      value={prenume}
                      onChange={(e) => setPrenume(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Echipa <span className="required">*</span></label>
                    <input
                      type="text"
                      placeholder=""
                      value={echipa}
                      onChange={(e) => setEchipa(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label>E-mail (de la înscriere) <span className="required">*</span></label>
                    <input
                      type="email"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Selectează categoria de vârstă: <span className="required">*</span></label>
                  <div className="radio-group horizontal">
                    <label htmlFor="minor" className="radio-option">
                      <input
                        type="radio"
                        name="age-category"
                        id="minor"
                        onChange={() => checkMinorMajor("minor")}
                        ref={minorRef}
                      />
                      <span>Minor</span>
                    </label>

                    <label htmlFor="major" className="radio-option">
                      <input
                        type="radio"
                        name="age-category"
                        id="major"
                        ref={majorRef}
                        onChange={() => checkMinorMajor("major")}
                        checked={isMajor}
                      />
                      <span>Major</span>
                    </label>
                  </div>
                </div>

                <AnimatePresence>
                  {isMinor && (
                    <motion.div
                      className="form-group checkbox-group"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    >
                      <div className="section-description warning">
                         Participanții sub 18 ani au nevoie de acord parental.
                      </div>
                      <label htmlFor="acord" className="checkbox-option">
                        <input
                          type="checkbox"
                          id="acord"
                          onChange={(e) => setHasParentalConsent(e.target.checked)}
                          checked={hasParentalConsent}
                          required
                        />
                        <span>Am acord parental <span className="required">*</span></span>
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="button-group right">
                  <button 
                    className="btn-submit" 
                    type="submit"
                    onClick={submit} 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loader"></span>
                        Se trimite...
                      </>
                    ) : (
                      "Trimite Confirmarea"
                    )}
                  </button>
                </div>

              </div>
            </motion.div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Form;

/**
 * din admin adaug toti participantii cu status accepted
 * pentru fiecare se face un doc nou cu secure_id si mailul lor cu care s au inscris + status == neconfirmat
 * se trimite mail tuturor cu link cate formular de confirmare prezenta si cod qr
 * ei completeaza formularul si se introduc datele in baza de date + status == confirmat/neconfirmat
 * la check in li se scaneaza codul qr de cineva cu drepturi de admin + status == venit
 */
