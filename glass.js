const ValidationUtil = require("./utilities/validation-util");
const Big = require('big.js');

/**
 * A stackable glass which can hold an amount of liquid up to its maximum capacity
 */
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

    /**
     * Index of the row where the glass is located.
     * The i position from the top (zero-baed index)
     */
    get row() {
        return this._row;
    }

    /**
     * The index of the horizontal position of glass.
     * The j position from the left (zero-based index)
     */
    get position() {
        return this._position;
    }

    /**
     * The maximum capacity of the glass
     */
    get maxCapacity() {
        return this._maxCapacity;
    }

    /**
     * The amount of liquid held by the glass
     */
    get amountHeld() {
        return this._amountHeld;
    }

    /**
     * The amount of capacity still available in the glass
     */
    get availableCapacity() {
        return this._maxCapacity - this._amountHeld;
    }

    /**
     * An identifier for the glass
     */
    get id() {
        return `(${this._row},${this._position})`;
    }

    /**
     * The left glass where this glass is stacked upon
     */
    get stackedLeft() {
        return this._stackedLeft;
    }

    /**
     * The right glass where this glass is stacked upon
     */
    get stackedRight() {
        return this._stackedRight;
    }

    /**
     * Stacks the glass on top
     * 
     * @param left the left glass
     * @param right the right glass
     */
    stackOnTop(left, right) {
        if (!left || !right)
            throw new Error('must stack on both sides');

        this._stackedLeft = left;
        this._stackedRight = right;
    }

    /**
     * Receives water into the glass
     * 
     * @param inflow the amount of water flowing into the glass
     */
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