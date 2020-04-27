const electron = require('electron');
const { BrowserWindow } = electron;
const path = require('path');

class MainWindow extends BrowserWindow {
    constructor(url) {
        super({
            webPreferences: {
                nodeIntegration: true,
                backgroundThrottling: false,
                preload: path.join(__dirname, 'preload.js'),
            },
            width: 300,
            height: 500,
            frame: false,
            resizable: false,
            show: false
        });
        this.loadURL(url);
    }
}

module.exports = MainWindow;