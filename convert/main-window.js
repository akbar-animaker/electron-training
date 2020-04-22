const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(url) {
        super({
            width: 600,
            height: 800,
            webPreferences: {
                backgroundThrottling: false,
                nodeIntegration: true
            }
        });
        this.loadURL(url)
    }


}

module.exports = MainWindow;