import {
  collection,
  getDoc,
  where,
  limit,
  query,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/fire";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import STATUS_CONFIRMARE from "../../utils/STATUS_CONFIRMARE";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

function VerifQr() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState();
  const getConfirmare = async () => {
    console.log("Getting confirmare for id:", searchParams.get("id"));
    const q = query(
      collection(db, "confirmari"),
      where("secure_id", "==", searchParams.get("id")),
      limit(1),
    );
    const response = await getDocs(q);
    if (!response.empty) {
      return response.docs[0];
    }
    return null;
  };

  const updateConfirmare = async (id) => {
    try {
      const snap = await getConfirmare();

      const resp = await updateDoc(snap.ref, {
        status: STATUS_CONFIRMARE.VENIT,
      });
      setData(snap.data());
    } catch (e) {
      console.log(e);
    }
  };
  const navigate= useNavigate();
    
  const onScanSuccess = (decodedText, decodedResult) => {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    // navigate(dec);
  };
  const onScanFailure = (error) => {
    console.log(`Code scan error = ${error}`);
  };
  useEffect(() => {
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);


  }, []);

  const config = {
    qrbox: { width: 400, height: 400 },
     fps: 10,
     rememberLastUsedCamera: true,
  // Only support camera scan type.
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  }
  const html5QrcodeScanner = new Html5QrcodeScanner("reader", config, /* verbose= */ true);



  return <div>
    <br /><br /><br /><br />
    <div id="reader" width="500px"></div>
    <br /><br /><br /><br />
    
    {JSON.stringify(data)}</div>;
}

export default VerifQr;
