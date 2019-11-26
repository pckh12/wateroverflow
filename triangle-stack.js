const ValidationUtil = require("./utilities/validation-util");
const Glass = require("./Glass");

/**
 * Glasses stacked on top of each other in the triangle shape
 */
class TriangleStack {

    constructor(height) {
        if (!ValidationUtil.isPositiveInteger(height) || !(height > 0))
            throw new Error('height must be a positive integer greater than zero');

        this._height = height;

        // initialise mapping of row -> Glass[]
        this._stack = [...Array(height)].map(x => []);

        this._createStack(height);
    }

    /**
     * The height of the stack
     */
    get height() {
        return this._height;
    }

    /**
     * Retrives the glass at the specified location
     * 
     * @param row row index
     * @param position position index
     */
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

    /**
     * Pours water onto the top of the stack
     * 
     * @param amount the amount of water to pour
     */
    pour(amount) {
        if (!ValidationUtil.isPositiveNumber(amount))
            throw new Error('amount must be a positive number');

        const topGlass = this.getGlass(0, 0);
        if (topGlass)
            topGlass.receive(amount);
    }

    /**
     * Outputs the amount of water held by each glass in the stack
     */
    displayAmounts() {
        console.log(this._stack.map(level => level.map(glass => `${glass.id}: ${glass.amountHeld}`)));
    }

    _createStack(height) {
        this._createGlass(0, 0, height);
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