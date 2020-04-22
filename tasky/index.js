const eletron = require('electron');
const path = require('path');
const { app, BrowserWindow } = eletron;
const TimerTray = require('./timer_tray');

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 500,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow);
})