// frontend/renderer.js - Electron Renderer Process for Motor tuning software

const DATA_API_URL = 'http://localhost:3000/api/data/live';
const EXPORT_API_URL = 'http://localhost:3000/api/data/export';
const DATA_UPDATE_RATE = 200; // UI update frequency

const dataContainer = document.getElementById('data-display-container');
const exportButton = document.getElementById('export-log-btn');
const statusMessage = document.getElementById('status-message');

/**
 * Fetches live data from the Node.js backend API and updates the UI.
 * (Corresponds to Pros 1, 2, 3: UI, Integration, Data Fetching)
 */
async function fetchLiveData() {
    try {
        const response = await fetch(DATA_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const liveData = await response.json();
        
        renderData(liveData);

    } catch (error) {
        console.error("Error fetching live data:", error);
        dataContainer.innerHTML = `<p style="color: red;">ERROR: Could not connect to backend telemetry service.</p>`;
    }
}

/**
 * Renders the fetched data dynamically.
 * @param {object} data - The JSON object containing live CAN data.
 */
function renderData(data) {
    let html = '';
    
    // Metric A (Speed/RPM) - from CAN ID 0x1A0
    if (data['0x1A0']) {
        html += `<div class="data-card speed">
            <h3>CAN ID: 0x1A0 (Metric A)</h3>
            <p><strong>Value:</strong> <span>${data['0x1A0'].metric_a} [Unit A]</span></p>
            <p class="raw-data">Raw: ${data['0x1A0'].raw}</p>
        </div>`;
    }

    // Metric B (Temperature) - from CAN ID 0x2B1
    if (data['0x2B1']) {
        html += `<div class="data-card temperature">
            <h3>CAN ID: 0x2B1 (Metric B)</h3>
            <p><strong>Value:</strong> <span>${data['0x2B1'].metric_b} [Unit B]</span></p>
            <p class="raw-data">Raw: ${data['0x2B1'].raw}</p>
        </div>`;
    }

    // Metric C (Voltage) - from CAN ID 0x3C2
    if (data['0x3C2']) {
        html += `<div class="data-card voltage">
            <h3>CAN ID: 0x3C2 (Metric C)</h3>
            <p><strong>Value:</strong> <span>${data['0x3C2'].metric_c} [Unit C]</span></p>
            <p class="raw-data">Raw: ${data['0x3C2'].raw}</p>
        </div>`;
    }

    dataContainer.innerHTML = html;
}

/**
 * Handles the data log export process (Pros 4).
 */
exportButton.addEventListener('click', async () => {
    statusMessage.textContent = 'Preparing data export...';
    exportButton.disabled = true;

    try {
        const response = await fetch(EXPORT_API_URL);

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = '[project_log_export].csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            statusMessage.textContent = 'Data exported successfully.';
        } else {
            statusMessage.textContent = `Export failed! Status: ${response.status}`;
        }
    } catch (error) {
        console.error("Export failed:", error);
        statusMessage.textContent = 'Export failed! Check network/backend service.';
    } finally {
        exportButton.disabled = false;
        setTimeout(() => {
            statusMessage.textContent = 'Application running smoothly. Logging status: Active.';
        }, 5000); // Clear message after 5 seconds
    }
});

// Start the continuous data fetching loop
setInterval(fetchLiveData, DATA_UPDATE_RATE);

fetchLiveData();