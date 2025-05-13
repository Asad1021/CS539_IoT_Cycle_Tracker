let map, marker;

async function fetchMACs() {
  const res = await fetch('/api/data');
  const data = await res.json();

  // Extract unique MAC addresses
  const macs = [...new Set(data.map(entry => entry.macAddress))];
  const select = document.getElementById('macSelect');

  macs.forEach(mac => {
    const option = document.createElement('option');
    option.value = mac;
    option.textContent = mac;
    select.appendChild(option);
  });

  select.addEventListener('change', () => showLocation(data, select.value));
}

function showLocation(data, selectedMac) {
  const entries = data.filter(e => e.macAddress === selectedMac);
  const latest = entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

  const lat = latest.latitude;
  const lon = latest.longitude;

  if (!map) {
    map = L.map('map').setView([lat, lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    marker = L.marker([lat, lon]).addTo(map);
  } else {
    map.setView([lat, lon], 15);
    marker.setLatLng([lat, lon]);
  }

  marker.bindPopup(`MAC: ${selectedMac}<br>Lat: ${lat}<br>Lon: ${lon}`).openPopup();
}

window.onload = fetchMACs;
