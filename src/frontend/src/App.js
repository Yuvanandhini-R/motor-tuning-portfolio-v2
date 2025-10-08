// FILE: src/frontend/src/App.js

// NDA-SAFE MOCK CODE: This is a simplified React component, NOT the actual complex UI code.
// The real component manages complex state and renders specialized industrial charts (e.g., Plotly).

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [status, setStatus] = useState("Checking...");
  const [data, setData] = useState([]);

  // Mock function to fetch data from the mock backend API
  const fetchMockData = async () => {
    try {
      const statusRes = await axios.get('http://localhost:3001/api/status');
      setStatus(statusRes.data.status);

      const dataRes = await axios.get('http://localhost:3001/api/latest-data');
      // In a real app, this data would be fed into complex charts/gauges
      setData(dataRes.data); 

    } catch (error) {
      setStatus("Error: Backend offline (Mock)");
    }
  };

  useEffect(() => {
    fetchMockData();
    const interval = setInterval(fetchMockData, 5000); // Simulate polling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App-container">
      <h1>Motor Control Unit Desktop App (MOCK PORTFOLIO)</h1>
      <p>This component demonstrates the React structure and API communication only.</p>
      
      <div className="status-bar">
        Backend Status: <strong>{status}</strong>
      </div>

      <h2>Latest Log Data (Simulated)</h2>
      {data.length > 0 ? (
        <p>Successfully fetched {data.length} mock data points. Ready for plotting!</p>
      ) : (
        <p>Awaiting mock data...</p>
      )}

      <button onClick={fetchMockData}>Refresh Mock Data</button>
      
    </div>
  );
}

export default App;