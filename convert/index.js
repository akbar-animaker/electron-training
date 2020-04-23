const electron = require('electron');
const { app, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');
const MainWindow = require('./main-window');
const _ = require('lodash')

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
                video.duration = metaData.format.duration;
                video.format = 'avi';
                resolve(video);
            })
        })
    })

    Promise.all(promoises).then((results) => {
        mainWindow.webContents.send('metadata:complete', results)
    })
})

ipcMain.on('Videos-Start', (event, videos) => {
    // const video = videos[0];
    console.log(videos);
    // const outputDir = video.path.split(video.name)[0];
    // const opName = video.path.split('.')[0];
    // const opPath = `${outputDir}${opName}.${video.format}`;
    // console.log(opPath);
    // ffmpeg(video.path).output(opPath).on('end', () => {
    //     console.log('Viode Process Complete')
    // }).run()
})