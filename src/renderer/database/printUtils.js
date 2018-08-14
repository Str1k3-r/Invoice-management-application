var ipc = require("electron").ipcRenderer


function sendPrintData(data) {
    ipc.send('print-data', data)
}



