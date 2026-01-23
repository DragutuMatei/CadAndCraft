import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/fire";

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTime(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
}

function generateRandomData(count = 100) {
  const devices = ["phone", "desktop", "tablet"];
  const OS = ["Android", "iOS", "Windows", "macOS", "Linux"];
  const targets = ["#inscrieri", "#afis", "#home", "#contact"];

  const batteryLevels = ["0%","10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"];

  const platforms = ["Linux armv81", "Win32", "MacIntel", "x64"];
  const languages = ["en-US", "ro-RO", "fr-FR"];

  const start = new Date(2025, 0, 1);
  const end = new Date();

  const promises = [];

  for(let i=0;i<count;i++){
    const type = randomFromArray(devices);
    const os = randomFromArray(OS);
    const target = randomFromArray(targets);
    const time = randomTime(start, end);
    const battery = { level: randomFromArray(batteryLevels), charging: Math.random() > 0.5 };
    const platform = randomFromArray(platforms);
    const language = randomFromArray(languages);
    const location = Math.random() > 0.5 ? { lat: (Math.random()*180-90).toFixed(6), lng: (Math.random()*360-180).toFixed(6) } : null;

    const docData = {
      type,
      os,
      target,
      time,
      battery,
      platform,
      language,
      location,
      from: "qr",
      to: target
    };

    promises.push(addDoc(collection(db, "qr"), docData));
  }

  return Promise.all(promises);
}

export default generateRandomData;

// Usage: generateRandomData(200).then(() => console.log("Random test data added!"));