import { displayTable, getDisplayedDataAsCSV } from './results.js';
import { downloadContents } from './download.js';
import { saveContents,writeURLToFile } from './save.js';

const DATA_URL = 'api/benchmarkingDOM';

function load() {
    fetch(DATA_URL).then(response => response.json()).then(data => loaded(data));
}

function loaded(data) {
    displayTable(data, 'Time to modify DOM, ms');
    downloadBtn.onclick = download;
    downloadAutomaticBtn.onclick = keepDownloading;
    saveBtn.onclick = save;
    saveAutomaticBtn.onclick = keepSaving;
    saveFromURLBtn.onclick = saveFromURL;
}

function download() {
    const data = getDisplayedDataAsCSV();
    downloadContents(data, 'DOM.csv');
}

const INTERVAL = 5000;

let downloadIntervalId;

function keepDownloading() {
    if (downloadIntervalId) return;
    download();
    downloadIntervalId = setInterval(download, INTERVAL);
}

function save() {
    console.log(">saving");
    const data = getDisplayedDataAsCSV();
    saveContents(data, 'DOM2.csv');
}

let saveIntervalId;

function keepSaving() {
    if (saveIntervalId) return;
    save();
    saveIntervalId = setInterval(save, INTERVAL);
}

function saveFromURL() {
    writeURLToFile(DATA_URL, 'DOM.json');
}

load();