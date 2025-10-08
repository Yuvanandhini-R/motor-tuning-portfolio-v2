// main.js - Electron Main Process
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Include the backend server to run alongside the Electron app
require('./backend/server'); 

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // Standard Electron security measures
            preload: path.join(__dirname, 'preload.js'), 
            nodeIntegration: false, 
            contextIsolation: true 
        }
    });

    mainWindow.loadFile('frontend/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});