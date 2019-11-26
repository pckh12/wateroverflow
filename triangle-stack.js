const ValidationUtil = require("./utilities/validation-util");
const Glass = require("./Glass");

class TriangleStack {

    constructor(height) {
        if (!ValidationUtil.isPositiveInteger(height) || !(height > 0))
            throw new Error('height must be a positive integer greater than zero');

        this._height = height;

        // initialise mapping of row -> Glass[]
        this._stack = [...Array(height)].map(x => []);

        this._createStack(height);


        // this._stack[0].push('abc');
        // this._stack[1].push('def');
    }

    get height() {
        return this._height;
    }

    getGlass(row, position) {
        if (!ValidationUtil.isPositiveInteger(row))
            throw new Error('row must be a positive integer');

        if (!ValidationUtil.isPositiveInteger(position))
            throw new Error('position must be a positive integer');

        if (row < this._stack.length) {
            const items = this._stack[row];
            if (position < items.length) {
                return items[position];
            }
        }

        return null;
    }

    _createStack(height) {
        const top = this._createGlass(0, 0, height);
        //this._stack = top;
    }

    _createGlass(row, position, maxHeight) {
        // get glass if it has already been created
        let glass = this.getGlass(row, position);
        if (glass == null) {
            glass = new Glass({ row, position });
            this._stack[glass.row].push(glass);
        }

        const nextRow = row + 1;
        if (nextRow < maxHeight) {

            const left = this._createGlass(nextRow, glass.position, maxHeight);
            const right = this._createGlass(nextRow, glass.position + 1, maxHeight);

            glass.stackOnTop(left, right);
        }



        return glass;
    }
}

module.exports = TriangleStack;