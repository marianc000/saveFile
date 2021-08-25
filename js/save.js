let fileHandle;

const CSV_FILE_DESCRIPTION = {
    description: 'Excel CSV',
    accept: {
        'text/csv': ['.csv'],
    }
};
const JSON_FILE_DESCRIPTION = {
    description: 'JSON',
    accept: {
        'application/json': ['.json'],
    }
};

export async function saveContents(contents, suggestedName) {
    if (!fileHandle) {
        fileHandle = await getNewFileHandle(suggestedName, CSV_FILE_DESCRIPTION);
    }

    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
}

function getNewFileHandle(suggestedName, fileType) {
    return showSaveFilePicker({
        suggestedName,
        types: [fileType]
    });
}


export async function writeURLToFile(url, suggestedName) {
    const fileHandle = await getNewFileHandle(suggestedName, JSON_FILE_DESCRIPTION);
    Promise.all([fileHandle.createWritable(), fetch(url)])
        .then(([writable, response]) => response.body.pipeTo(writable));
    // pipeTo() closes the destination pipe by default, no need to close it.
}