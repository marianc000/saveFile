export function downloadContents(contents, fileName) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([contents]));
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}
