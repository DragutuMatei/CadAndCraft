import { useEffect, useState } from "react";

function isIpadOS() {
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

function detectOS() {
  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod/i.test(ua) || isIpadOS()) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Win/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";

  return "Unknown";
}

function detectType() {
  const ua = navigator.userAgent;

  if (/iPhone/i.test(ua)) return "phone";
  if (/iPad/i.test(ua) || isIpadOS()) return "tablet";
  if (/Android/i.test(ua)) return "phone";

  return "desktop";
}

export function useDeviceInfo() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const collect = async () => {
      const battery = navigator.getBattery
        ? await navigator.getBattery()
        : null;

      const os = detectOS();
      const type = detectType();

      let location = null;
      let locationPermission = "unknown";

      // 👉 verifică permisiunea FĂRĂ prompt
      if (navigator.permissions && navigator.geolocation) {
        try {
          const permission = await navigator.permissions.query({
            name: "geolocation",
          });

          locationPermission = permission.state; // granted | denied | prompt

          if (permission.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                setInfo((prev) => ({
                  ...prev,
                  location: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy + "m",
                  },
                }));
              },
              () => {}
            );
          }
        } catch (e) {
          // unele browsere mai vechi
        }
      }

      setInfo({
        type,
        os,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        language: navigator.language,
        touch: navigator.maxTouchPoints > 0,
        screen: {
          width: window.screen.width + "px",
          height: window.screen.height + "px",
          pixelRatio: window.devicePixelRatio,
        },
        battery: battery
          ? {
              level: Math.round(battery.level * 100) + "%",
              charging: battery.charging,
            }
          : null,
        locationPermission,
        location: null,     
      });
    };

    collect();
  }, []);

  return info;
}
