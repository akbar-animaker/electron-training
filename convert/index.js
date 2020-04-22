const electron = require('electron');
const { app, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');
const MainWindow = require('./main-window');

let mainWindow;
app.on('ready', () => {
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
})

ipcMain.on('Videos-Added', (event, videos) => {
    // const promise = new Promise((resolve, reject) => {
    //     ffmpeg.ffprobe(videos[0].path, (err, metaData) => {
    //         resolve(metaData)
    //     })
    // })
    // promise.then((metaData) => {

    // })

    const promoises = videos.map((video) => {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(video.path, (err, metaData) => {
                resolve(metaData);
            })
        })
    })

    Promise.all(promoises).then((results) => {
        console.log(results)
    })
})