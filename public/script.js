// let currentUserEmail = null;

// // Google Sign-In
// window.onload = () => {
//   google.accounts.id.initialize({
//     client_id: '1076387344629-ddvbgahk2chhej145q58gisituvbrij2.apps.googleusercontent.com',
//     callback: handleCredentialResponse
//   });

//   google.accounts.id.renderButton(
//     document.getElementById("g_id_signin"),
//     { theme: "outline", size: "medium" }
//   );
// };

// // Parse JWT token
// function parseJwt(token) {
//   const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
//   return JSON.parse(atob(base64));
// }

// // Handle login response
// function handleCredentialResponse(response) {
//   const data = parseJwt(response.credential);
//   const email = data.email;

//   if (!email.endsWith('@iitrpr.ac.in')) {
//     alert('Access restricted to @iitrpr.ac.in email addresses only.');
//     return;
//   }

//   currentUserEmail = email;

//   // Hide login card, show top-right info and main buttons
//   document.getElementById('login-card').classList.add('d-none');
//   document.getElementById('auth-info').classList.remove('d-none');
//   document.getElementById('main-buttons').classList.remove('d-none');

//   // Display user info
//   document.getElementById('user-info').innerText = `${data.name} (${email})`;

//   // Show MAC dropdown and load data
//   document.getElementById('mac-dropdown-container').style.display = 'block';
//   loadUniqueMacs();
// }

// // Logout button logic
// document.getElementById('signout-btn').addEventListener('click', () => {
//   location.reload(); // simple reload to reset state
// });

// // Fetch and populate table
// async function fetchData() {
//   try {
//     const res = await fetch('/api/data');
//     const data = await res.json();

//     const tableBody = document.getElementById('table-body');
//     tableBody.innerHTML = '';

//     data.forEach(entry => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${entry.macAddress}</td>
//         <td>${entry.latitude.toFixed(6)}</td>
//         <td>${entry.longitude.toFixed(6)}</td>
//         <td>${new Date(entry.timestamp).toLocaleString()}</td>
//       `;
//       tableBody.appendChild(row);
//     });
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   }
// }

// // Load unique MAC addresses in dropdown
// async function loadUniqueMacs() {
//   try {
//     const res = await fetch('/api/data');
//     const data = await res.json();

//     const uniqueMacs = [...new Set(data.map(item => item.macAddress))];
//     const macSelector = document.getElementById('macSelector');
//     macSelector.innerHTML = '';

//     uniqueMacs.forEach(mac => {
//       const opt = document.createElement('option');
//       opt.value = mac;
//       opt.textContent = mac;
//       macSelector.appendChild(opt);
//     });

//     if (uniqueMacs.length > 0) {
//       showMapForMac(uniqueMacs[0]);
//     }
//   } catch (err) {
//     console.error('Error loading MAC addresses:', err);
//   }
// }

// // Show map for selected MAC
// async function showMapForMac(mac) {
//   try {
//     const res = await fetch('/api/data');
//     const data = await res.json();

//     const entries = data.filter(item => item.macAddress === mac);
//     if (!entries.length) return;

//     const latest = entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
//     const lat = latest.latitude;
//     const lng = latest.longitude;

//     document.getElementById('map-frame').src =
//       `https://maps.google.com/maps?q=${lat},${lng}&z=19&output=embed`;

//     document.getElementById('map-container').style.display = 'block';
//   } catch (err) {
//     console.error('Error loading map for MAC:', err);
//   }
// }

// // Button event handlers
// document.getElementById('show-table-btn').addEventListener('click', () => {
//   document.getElementById('table-section').style.display = 'block';
//   document.getElementById('map-section').style.display = 'none';
//   fetchData();
// });

// document.getElementById('show-map-btn').addEventListener('click', () => {
//   document.getElementById('map-section').style.display = 'block';
//   document.getElementById('table-section').style.display = 'none';
// });

// document.getElementById('macSelector').addEventListener('change', (e) => {
//   showMapForMac(e.target.value);
// });
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - initializing app');

  // Set up event listeners for buttons
  document.getElementById('start-app-btn').addEventListener('click', () => {
    document.getElementById('login-card').classList.add('d-none');
    document.getElementById('main-buttons').classList.remove('d-none');
  });

  document.getElementById('show-table-btn').addEventListener('click', () => {
    document.getElementById('table-section').style.display = 'block';
    document.getElementById('map-section').style.display = 'none';
    fetchData();
  });

  document.getElementById('show-map-btn').addEventListener('click', () => {
    document.getElementById('map-section').style.display = 'block';
    document.getElementById('table-section').style.display = 'none';
    loadUniqueMacs();
  });

  document.getElementById('macSelector').addEventListener('change', (e) => {
    showMapForMac(e.target.value);
  });
});

// Fetch and populate table
async function fetchData() {
  try {
    console.log('Fetching data...');
    const response = await fetch('/api/data');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data received:', data);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    if (data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No data available</td></tr>';
      return;
    }

    data.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
    <td>${entry.macAddress || 'N/A'}</td>
    <td>${entry.latitude ? entry.latitude.toFixed(6) : 'N/A'}</td>
    <td>${entry.longitude ? entry.longitude.toFixed(6) : 'N/A'}</td>
    <td>${entry.seq_num || 'N/A'}</td>
  `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    document.getElementById('table-body').innerHTML =
      '<tr><td colspan="4" class="text-center">Error loading data: ' + err.message + '</td></tr>';
  }
}

// Load unique MAC addresses in dropdown
async function loadUniqueMacs() {
  try {
    console.log('Loading MAC addresses...');
    const response = await fetch('/api/data');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data for MACs:', data);

    const uniqueMacs = [...new Set(data.map(item => item.macAddress))];
    const macSelector = document.getElementById('macSelector');
    macSelector.innerHTML = '';

    if (uniqueMacs.length === 0) {
      const opt = document.createElement('option');
      opt.textContent = 'No devices available';
      macSelector.appendChild(opt);
      return;
    }

    uniqueMacs.forEach(mac => {
      const opt = document.createElement('option');
      opt.value = mac;
      opt.textContent = mac;
      macSelector.appendChild(opt);
    });

    if (uniqueMacs.length > 0) {
      showMapForMac(uniqueMacs[0]);
    }
  } catch (err) {
    console.error('Error loading MAC addresses:', err);
  }
}

// Function to fetch and update table data
function updateTable() {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = ''; // Clear existing rows
      
      data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${entry.macAddress || 'N/A'}</td>
          <td>${entry.latitude ? entry.latitude.toFixed(6) : 'N/A'}</td>
          <td>${entry.longitude ? entry.longitude.toFixed(6) : 'N/A'}</td>
          <td>${entry.seq_num || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Initial load
updateTable();

// Auto-refresh every 10 seconds
setInterval(updateTable, 10000);

// Show map for selected MAC
async function showMapForMac(mac) {
  try {
    const response = await fetch('/api/data');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const entries = data.filter(item => item.macAddress === mac);
    if (!entries.length) return;

    // const latest = entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    const latest = entries.sort((a, b) => b.seq_num - a.seq_num)[0];
    const lat = latest.latitude;
    const lng = latest.longitude;

    document.getElementById('map-frame').src =
      `https://maps.google.com/maps?q=${lat},${lng}&z=19&output=embed`;

    document.getElementById('map-container').style.display = 'block';
  } catch (err) {
    console.error('Error loading map for MAC:', err);
  }
}
