function tr(val) {
    return `<tr>${val}</tr>`;
}

function th(val) {
    return `<th>${val}</th>`;
}
function td(val) {
    return `<td contenteditable='true'>${val}</td>`;
}

function table(caption, val) {
    return `<table><caption>${caption}</caption>${val}</table>`;
}

export function displayTable(data, caption) {
    const headers = tr(th('Method') + data[0].slice(1, -1).map((v, i) => th(i)).join('') + th('Average'));
    const rows = data.map(row => tr(row.map(cell => td(cell)).join(''))).join('');
    tableDiv.innerHTML = table(caption, headers + rows);
}

export function displayedDataAsCSV() {
    return displayedData()
        .map(row => row.map(cell => `"${cell}"`).join(';')).join("\n");
}

function displayedData() {
    return [...tableDiv.querySelectorAll('tr')]
        .map(row => [...row.children].map(td => td.innerText));
}

