class SudokuCell {
    constructor(index, value = null) {
        this.index = index;
        this.value = value;
        this.isHint = value === null ? false : true;
        this.eliminated = [];
        this.notes = [];
    }

    get value() {
        return this._value;
    }
    set value(value) {
        if (value !== null && value <= 0 && value > 9) {
            throw new Error('Expected value between 1 and 9. Got ' + value + ' instead.');
        }
        if (value === null) {
            this.isHint = false;
        }
        this._value = value;
    }
}