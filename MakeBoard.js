window.onload = function init() {
    let board = document.getElementById('board');
    for (let x = 0; x < 9; x++) {
        let row = document.createElement('tr');
        row.classList.add('row');
        for (let i = 1; i < 10; i++) {
            let cell = document.createElement('td');
            cell.id = 'cell-' + (i + x * 9);
            cell.setAttribute("onclick","selectBox('" + cell.id + "')");
            cell.classList.add('cell', 'hint');
            if (i % 3 == 0) {
                cell.classList.add('border-r')
            }
            if (x % 3 == 0) {
                cell.classList.add('border-t')
            }
            cell.innerText = i;
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function selectBox(id) {
    element = document.getElementById(id);
    element.classList.toggle("selected");
}