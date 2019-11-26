const ValidationUtil = require("./utilities/validation-util");
const Big = require('big.js');

class Glass {

    constructor(spec) {
        this._ensureValidSpec(spec);

        this._row = spec.row;
        this._position = spec.position;
        this._maxCapacity = spec.maxCapacity || 250;
        this._amountHeld = 0;
        this._stackedLeft = null;
        this._stackedRight = null;
    }

    get row() {
        return this._row;
    }

    get position() {
        return this._position;
    }

    get maxCapacity() {
        return this._maxCapacity;
    }

    get amountHeld() {
        return this._amountHeld;
    }

    get availableCapacity() {
        return this._maxCapacity - this._amountHeld;
    }

    get id() {
        return `(${this._row},${this._position})`;
    }

    get stackedLeft() {
        return this._stackedLeft;
    }

    get stackedRight() {
        return this._stackedRight;
    }

    stackOnTop(left, right) {
        if (!left || !right)
            throw new Error('must stack on both sides');

        this._stackedLeft = left;
        this._stackedRight = right;
    }

    receive(inflow) {
        if (!ValidationUtil.isPositiveNumber(inflow))
            throw new Error('amount must be a positive number');

        if (inflow <= this.availableCapacity) {
            // add to any existing amount already _amountHeld
            this._amountHeld = +(new Big(this._amountHeld).plus(inflow));
        }
        else {
            // overflow
            const overflow = +(new Big(inflow).minus(this.availableCapacity));
            this._amountHeld = this._maxCapacity;
            this._applyOverflow(overflow);
        }
    }

    _ensureValidSpec(spec) {
        if (!ValidationUtil.isPositiveInteger(spec.row))
            throw new Error('row must be a positive integer');

        if (!ValidationUtil.isPositiveInteger(spec.position))
            throw new Error('position must be a positive integer');

        if (spec.maxCapacity && !ValidationUtil.isPositiveNumber(spec.maxCapacity))
            throw new Error('position must be a positive number');
    }

    _applyOverflow(overflow) {
        if (!this._isStacked)
            return;

        // distribute overflow evenly into glasses below
        let distribution = +(new Big(overflow).div('2'));

        this._stackedLeft.receive(distribution);
        this._stackedRight.receive(distribution);
    }

    get _isStacked() {
        return (this._stackedLeft != null && this._stackedRight != null);
    }
}

module.exports = Glass;