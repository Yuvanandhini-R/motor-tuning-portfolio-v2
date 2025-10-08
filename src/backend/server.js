// backend/server.js - Node.js Backend for [Motor tuning software]

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DB_PATH = 'mts.db'; // Generalized DB file name

// --- Database Setup (SQLite) ---
let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('[Motor tuning software] DB Error: Could not connect.', err);
    } else {
        console.log('[Motor tuning software] Connected to SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS device_data_logs (
            log_id INTEGER PRIMARY KEY AUTOINCREMENT,
            log_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            can_identifier TEXT NOT NULL,
            metric_a REAL,
            metric_b REAL,
            metric_c REAL,
            raw_can_frame TEXT
        )`);
    }
});

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Embedded Device Communication and Data Logging Mock ---

// CRITICAL ISSUE: This frequency is the source of "High Processing Frequency" and "Memory Usage" cons.
const LOGGING_FREQUENCY_MS = 1000 / 8; // Target: 8 messages per second

function mockDeviceRead() {
    // Simulates reading various CAN messages from the device
    return {
        '0x1A0': { metric_a: (Math.random() * 5000).toFixed(2), raw: '01 A2 B3 C4' }, // Speed
        '0x2B1': { metric_b: (Math.random() * 100).toFixed(2), raw: 'D5 E6 F7 08' },  // Temperature
        '0x3C2': { metric_c: (Math.random() * 48).toFixed(2), raw: '19 2A 3B 4C' }   // Voltage
    };
}

let currentLiveData = {}; // Cache for live data

function logAndProcessData() {
    const messages = mockDeviceRead();

    // Intensive Processing and Logging Loop (The root of the performance issues)
    Object.keys(messages).forEach(canId => {
        const data = messages[canId];

        // Update live data cache for frontend API
        currentLiveData[canId] = data;

        // Frequent Data Storing (Leads to rapid storage fill and redundancy)
        const stmt = db.prepare(`INSERT INTO device_data_logs 
            (can_identifier, metric_a, metric_b, metric_c, raw_can_frame) 
            VALUES (?, ?, ?, ?, ?)`);

        // Insert based on the CAN ID
        let val_a = (canId === '0x1A0') ? data.metric_a : null;
        let val_b = (canId === '0x2B1') ? data.metric_b : null;
        let val_c = (canId === '0x3C2') ? data.metric_c : null;
        
        stmt.run(canId, val_a, val_b, val_c, data.raw);
        stmt.finalize();
    });
    // This high frequency (8 logs/sec * 3 IDs) leads to resource exhaustion.
}

// Start the logging loop
setInterval(logAndProcessData, LOGGING_FREQUENCY_MS);


// --- API Endpoints ---

// 1. Live Data Endpoint
app.get('/api/data/live', (req, res) => {
    res.json(currentLiveData);
});

// 2. Data Logging/Export Endpoint (Pros 4)
app.get('/api/data/export', (req, res) => {
    const filename = '[project_log_export].csv';
    const filePath = `./${filename}`;

    db.all("SELECT * FROM device_data_logs ORDER BY log_timestamp DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed.' });
        }

        // CSV Header
        let csvContent = 'Timestamp,CAN_ID,Metric_A (Speed),Metric_B (Temp),Metric_C (Volt),Raw_Message\n';
        
        // CSV Rows
        rows.forEach(row => {
            csvContent += `${row.log_timestamp},${row.can_identifier},${row.metric_a || ''},${row.metric_b || ''},${row.metric_c || ''},${row.raw_can_frame}\n`;
        });

        fs.writeFileSync(filePath, csvContent);
        res.download(filePath, (downloadErr) => {
            if (downloadErr) {
                console.error('Error sending file:', downloadErr);
                res.status(500).send('Could not export file.');
            }
        });
    });
});


// Start the Express server
app.listen(PORT, () => {
    console.log(`[Motor tuning software] Backend API running on http://localhost:${PORT}`);
});