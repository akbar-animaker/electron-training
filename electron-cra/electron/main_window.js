const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(url) {
        super({
            webPreferences: {
                nodeIntegration: true,
                backgroundThrottling: false
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