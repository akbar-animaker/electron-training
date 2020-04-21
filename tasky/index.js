const eletron = require('electron');
const path = require('path');
const { app, BrowserWindow, Tray } = eletron;

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
    tray = new Tray(iconPath);

    tray.on('click', (evt, bounds) => {
        const { x, y } = bounds;
        const { width, height } = mainWindow.getBounds();
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            /**
             * This is because OSX icons displayed in top but window, icons displayed in bottom
             */
            const yPosition = process.platform === 'darwin' ? y : y - height;
            mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                width,
                height
            })
            mainWindow.show();
        }
    })
})