export function viewHtml(arr) {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        html.innerHTML += `
        <li class="list-group-item">${arr[i]}</li>
        `;
    }
}
