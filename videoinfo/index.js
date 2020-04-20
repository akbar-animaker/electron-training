const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('Video:Submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metaData) => {
        mainWindow.webContents.send('Video:MetaData', metaData.format.duration)
    })
})