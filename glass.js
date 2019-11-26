class Glass {

    constructor(spec) {
        this._ensureValidSpec(spec);

        this._row = spec.row;
        this._position = spec.position;
        this._maxCapacity = spec.maxCapacity || 250;
        this._amountHeld = 0;
        this._availableCapacity = this._maxCapacity;
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
        return this._availableCapacity;
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

    _ensureValidSpec(spec) {
        if (!this._isPositiveInteger(spec.row))
            throw new Error('row must be a positive integer');

        if (!this._isPositiveInteger(spec.position))
            throw new Error('position must be a positive integer');

        if (spec.maxCapacity && !this._isPositiveNumber(spec.maxCapacity))
            throw new Error('position must be a positive number');
    }

    _isPositiveInteger(value) {
        return (value !== 'undefined' && Number.isInteger(value) && value >= 0);
    }

    _isPositiveNumber(value) {
        return (value !== 'undefined' && (typeof value === 'number') && value >= 0);
    }
}

module.exports = Glass;