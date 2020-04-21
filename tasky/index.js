const eletron = require('electron');
const { app, BrowserWindow } = eletron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 500,
        frame: false,
        resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
})