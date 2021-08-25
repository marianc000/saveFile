import { displayTable, displayedDataAsCSV } from './results.js';
import { downloadContents } from './download.js';
import { saveContents, saveAsContents } from './save.js';

const DATA_URL = 'api/benchmarkingDOM';


fetch(DATA_URL).then(response => response.json()).then(data => loaded(data));

function loaded(data) {
    displayTable(data, 'Time to modify DOM, ms');
    downloadBtn.onclick = download;
    downloadAutomaticBtn.onclick = keepDownloading;
    saveBtn.onclick = save;
    saveAsBtn.onclick = saveAs;
    saveAutomaticBtn.onclick = startSaving;
}

function download() {
    downloadContents(displayedDataAsCSV(), 'DOM.csv');
}

const INTERVAL = 3000;

let downloadIntervalId;

function keepDownloading() {
    if (downloadIntervalId) return;
    download();
    downloadIntervalId = setInterval(download, INTERVAL);
}

function save() {
    return saveContents(displayedDataAsCSV(), 'DOM2.csv');
}

function saveAs() {
    saveAsContents(displayedDataAsCSV(), 'DOM2.csv');
}

let saveTimeoutId;

function keepSaving() {
    save().then(() => saveTimeoutId = setTimeout(keepSaving, INTERVAL));
}

function startSaving() {
    if (saveTimeoutId) return;
    keepSaving();
}