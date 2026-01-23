import React, { useEffect } from "react";
import { deviceDetect } from "react-device-detect";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useDeviceInfo } from "../../utils/useDeviceInfo";
import Crud from "../../utils/Crud";
import { time } from "framer-motion";
import { h1 } from "framer-motion/client";

function Redirect() {
  const splat = window.location.href
    .split("/qr/")[1].split("/");
  console.log("Splat:", splat);
  const info = useDeviceInfo();
  const from = splat[0];
  const to = splat[1];

  const addData = async (collectionName, data) => {
    if(!data) return;
    const crud = new Crud();
    const rasp = await crud.addData(collectionName, {...data, from, to, time: Date.now()});
    console.log("Data added:", rasp);
    if(!rasp){
        console.error("Failed to add data");
    }
};

  useEffect(() => {
    addData("qr", info);
  }, [info]);

  return ( 
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {!info ? (
        <h1 style={{ textAlign: "center", width: "100vw", marginTop: "20vh" }}>
          Se încarcă informațiile ...
        </h1>
      ):(
     <>
     <Navigate replace to={`/${to}`} />
     </>
     )}
      {/* <p style={{ width: "100vw", padding: "40px" }}>{JSON.stringify(info)}</p> */}
    </>
  );
}

export default Redirect;
