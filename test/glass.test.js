const { should } = require('chai').should();
const Glass = require('../glass');

describe('Glass', () => {

    describe('#constructor()', () => {
        it('requires a valid argument', () => {
            (() => {
                new Glass();
            }).should.throw(Error);

            (() => {
                new Glass({ row: 2, position: 1 });
            }).should.not.throw(Error);

            (() => {
                new Glass({ row: 2, position: 1, maxCapacity: 500 });
            }).should.not.throw(Error);
        });

        it('requires row to be a positive integer', () => {
            (() => {
                new Glass({ row: 'abc', position: 0 });
            }).should.throw(Error);

            (() => {
                new Glass({ row: 12.34, position: 0 });
            }).should.throw(Error);

            (() => {
                new Glass({ row: 3, position: 0 });
            }).should.not.throw(Error);
        });

        it('requires position to be a positive integer', () => {
            (() => {
                new Glass({ row: 0, position: 'abc' });
            }).should.throw(Error);

            (() => {
                new Glass({ row: 0, position: 2.34 });
            }).should.throw(Error);

            (() => {
                new Glass({ row: 0, position: 5 });
            }).should.not.throw(Error);
        });

        it('requires max capacity to be a positive number', () => {
            (() => {
                new Glass({ row: 0, position: 0, maxCapacity: 'abc' });
            }).should.throw(Error);

            (() => {
                new Glass({ row: 0, position: 0, maxCapacity: 2.34 });
            }).should.not.throw(Error);
        });
    });

    describe('#row', () => {
        it('returns the row', () => {
            const glass = new Glass({ row: 2, position: 1 });
            glass.row.should.equal(2);
        });
    });

    describe('#position', () => {
        it('returns the position', () => {
            const glass = new Glass({ row: 2, position: 1 });
            glass.position.should.equal(1);
        });
    });

    describe('#maxCapacity', () => {
        it('returns the max capacity', () => {
            const glass = new Glass({ row: 2, position: 1, maxCapacity: 300 });
            glass.maxCapacity.should.equal(300);
        });

        it('defaults max capacity to 250', () => {
            const glass = new Glass({ row: 2, position: 1 });
            glass.maxCapacity.should.equal(250);
        });
    });

    describe('#amountHeld', () => {
        it('defaults to zero', () => {
            const glass = new Glass({ row: 2, position: 1 });
            glass.amountHeld.should.equal(0);
        });
    });

    describe('#availableCapacity', () => {
        it('defaults to max capacity', () => {
            const glass = new Glass({ row: 2, position: 1 });
            glass.availableCapacity.should.equal(glass.maxCapacity);
        });
    });

    describe('#id', () => {
        it('generates id', () => {
            const glass = new Glass({ row: 2, position: 1 });
            glass.id.should.equal(`(${glass.row},${glass.position})`);
        });
    });

    describe('#stackedLeft', () => {
        it('left side is not stacked on top of anything', () => {
            const glass = new Glass({ row: 2, position: 1 });
            (glass.stackedLeft === null).should.be.true;

        });
    });

    describe('#stackedRight', () => {
        it('right side is not stacked on top of anything', () => {
            const glass = new Glass({ row: 2, position: 1 });
            (glass.stackedRight === null).should.be.true;
        });
    });
});