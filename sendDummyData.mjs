import fetch from 'node-fetch';
import fs from 'fs/promises';

async function sendDummyData() {
  try {
    const data = await fs.readFile('./dummyData.json', 'utf-8');
    const dummyData = JSON.parse(data);

    for (const entry of dummyData) {
      console.log('Sending:', entry);
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });

      const result = await response.json();
      console.log('✅ Response:', result);
    }
  } catch (error) {
    console.error('❌ Error sending data:', error);
  }
}

sendDummyData();
