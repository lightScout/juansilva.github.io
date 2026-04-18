function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const parts = now.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    timeZoneName: 'short'
  }).split(' ');
  const tz = parts[parts.length - 1] || 'GMT';
  const el = document.getElementById('london-time');
  if (el) el.textContent = `LONDON · ${time} ${tz}`;
}
updateClock();
setInterval(updateClock, 1000);
