import { useEffect } from 'react';

export function useGeoLocation() {
  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        const geoEl = document.getElementById('geo-hidden-text');
        if (geoEl && data.country) {
          geoEl.innerText = `The Best IPTV in ${data.country}`;
        }
      } catch (error) {
        // Silently fail if geolocation is blocked by adblocker or network
        console.warn('Geolocation fetch failed, defaulting to general text.');
      }
    }
    
    fetchCountry();
  }, []);
}
