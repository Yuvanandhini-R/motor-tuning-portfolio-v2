// FILE: src/backend/server.js

// NDA-SAFE MOCK CODE: This is a basic Express server setup for structural reference, 
// NOT the actual complex server logic used for embedded communication.

const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2/promise'); // Placeholder for database interaction

const app = express();
const PORT = 3001; // Internal API port

app.use(cors());
app.use(express.json());

// --- Database Connection (MOCK SETUP) ---
// IMPORTANT: In the real app, connection details are managed securely.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'MOCK_PASSWORD_ONLY', // NEVER use a real password here
    database: 'mock_galaxi_db'
});

// --- API Route: Get latest logged data for UI display ---
app.get('/api/latest-data', async (req, res) => {
    console.log('API called: /api/latest-data (MOCK)');
    try {
        // This query simulates the data fetching for the React UI
        const [rows] = await pool.query(
            'SELECT timestamp, can_id, data_value FROM can_log ORDER BY timestamp DESC LIMIT 10'
        );
        
        // MOCK RESPONSE
        res.json(rows);
    } catch (error) {
        console.error('Mock database query error:', error);
        res.status(500).json({ error: 'Failed to fetch mock data' });
    }
});

// --- API Route: Simple Status Check ---
app.get('/api/status', (req, res) => {
    res.json({ 
        service: 'Backend API', 
        status: 'Operational (Mock)',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Mock Backend API running on port ${PORT}`);
});