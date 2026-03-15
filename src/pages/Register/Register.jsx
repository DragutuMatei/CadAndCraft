import React, { useState, useEffect } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { db } from '../../utils/fire';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const isValidUrl = (string) => {
    if (!string) return false;
    try {
        new URL(string);
        return true;
    } catch (_) {
        // Allow www. without http
        if (string.startsWith('www.') && string.includes('.')) return true;
        return false;
    }
};

const Register = () => {
    const navigate = useNavigate();
    const STORAGE_KEY = 'cad_craft_register_draft';

    const INITIAL_DATA = {
        gdprAccepted: false,
        teamEnvironment: '', // 'highschool' | 'university'

        // Captain / Contact Person
        contactEmail: '',
        contactPhone: '',

        // High School Only
        parentalConsent: false,

        // Projects
        previousProjects: '', // text or link

        // Team Structure
        teamSize: '1', // '1', '2', '3'
        teamName: '',

        // Member 1 (Captain)
        member1Name: '',
        member1Email: '', // Usually same as contact
        member1Phone: '', // Usually same as contact
        member1City: '',
        member1Institution: '', // School or University
        member1Details: '', // Class (HS) or Faculty (Uni)
        member1Year: '', // Year (Uni Only)
        member1Social: '',
        member1Cv: '', // For University

        // Member 2
        member2Name: '',
        member2Email: '',
        member2Phone: '',
        member2City: '',
        member2Institution: '',
        member2Details: '',
        member2Year: '',
        member2Social: '',
        member2Cv: '',

        // Member 3
        member3Name: '',
        member3Email: '',
        member3Phone: '',
        member3City: '',
        member3Institution: '',
        member3Details: '',
        member3Year: '',
        member3Social: '',
        member3Cv: '',

        // Logistics
        accommodation: 'Nu',

        // Food Prefs & Allergies & T-Shirt
        member1Food: 'Fără preferințe',
        member1Allergies: '',
        member1Tshirt: 'M',

        member2Food: 'Fără preferințe',
        member2Allergies: '',
        member2Tshirt: 'M',

        member3Food: 'Fără preferințe',
        member3Allergies: '',
        member3Tshirt: 'M',

        // Final
        motivation: '',
        finalThoughts: ''
    };

    const [step, setStep] = useState(0);
    const [maxStepReached, setMaxStepReached] = useState(0);
    const [formData, setFormData] = useState(INITIAL_DATA);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setFormData(parsed.formData || INITIAL_DATA);
                setStep(parsed.step || 0);
                // Also restore maxStepReached if we were to save it, but requirement implies session navigation only.
                // However, if I refresh, I might want to start where I left off.
                // Let's assume maxStepReached tracks "highest visited step in this session OR restored session".
                setMaxStepReached(parsed.maxStepReached || (parsed.step || 0));
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step, maxStepReached }));
        }
    }, [formData, step, maxStepReached, isLoaded]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const nextStep = () => {
        setStep(prev => {
            let next = prev + 1;
            // Skip Member 2 if size < 2
            if (next === 3 && numMembers < 2) next = 4;
            // Skip Member 3 if size < 3
            if (next === 4 && numMembers < 3) next = 5;

            setMaxStepReached(Math.max(maxStepReached, next));
            return next;
        });
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        window.scrollTo(0, 0);
        setStep(prev => {
            let next = prev - 1;
            // Skip Member 3 back if size < 3
            if (next === 4 && numMembers < 3) next = 3;
            // Skip Member 2 back if size < 2
            if (next === 3 && numMembers < 2) next = 2;
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Save to Firestore
            await addDoc(collection(db, "inscrieri"), {
                ...formData,
                createdAt: serverTimestamp(),
                submittedAt: new Date().toLocaleString("ro-RO"), // Exact local timestamp string
                status: 'new' // Useful for admin filtering later
            });

            // Send Confirmation Email
            try {
                // TODO: Replace with your actual EmailJS credentials
                // Create an account at https://www.emailjs.com/
                const templateParams = {
                    to_email: formData.contactEmail,
                    to_name: formData.teamName || "Participant",
                    team_size: formData.teamSize,
                    message: "Registration successful!"
                };

                await emailjs.send(process.env.REACT_APP_M_ID, process.env.REACT_APP_TEM_ID, templateParams, process.env.REACT_APP_M_PUBLIC);
                console.log("Email logic placeholder executed. Configure IDs to send.");
            } catch (emailError) {
                console.error("Failed to send email:", emailError);
                // Don't block success message for email failure
            }

            // Success handling
            console.log("Form Submitted Successfully");
            alert("Înscriere recepționată cu succes! Vei primi un email de confirmare în curând.");

            // Clear storage
            localStorage.removeItem(STORAGE_KEY);

            // Reset form or navigate
            navigate('/'); // Navigate home or to a success page

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("A apărut o eroare la trimiterea formularului. Te rugăm să încerci din nou sau să ne contactezi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Constants
    const isHighSchool = formData.teamEnvironment === 'highschool';
    const numMembers = parseInt(formData.teamSize);

    // Navigation Items
    const navItems = [
        { id: 0, label: 'Info & GDPR', icon: '1', jumpToStep: 0 },
        { id: 1, label: 'Detalii Echipă', icon: '2', jumpToStep: 1 }, // Covers step 1 (General)
        // Dynamically add member steps
        { id: 2, label: numMembers > 1 ? 'Membru 1 (Căpitan)' : 'Date Personale', icon: '3', jumpToStep: 2 },
        ...(numMembers >= 2 ? [{ id: 3, label: 'Membru 2', icon: '4', jumpToStep: 3 }] : []),
        ...(numMembers >= 3 ? [{ id: 4, label: 'Membru 3', icon: '5', jumpToStep: 4 }] : []),
        // Adjust icons for subsequent steps
        { id: 5, label: 'Logistică', icon: numMembers > 2 ? '6' : (numMembers > 1 ? '5' : '4'), jumpToStep: 5 },
        { id: 6, label: 'Final', icon: numMembers > 2 ? '7' : (numMembers > 1 ? '6' : '5'), jumpToStep: 6 }
    ];

    const getActiveNavId = (currentStep) => {
        // Direct mapping for most, but safeguard
        return currentStep;
    };

    const activeNavId = getActiveNavId(step);
    const navRef = React.useRef(null);
    const activeLinkRef = React.useRef(null);

    // Auto-scroll sidebar on mobile
    useEffect(() => {
        if (activeLinkRef.current && navRef.current) {
            const container = navRef.current;
            const link = activeLinkRef.current;

            // Simple logic: scroll so the link is centered or at least visible
            const containerWidth = container.offsetWidth;
            const linkLeft = link.offsetLeft;
            const linkWidth = link.offsetWidth;

            const scrollPos = linkLeft - (containerWidth / 2) + (linkWidth / 2);

            container.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
        }
    }, [activeNavId]);

    const handleNavClick = (targetNavId, targetJumpStep) => {
        // Allow navigation only to previous or current sections OR if we have visited that step
        if (targetNavId < activeNavId || targetJumpStep <= maxStepReached) {
            setStep(targetJumpStep);
            window.scrollTo(0, 0);
        }
    };

    // Validation Logic
    const isStepValid = (currentStep) => {
        switch (currentStep) {
            case 0: // GDPR & Environment
                return formData.gdprAccepted && formData.teamEnvironment;
            case 1: // Contact & Projects & Size
                const baseValid = formData.contactEmail && formData.contactPhone && formData.previousProjects;
                if (isHighSchool) return baseValid && formData.parentalConsent;
                return baseValid;
            case 2: // Team Name & Member 1
                if (numMembers > 1 && !formData.teamName) return false;
                // Member 1 checks
                if (!formData.member1Name || !formData.member1Email || !formData.member1Phone ||
                    !formData.member1City || !formData.member1Institution || !formData.member1Details ||
                    !isValidUrl(formData.member1Social)) return false;
                if (!isHighSchool) {
                    if (!formData.member1Year || !isValidUrl(formData.member1Cv)) return false;
                }
                return true;
            case 3: // Member 2
                if (!formData.member2Name || !formData.member2Email || !formData.member2Phone ||
                    !formData.member2City || !formData.member2Institution || !formData.member2Details ||
                    !isValidUrl(formData.member2Social)) return false;
                if (!isHighSchool) {
                    if (!formData.member2Year || !isValidUrl(formData.member2Cv)) return false;
                }
                return true;
            case 4: // Member 3
                if (!formData.member3Name || !formData.member3Email || !formData.member3Phone ||
                    !formData.member3City || !formData.member3Institution || !formData.member3Details ||
                    !isValidUrl(formData.member3Social)) return false;
                if (!isHighSchool) {
                    if (!formData.member3Year || !isValidUrl(formData.member3Cv)) return false;
                }
                return true;
            case 5: // Logistic (Accommodation default is 'Nu', others have defaults)
                // Accommodation is required but has default checked, so always true?
                // Just in case user managed to uncheck both (radio)
                return !!formData.accommodation;
            case 6: // Final
                return !!formData.motivation;
            default:
                return true;
        }
    };


    const renderStep = () => {
        switch (step) {
            case 0: // GDPR & Environment
                return (
                    <div className="form-step">
                        <h2>Înscriere CAD&Craft</h2>
                        <div className="register-card">
                            <div className="section-description">
                                <p><strong>GDPR și Informații Generale</strong></p>
                                <p><div style={{ width: '20px' }}></div> Prin completarea acestui formular de înscriere, sunteți de acord cu prelucrarea datelor cu caracter personal.
                                </p>
                                <p>Dorim să vă informăm cu privire la prelucrarea datelor cu caracter personal pe care le colectăm și le procesăm în calitate de operator de date conform Regulamentului (UE) 2016/679 (GDPR) și a legislației naționale aplicabile în materie de protecție a datelor.
                                </p>
                                <p>Organizația Studenților din Facultatea de Inginerie Industrială și Robotică și terții cu care colaborăm (companii și asociații partenere cu care am stabilit o colaborare contractuală) prelucrează date cu caracter personal, cum ar fi nume, prenume, prelucrări foto/video și CV-uri, pe o perioadă de 3 ani în scopul desfășurării activităților noastre curente și pentru a îndeplini obligațiile noastre legale.
                                </p>
                                <p>Datele cu caracter personal sunt procesate în conformitate cu principiile GDPR și sunt tratate cu respect pentru drepturile persoanelor vizate. Aceste date nu vor fi transferate în afara Uniunii Europene.
                                </p>
                                <p>Dacă sunteți o persoană vizată de prelucrarea datelor cu caracter personal efectuată de Organizația Studenților din Facultatea de Inginerie Industrială și Robotică și doriți să vă exercitați drepturile în temeiul GDPR (cum ar fi dreptul de acces, rectificare sau ștergere), vă rugăm să ne contactați prin intermediul adresei de e-mail office@osfiir.ro.</p>
                                <p>Vă mulțumim pentru înțelegere și colaborare.</p>

                                <br /> <p>Cu respect,
                                    Organizația Studenților din Facultatea de Inginerie Industrială și Robotică</p>
                            </div> <div className="section-description">

                                <p> By completing this registration form, you agree to the processing of personal data.
                                </p>
                                <p>We would like to inform you about the processing of personal data that we collect and process as a data controller in accordance with Regulation (EU) 2016/679 (GDPR) and the applicable national data protection legislation.
                                </p>
                                <p>
                                    The Organization of Students from the Faculty of Industrial Engineering and Robotics and the third parties we collaborate with (partner companies and associations with which we have established a contractual collaboration) process personal data such as name, surname, photo/video recordings, and CVs for a period of 3 years for the purpose of carrying out our current activities and fulfilling our legal obligations.
                                </p>
                                <p>
                                    Personal data is processed in accordance with GDPR principles and is handled with respect for the rights of the data subjects. This data will not be transferred outside the European Union.
                                </p>
                                <p>
                                    If you are a data subject whose personal data is processed by the Organization of Students from the Faculty of Industrial Engineering and Robotics and you wish to exercise your rights under the GDPR (such as the right of access, rectification, or deletion), please contact us via email at office@osfiir.ro.
                                </p>
                                <p>
                                    Thank you for your understanding and cooperation.
                                </p> <br />
                                <p>
                                    Respectfully,
                                    The Organization of Students from the Faculty of Industrial Engineering and Robotics
                                </p>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-option">
                                    <input
                                        type="checkbox"
                                        name="gdprAccepted"
                                        checked={formData.gdprAccepted}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>Sunt de acord cu prelucrarea datelor cu caracter personal <span className="required">*</span></span>
                                </label>
                            </div>

                            {formData.gdprAccepted && (
                                <div className="form-group slide-in">
                                    <label>Din ce mediu provine echipa voastră? <span className="required">*</span></label>
                                    <div className="radio-group horizontal">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="teamEnvironment"
                                                value="highschool"
                                                checked={formData.teamEnvironment === 'highschool'}
                                                onChange={handleChange}
                                            />
                                            <span>Preuniversitar (Liceu)</span>
                                        </label>
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="teamEnvironment"
                                                value="university"
                                                checked={formData.teamEnvironment === 'university'}
                                                onChange={handleChange}
                                            />
                                            <span>Universitar (Facultate)</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="button-group right">
                                <button
                                    className="btn-next"
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!isStepValid(0)}
                                >
                                    Următorul Pas <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 1: // Contact & Projects & Size
                return (
                    <div className="form-step">
                        <h2>Detalii Generale Echipă</h2>
                        <div className="register-card">
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>E-mail Persoană Contact <span className="required">*</span></label>
                                    <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
                                </div>

                                <div className="form-group half">
                                    <label>Telefon Persoană Contact <span className="required">*</span></label>
                                    <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />
                                </div>
                            </div>

                            {isHighSchool && (
                                <div className="form-group checkbox-group">
                                    <div className="section-description warning">
                                        Participanții sub 18 ani au nevoie de acord parental. Modelul va fi transmis pe email.
                                    </div>
                                    <label className="checkbox-option">
                                        <input
                                            type="checkbox"
                                            name="parentalConsent"
                                            checked={formData.parentalConsent}
                                            onChange={handleChange}
                                        />
                                        <span>Am luat la cunoștință (Acord Parental) <span className="required">*</span></span>
                                    </label>
                                </div>
                            )}

                            <div className="form-group">
                                <label>Proiecte Anterioare (Link/Descriere) <span className="required">*</span></label>
                                <span className="sub-label">Link către Google Drive, Docs sau o scurtă descriere a experienței.</span>
                                <textarea name="previousProjects" value={formData.previousProjects} onChange={handleChange} placeholder="https://..." required />
                            </div>

                            <div className="form-group">
                                <label>Număr Membri Echipă <span className="required">*</span></label>
                                <div className="radio-group horizontal">
                                    {['1', '2', '3'].map((size) => (
                                        <label key={size} className="radio-option">
                                            <input
                                                type="radio"
                                                name="teamSize"
                                                value={size}
                                                checked={formData.teamSize === size}
                                                onChange={handleChange}
                                            />
                                            <span>{size} {size === '1' ? 'persoană' : 'persoane'}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="button-group">
                                <button className="btn-prev" type="button" onClick={prevStep}><FaArrowLeft /> Înapoi</button>
                                <button
                                    className="btn-next"
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!isStepValid(1)}
                                >Următorul Pas <FaArrowRight /></button>
                            </div>
                        </div>
                    </div>
                );

            case 2: // TEAM NAME & Member 1
                return (
                    <div className="form-step">
                        <h2>{numMembers > 1 ? 'Date Echipă & Căpitan' : 'Date Participant'}</h2>

                        {numMembers > 1 && (
                            <div className="register-card">
                                <div className="form-group">
                                    <label>Numele Echipei <span className="required">*</span></label>
                                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} required />
                                </div>
                            </div>
                        )}

                        <MemberFields index={1} data={formData} onChange={handleChange} isHighSchool={isHighSchool} title={numMembers > 1 ? "Membru 1 (Căpitan/Contact)" : "Date Personale"} />

                        <div className="register-card no-bg">
                            <div className="button-group">
                                <button className="btn-prev" type="button" onClick={prevStep}><FaArrowLeft /> Înapoi</button>
                                <button className="btn-next" type="button" onClick={nextStep} disabled={!isStepValid(2)}>Următorul Pas <FaArrowRight /></button>
                            </div>
                        </div>
                    </div>
                );

            case 3: // Member 2
                // Skip logic handled in nextStep/prevStep
                if (numMembers < 2) return null;
                return (
                    <div className="form-step">
                        <h2>Membri Echipă</h2>
                        <MemberFields index={2} data={formData} onChange={handleChange} isHighSchool={isHighSchool} title="Membru 2" />
                        <div className="register-card no-bg">
                            <div className="button-group">
                                <button className="btn-prev" type="button" onClick={prevStep}><FaArrowLeft /> Înapoi</button>
                                <button className="btn-next" type="button" onClick={nextStep} disabled={!isStepValid(3)}>Următorul Pas <FaArrowRight /></button>
                            </div>
                        </div>
                    </div>
                );

            case 4: // Member 3
                // Skip logic handled in nextStep/prevStep
                if (numMembers < 3) return null;
                return (
                    <div className="form-step">
                        <h2>Membri Echipă</h2>
                        <MemberFields index={3} data={formData} onChange={handleChange} isHighSchool={isHighSchool} title="Membru 3" />
                        <div className="register-card no-bg">
                            <div className="button-group">
                                <button className="btn-prev" type="button" onClick={prevStep}><FaArrowLeft /> Înapoi</button>
                                <button className="btn-next" type="button" onClick={nextStep} disabled={!isStepValid(4)}>Următorul Pas <FaArrowRight /></button>
                            </div>
                        </div>
                    </div>
                );

            case 5: // Preferences
                return (
                    <div className="form-step">
                        <h2>Preferințe & Logistică</h2>
                        <div className="register-card">
                            <div className="section-description">
                                <p><strong>Cazare</strong></p>
                                <p>Cazare asigurată pentru perioada 21.03.2025 - 24.03.2025 (Doar pentru participanții din afara București/Ilfov).</p>
                            </div>

                            <div className="form-group">
                                <label>Necesitați cazare? <span className="required">*</span></label>
                                <div className="radio-group horizontal">
                                    <label className="radio-option">
                                        <input type="radio" name="accommodation" value="Da" checked={formData.accommodation === 'Da'} onChange={handleChange} />
                                        <span>Da</span>
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio" name="accommodation" value="Nu" checked={formData.accommodation === 'Nu'} onChange={handleChange} />
                                        <span>Nu</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Member 1 Prefs */}
                        <PreferencesFields index={1} data={formData} onChange={handleChange} showName={numMembers > 1} />

                        {/* Member 2 Prefs */}
                        {numMembers >= 2 && <PreferencesFields index={2} data={formData} onChange={handleChange} showName={true} />}

                        {/* Member 3 Prefs */}
                        {numMembers >= 3 && <PreferencesFields index={3} data={formData} onChange={handleChange} showName={true} />}

                        <div className="register-card no-bg">
                            <div className="button-group">
                                <button className="btn-prev" type="button" onClick={prevStep}><FaArrowLeft /> Înapoi</button>
                                <button className="btn-next" type="button" onClick={nextStep} disabled={!isStepValid(5)}>Următorul Pas <FaArrowRight /></button>
                            </div>
                        </div>
                    </div>
                );

            case 6: // Final
                return (
                    <div className="form-step">
                        <h2>Întrebări Finale</h2>
                        <div className="register-card">
                            <div className="form-group">
                                <label>Ce te/vă motivează să participi? <span className="required">*</span></label>
                                <div className="radio-group">
                                    <label className="radio-option">
                                        <input type="radio" name="motivation" value="networking" onChange={handleChange} checked={formData.motivation === 'networking'} />
                                        <span>Networking-ul și oportunitatea de a lucra cu alte persoane</span>
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio" name="motivation" value="experience" onChange={handleChange} checked={formData.motivation === 'experience'} />
                                        <span>Experiența câștigată în urma evenimentului</span>
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio" name="motivation" value="fun" onChange={handleChange} checked={formData.motivation === 'fun'} />
                                        <span>Distracția de a participa în astfel de competiții</span>
                                    </label>
                                    <label className="radio-option">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                                            <input type="radio" name="motivation" value="other" onChange={handleChange} checked={formData.motivation.startsWith('other:') || formData.motivation === 'other'} />
                                            <span>Altceva:</span>
                                            <input
                                                type="text"
                                                style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '4px', background: 'transparent', flex: 1 }}
                                                placeholder="..."
                                                onFocus={(e) => handleChange({ target: { name: 'motivation', value: 'other:' + e.target.value } })}
                                                onChange={(e) => handleChange({ target: { name: 'motivation', value: 'other:' + e.target.value } })}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Alte gânduri înainte de înscriere?</label>
                                <textarea name="finalThoughts" value={formData.finalThoughts} onChange={handleChange} placeholder="Opțional..." />
                            </div>

                            <div className="button-group">
                                <button className="btn-prev" type="button" onClick={prevStep}><FaArrowLeft /> Înapoi</button>
                                <button className="btn-submit" type="submit" onClick={handleSubmit} disabled={!isStepValid(6) || isSubmitting}>
                                    {isSubmitting ? 'Se trimite...' : 'Trimite Înscrierea'}
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="register-page">
            <div className="register-container">
                {/* Sidebar */}
                <aside className="register-sidebar">
                    <div className="register-sidebar__title">
                        Pași Înscriere
                    </div>

                    <div className="register-sidebar__nav" ref={navRef}>
                        {navItems.map((item) => {
                            let isActive = false;
                            let isCompleted = false;
                            let isClickable = false;

                            if (activeNavId === item.id) isActive = true;
                            if (activeNavId > item.id) isCompleted = true;

                            // Allow clicking if it's a previous step OR if we've reached this step significantly
                            if (activeNavId > item.id || item.jumpToStep <= maxStepReached) {
                                isClickable = true;
                            }

                            return (
                                <button
                                    key={item.id}
                                    className={`register-sidebar__link ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isClickable ? 'clickable' : ''}`}
                                    onClick={() => handleNavClick(item.id, item.jumpToStep)}
                                    disabled={!isClickable}
                                    type="button"
                                    ref={isActive ? activeLinkRef : null}
                                >
                                    <span className="icon">
                                        {isCompleted ? <FaCheck size={14} /> : item.icon}
                                    </span>
                                    <span className="text">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="register-sidebar__info">
                        <p>Completează cu atenție toate câmpurile obligatorii marcate cu *.</p>
                        <p style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.7 }}>Progresul se salvează automat local.</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="register-content">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {renderStep()}
                    </form>
                </main>
            </div>
        </div>
    );
};

// Helper Components
const MemberFields = ({ index, data, onChange, isHighSchool, title }) => {
    const p = (field) => `member${index}${field}`;

    // Simple internal touched state for immediate feedback on blur
    // Ideally this should be lifted, but for "under field" messages without blocking nav, this is fine.
    // Actually, to persist, we should lift it. But let's try a quicker win: 
    // Show error if value is INVALID (regex) OR if value is empty AND field was focused.
    // To do that without lifting, we can use local state.

    const [touched, setTouched] = React.useState({});

    const onBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const getError = (name, value, isUrl = false) => {
        if (touched[name] && !value) return "Acest câmp este obligatoriu.";
        if (value && isUrl && !isValidUrl(value)) return "Te rugăm să introduci un link valid (ex: https://...).";
        return null;
    };

    const renderInput = (label, name, type = "text", placeholder = "", required = true, isUrl = false) => (
        <div className={`form-group ${type === 'half' ? 'half' : ''}`}>
            {/* Note: 'half' logic is in parent div usually. I'll adjust usage below. */}
            <label>{label} {required && <span className="required">*</span>}</label>
            <input
                type={type === 'half' ? 'text' : type}
                name={name}
                value={data[name]}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                onBlur={onBlur}
            />
            {required && getError(name, data[name], isUrl) && (
                <span className="error-message">{getError(name, data[name], isUrl)}</span>
            )}
        </div>
    );

    return (
        <div className="register-card">
            <h3>{title}</h3>

            <div className="form-row">
                <div className="form-group half">
                    <label>Nume și Prenume <span className="required">*</span></label>
                    <input type="text" name={p('Name')} value={data[p('Name')]} onChange={onChange} required onBlur={onBlur} />
                    {getError(p('Name'), data[p('Name')]) && <span className="error-message">{getError(p('Name'), data[p('Name')])}</span>}
                </div>

                <div className="form-group half">
                    <label>Email <span className="required">*</span></label>
                    <input type="email" name={p('Email')} value={data[p('Email')]} onChange={onChange} required onBlur={onBlur} />
                    {getError(p('Email'), data[p('Email')]) && <span className="error-message">{getError(p('Email'), data[p('Email')])}</span>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group half">
                    <label>Telefon <span className="required">*</span></label>
                    <input type="tel" name={p('Phone')} value={data[p('Phone')]} onChange={onChange} required onBlur={onBlur} />
                    {getError(p('Phone'), data[p('Phone')]) && <span className="error-message">{getError(p('Phone'), data[p('Phone')])}</span>}
                </div>

                <div className="form-group half">
                    <label>Oraș de proveniență <span className="required">*</span></label>
                    <input type="text" name={p('City')} value={data[p('City')]} onChange={onChange} required onBlur={onBlur} />
                    {getError(p('City'), data[p('City')]) && <span className="error-message">{getError(p('City'), data[p('City')])}</span>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group half">
                    <label>{isHighSchool ? 'Unitatea de învățământ (Liceu)' : 'Centru Universitar'} <span className="required">*</span></label>
                    <input type="text" name={p('Institution')} value={data[p('Institution')]} onChange={onChange} required onBlur={onBlur} />
                    {getError(p('Institution'), data[p('Institution')]) && <span className="error-message">{getError(p('Institution'), data[p('Institution')])}</span>}
                </div>

                <div className="form-group half">
                    <label>{isHighSchool ? 'Clasa' : 'Facultatea'} <span className="required">*</span></label>
                    <input type="text" name={p('Details')} value={data[p('Details')]} onChange={onChange} placeholder={isHighSchool ? "ex: 11C" : "ex: Automatică"} required onBlur={onBlur} />
                    {getError(p('Details'), data[p('Details')]) && <span className="error-message">{getError(p('Details'), data[p('Details')])}</span>}
                </div>
            </div>

            {!isHighSchool && (
                <div className="form-group">
                    <label>Anul de Studiu <span className="required">*</span></label>
                    <input type="text" name={p('Year')} value={data[p('Year')]} onChange={onChange} placeholder="ex: 1, 2, Master 1..." required onBlur={onBlur} />
                    {getError(p('Year'), data[p('Year')]) && <span className="error-message">{getError(p('Year'), data[p('Year')])}</span>}
                </div>
            )}

            <div className="form-group">
                <label>Social Media (Link) <span className="required">*</span></label>
                <input type="text" name={p('Social')} value={data[p('Social')]} onChange={onChange} placeholder="LinkedIn, Instagram..." required onBlur={onBlur} />
                {getError(p('Social'), data[p('Social')], true) && <span className="error-message">{getError(p('Social'), data[p('Social')], true)}</span>}
            </div>

            {!isHighSchool && (
                <div className="form-group">
                    <label>Link CV <span className="required">*</span></label>
                    <input type="url" name={p('Cv')} value={data[p('Cv')]} onChange={onChange} placeholder="Link public (Drive/Dropbox/LinkedIn)" required onBlur={onBlur} />
                    {getError(p('Cv'), data[p('Cv')], true) && <span className="error-message">{getError(p('Cv'), data[p('Cv')], true)}</span>}
                </div>
            )}
        </div>
    );
};

const PreferencesFields = ({ index, data, onChange, showName }) => {
    const p = (field) => `member${index}${field}`;
    const name = data[`member${index}Name`] || `Participant ${index}`;

    return (
        <div className="register-card">
            <h3>Preferințe: {showName ? name : 'Alimentare & Tricou'}</h3>

            <div className="form-row">
                <div className="form-group half">
                    <label>Meniu Mâncare</label>
                    <div className="radio-group horizontal">
                        <label className="radio-option">
                            <input type="radio" name={p('Food')} value="Fără preferințe" checked={data[p('Food')] === 'Fără preferințe'} onChange={onChange} />
                            <span>Normal</span>
                        </label>
                        <label className="radio-option">
                            <input type="radio" name={p('Food')} value="Vegetarian" checked={data[p('Food')] === 'Vegetarian'} onChange={onChange} />
                            <span>Vegetarian</span>
                        </label>
                    </div>
                </div>

                <div className="form-group half">
                    <label>Mărime Tricou</label>
                    <select name={p('Tshirt')} value={data[p('Tshirt')]} onChange={onChange}>
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Alergii</label>
                <input type="text" name={p('Allergies')} value={data[p('Allergies')]} onChange={onChange} placeholder="Dacă nu există, lăsați gol" />
            </div>
        </div>
    )
}

export default Register;
