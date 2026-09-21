import { useEffect } from 'react';

export function useGeoLocation() {
  useEffect(() => {
    // Delay geolocation check until after critical render & hydration are fully settled
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) return;
        const data = await response.json();
        
        const geoEl = document.getElementById('geo-hidden-text');
        if (geoEl && data.country) {
          geoEl.innerText = `The Best IPTV in ${data.country}`;
        }
      } catch (error) {
        // Silently fail if blocked by network or adblocker
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
}
