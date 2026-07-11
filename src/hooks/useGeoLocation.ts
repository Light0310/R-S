import { useEffect } from 'react';

export function useGeoLocation() {
  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        const titleEl = document.getElementById('hero-title');
        if (titleEl && data.country) {
          titleEl.innerHTML = `<span>The Best Premium IPTV in</span><br><span class="highlight">${data.country}</span>`;
        }
      } catch (error) {
        console.error('Failed to fetch geolocation', error);
        // Fallback is already present in the HTML (RedStream™ Premium IPTV)
      }
    }
    
    fetchCountry();
  }, []);
}
