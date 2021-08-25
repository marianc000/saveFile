const CSV_FILE_DESCRIPTION = {
    description: 'Excel CSV',
    accept: {
        'text/csv': ['.csv'],
    }
};

let fileHandle;

export function saveContents(contents, suggestedName) {
    if (!fileHandle) {
        return saveAsContents(contents, suggestedName);
    }
    return saveFile(contents, fileHandle);
}

export async function saveAsContents(contents, suggestedName) {
    try {
        fileHandle = await getNewFileHandle(suggestedName, CSV_FILE_DESCRIPTION);
    } catch (ex) {
        console.error(ex);
        alert('The selected file is opened in Excel');
        return;
    }
    saveFile(contents, fileHandle);
}

async function saveFile(contents, fileHandle) {
    try {
        const writable = await fileHandle.createWritable();
        await writable.write(contents);
        await writable.close();
    } catch (ex) {
        console.error(ex);
        alert('The selected file is opened in Excel');
        return;
    }

    console.log("<saveFile");
}

function getNewFileHandle(suggestedName, fileType) {
    return showSaveFilePicker({
        suggestedName,
        types: [fileType]
    });
}