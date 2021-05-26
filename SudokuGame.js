const boardSize = 9;
const gridSize = 3;

class SudokuGame {
    constructor() {
        this.board = [];
        let values = [0];
        while (values.includes(0)) {
            values = [];
            for (let x = 1; x <= boardSize ** 2; x++) {
                if (x < boardSize) {
                    values.push(x);
                } else {
                    values.push(0);
                }
            }
            shuffleArray(values);
            while (values.includes(0)) {
                let least = -1;
                let least_options = [1,2,3,4,5,6,7,8,9,10];
                // iterate the whole board for the least flexible cell with no value
                for (let cell = least + 1; cell < values.length; cell++) {
                    if (values[cell] !== 0) {
                        continue
                    }
                    var options = [1,2,3,4,5,6,7,8,9];
                    // Search neighbors for option elimination
                    const neighbors = this.cellNeighbors(cell);
                    for (let n = 0; n < neighbors.length; n++) {
                        if (options.includes(values[neighbors[n]])) {
                            options.splice(options.indexOf(values[neighbors[n]]), 1);
                        }
                    }
                    if (options.length < least_options.length) {
                        least = cell;
                        least_options = options;
                    }
                    if (options.length === 0) {
                        break;
                    }
                }
                if (least_options.length > 0) {
                    values[least] = randomArray(least_options);
                } else {
                    break;
                }
            }
            
        }
        for (let i = 0; i < values.length; i++) {
            this.board.push(new SudokuCell(values[i]));
        }
    }

    // temporary function until I pick a architecture pattern
    print() {
        for (let i = 0; i < this.board.length; i++) {
            let element = document.getElementById('cell-' + i);
            element.innerText = this.board[i].value;
        }
    }

    columnIndexes(index) {
        if (index >= 81 || index < 0)
            throw new Error('Invalid cell index.');
        let indexes = [];
        let startingIndex = index % boardSize;
        for (let y = 0; y < boardSize; y++) {
            indexes.push(startingIndex + y * boardSize);
        }
        return indexes;
    }

    rowIndexes(index) {
        if (index >= 81 || index < 0)
            throw new Error('Invalid cell index.');
        let indexes = [];
        let startingIndex = index - index % boardSize;
        for (let x = 0; x < boardSize; x++) {
            indexes.push(startingIndex + x);
        }
        return indexes;
    }

    boxIndexes(index) {
        if (index >= 81 || index < 0) {
            throw new Error('Invalid cell index.');
        }
        let indexes = [];
        let startingIndex = (index - 9 * (Math.floor(index / 9) % 3)) - (index - 9 * (Math.floor(index / 9) % 3)) % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                indexes.push(startingIndex + i + j * 9);
            }
        }
        return indexes;
    }

    cellNeighbors(index) {
        let col = this.columnIndexes(index);
        const row = this.rowIndexes(index);
        const box = this.boxIndexes(index);
        for (let i = 0; i < boardSize; i++) {
            if (!col.includes(row[i])) {
                col.push(row[i]);
            }
            if (!col.includes(box[i])) {
                col.push(box[i]);
            }
        }
        col.splice(col.indexOf(+index), 1);
        return col;
    }

    validate() {
        if (this.board.length !== boardSize ** 2)
            return false;

        for (let i = 0; i < boardSize ** 2; i++) {
            let neighbors = this.cellNeighbors(i);
            for (let j = 0; j < neighbors.length; j++) {
                if (this.board[i].value === this.board[neighbors[j]].value) {
                    return false;
                }
            }
        }
        return true;
    }
}