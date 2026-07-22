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
        console.error('Failed to fetch geolocation', error);
      }
    }
    
    fetchCountry();
  }, []);
}
