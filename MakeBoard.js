window.onload = function init() {
    let board = document.getElementById('board');
    for (let x = 0; x < 9; x++) {
        let row = document.createElement('tr');
        row.classList.add('row');
        for (let i = 1; i < 10; i++) {
            let cell = document.createElement('td');
            cell.id = 'cell-' + (i + x * 9 - 1);
            cell.setAttribute("onclick","selectBox('" + cell.id + "')");
            cell.classList.add('cell');
            if (i % 3 == 0) {
                cell.classList.add('border-r')
            }
            if (x % 3 == 0) {
                cell.classList.add('border-t')
            }
            cell.innerText = i + x * 9 - 1;
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function selectBox(id) {
    let cell = document.getElementById(id);
    if (cell) {
        for (let i = 0; i < 81; i++) {
            if ('cell-'+i === id)
                continue
            document.getElementById('cell-'+i).classList.remove('selected');
        }
        cell.classList.toggle("selected")
    }
}