const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    // Load your React app, or load the `build` folder after running `npm run build`.
    win.loadURL('http://localhost:3000');
}

// When Electron has finished initialization
app.whenReady().then(() => {
    createWindow();

    // On macOS, recreate the window if the dock icon is clicked and no windows are open
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
