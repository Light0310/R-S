const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const oldCode = `    const timerInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      let timeLeft = parseInt(targetTime!) - currentTime;

      if (timeLeft <= 0) {
        const newEnd = currentTime + THREE_DAYS_IN_MS;
        localStorage.setItem('redstream_promo_end_3days', newEnd.toString());
        targetTime = newEnd.toString();
        timeLeft = THREE_DAYS_IN_MS;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const dEl = document.getElementById('cd-val-d');
      const hEl = document.getElementById('cd-val-h');
      const mEl = document.getElementById('cd-val-m');
      const sEl = document.getElementById('cd-val-s');
      
      if (dEl) dEl.innerText = days.toString().padStart(2, '0');
      if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
      if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
      if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
    }, 1000);`;

const newCode = `    const updateTimer = () => {
      const currentTime = new Date().getTime();
      let timeLeft = parseInt(targetTime!) - currentTime;

      if (timeLeft <= 0) {
        const newEnd = currentTime + THREE_DAYS_IN_MS;
        localStorage.setItem('redstream_promo_end_3days', newEnd.toString());
        targetTime = newEnd.toString();
        timeLeft = THREE_DAYS_IN_MS;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const dEl = document.getElementById('cd-val-d');
      const hEl = document.getElementById('cd-val-h');
      const mEl = document.getElementById('cd-val-m');
      const sEl = document.getElementById('cd-val-s');
      
      if (dEl) dEl.innerText = days.toString().padStart(2, '0');
      if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
      if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
      if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
    };
    
    updateTimer(); // Prevent initial flash
    const timerInterval = setInterval(updateTimer, 1000);`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
console.log("Timer JS fixed");
