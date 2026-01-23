// import React, { useEffect, useMemo, useState } from "react";
// import Crud from "../../utils/Crud";
// import { Bar, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// function Admin() {
//   const [data, setData] = useState([]);
//   const [selectedWeek, setSelectedWeek] = useState(null);
//   const [selectedStats, setSelectedStats] = useState({
//     devices: true,
//     hours: true,
//     targets: true,
//     fromTo: true
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const crud = new Crud();
//       const result = await crud.getData("qr");
//       if(result) setData(result);
//     };
//     fetchData();
//   }, []);

//   const getWeekNumber = (d) => {
//     const date = new Date(d);
//     const dayNum = date.getUTCDay() || 7;
//     date.setUTCDate(date.getUTCDate() + 4 - dayNum);
//     const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
//     return Math.ceil((((date - yearStart) / 86400000) + 1)/7);
//   };

//   const rows = useMemo(() => {
//     let filtered = [...data];
//     if(selectedWeek) filtered = filtered.filter(d => getWeekNumber(d.time) === selectedWeek);
//     return filtered;
//   }, [data, selectedWeek]);

//   const devicesData = useMemo(() => {
//     const counts = {};
//     rows.forEach(d => { counts[d.type]=(counts[d.type]||0)+1; });
//     return {
//       labels: Object.keys(counts),
//       datasets: [{ label: 'Devices', data: Object.values(counts), backgroundColor: ['#3d5a80','#ee6c4d','#293241'] }]
//     };
//   }, [rows]);

//   const hoursData = useMemo(() => {
//     const counts = {};
//     rows.forEach(d => { const h = new Date(d.time).getHours(); counts[h]=(counts[h]||0)+1; });
//     return {
//       labels: Object.keys(counts),
//       datasets: [{ label: 'Scan Hours', data: Object.values(counts), backgroundColor: '#3d5a80' }]
//     };
//   }, [rows]);

//   const targetsData = useMemo(() => {
//     const counts = {};
//     rows.forEach(d => { counts[d.target]=(counts[d.target]||0)+1; });
//     return {
//       labels: Object.keys(counts),
//       datasets: [{ label: 'Targets', data: Object.values(counts), backgroundColor: ['#ee6c4d','#3d5a80','#293241','#a4b5c4'] }]
//     };
//   }, [rows]);

//   const fromToData = useMemo(() => {
//     const counts = {};
//     rows.forEach(d => { const k = `${d.from}->${d.to}`; counts[k]=(counts[k]||0)+1; });
//     return {
//       labels: Object.keys(counts),
//       datasets: [{ label: 'From->To', data: Object.values(counts), backgroundColor: ['#293241','#3d5a80','#ee6c4d','#a4b5c4','#efefef'] }]
//     };
//   }, [rows]);

//   const minWeek = useMemo(() => data.length ? Math.min(...data.map(d => getWeekNumber(d.time))) : null, [data]);
//   const maxWeek = useMemo(() => data.length ? Math.max(...data.map(d => getWeekNumber(d.time))) : null, [data]);
//   const weeksArray = useMemo(() => { if(minWeek===null||maxWeek===null) return []; const arr=[]; for(let i=minWeek;i<=maxWeek;i++) arr.push(i); return arr; }, [minWeek,maxWeek]);

//   return (
//     <div style={{ paddingTop: 130, paddingLeft: 24, paddingRight: 24, fontFamily: 'sans-serif' }}>
//       <h1 style={{ color: '#293241' }}>📊 Admin – QR Statistics</h1>

//       <section style={{ marginBottom: 24 }}>
//         <label>Week: </label>
//         <select onChange={e=>setSelectedWeek(Number(e.target.value))} value={selectedWeek||''}>
//           <option value="">All</option>
//           {weeksArray.map(w=><option key={w} value={w}>{w}</option>)}
//         </select>
//       </section>

//       <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap: 24 }}>
//         {selectedStats.devices && <div style={{ padding:12, border:'1px solid #ccc', borderRadius:8, background:'#efefef' }}><h3>Devices</h3><Bar data={devicesData} /></div>}
//         {selectedStats.hours && <div style={{ padding:12, border:'1px solid #ccc', borderRadius:8, background:'#efefef' }}><h3>Hours</h3><Bar data={hoursData} /></div>}
//         {selectedStats.targets && <div style={{ padding:12, border:'1px solid #ccc', borderRadius:8, background:'#efefef' }}><h3>Targets</h3><Pie data={targetsData} /></div>}
//         {selectedStats.fromTo && <div style={{ padding:12, border:'1px solid #ccc', borderRadius:8, background:'#efefef' }}><h3>From-To</h3><Bar data={fromToData} /></div>}
//       </section>
//     </div>
//   );
// }

// export default Admin;