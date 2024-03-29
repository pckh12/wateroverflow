const { should } = require('chai').should();
const Glass = require('../glass');
const TriangleStack = require('../triangle-stack')

describe('TriangleStack', () => {

    describe('#constructor()', () => {
        it('requires a valid integer argument', () => {
            (() => {
                new TriangleStack();
            }).should.throw(Error);

            (() => {
                new TriangleStack('abc');
            }).should.throw(Error);

            (() => {
                new TriangleStack(4.5);
            }).should.throw(Error);

            (() => {
                new TriangleStack(0);
            }).should.throw(Error);

            (() => {
                new TriangleStack(4);
            }).should.not.throw(Error);
        });
    });

    describe('#height', () => {
        it('returns the height of the stack', () => {
            const stack = new TriangleStack(4);
            stack.height.should.equal(4);
        });
    });

    describe('#getGlass()', () => {
        let stack;

        beforeEach(() => {
            stack = new TriangleStack(4);
        });

        it('requires positive integer arguments', () => {
            (() => {
                stack.getGlass('abc', 0);
            }).should.throw(Error);

            (() => {
                stack.getGlass(0, 'abc');
            }).should.throw(Error);

            (() => {
                stack.getGlass(0, 2.34);
            }).should.throw(Error);

            (() => {
                stack.getGlass(4.56, 0);
            }).should.throw(Error);

            (() => {
                stack.getGlass(0, 0);
            }).should.not.throw(Error);

            (() => {
                stack.getGlass(1, 0);
            }).should.not.throw(Error);
        });

        it('returns null when glass is not found', () => {
            const glass = stack.getGlass(1, 2);
            (glass === null).should.be.true;
        });

        it('retrieves the correct glass', () => {
            let glass = stack.getGlass(0, 0);
            glass.id.should.be.equal('(0,0)')

            glass = stack.getGlass(1, 0);
            glass.id.should.be.equal('(1,0)')

            glass = stack.getGlass(2, 1);
            glass.id.should.be.equal('(2,1)')

            glass = stack.getGlass(2, 2);
            glass.id.should.be.equal('(2,2)')

            glass = stack.getGlass(3, 3);
            glass.id.should.be.equal('(3,3)')
        });

        it('stacking order is correct', () => {
            let glass = stack.getGlass(0, 0);

            glass.stackedLeft.id.should.be.equal('(1,0)');
            glass.stackedLeft.stackedLeft.id.should.be.equal('(2,0)');
            glass.stackedLeft.stackedRight.id.should.be.equal('(2,1)');

            glass.stackedRight.id.should.be.equal('(1,1)');
            glass.stackedRight.stackedLeft.id.should.be.equal('(2,1)');
            glass.stackedRight.stackedRight.id.should.be.equal('(2,2)');
        });

    });

    describe('#pour()', () => {
        let stack;
        let topGlass;
        let inflow;
        let diff;

        context('pouring less than max capacity', () => {

            before(() => {
                stack = new TriangleStack(4);
                topGlass = stack.getGlass(0, 0);
                diff = 10;
                inflow = topGlass.maxCapacity - diff;

                stack.pour(inflow);
            });

            it('amount held is less than max capacity', () => {
                topGlass.amountHeld.should.equal(inflow);
            });

            it('available capacity is correct', () => {
                topGlass.availableCapacity.should.equal(diff);
            });

            it('should not overflow', () => {
                topGlass.stackedLeft.amountHeld.should.equal(0);
                topGlass.stackedRight.amountHeld.should.equal(0);
            });
        });

        context('pouring overflows to second level', () => {

            before(() => {
                stack = new TriangleStack(4);
                topGlass = stack.getGlass(0, 0);
                diff = 100.80;
                inflow = topGlass.maxCapacity + diff;

                stack.pour(inflow);
            });

            it('top glass is full', () => {
                topGlass.amountHeld.should.equal(topGlass.maxCapacity);
                topGlass.availableCapacity.should.equal(0);
            });

            it('water overflows to second level', () => {
                topGlass.stackedLeft.amountHeld.should.be.above(0);
                topGlass.stackedRight.amountHeld.should.be.above(0);
            });

            it('overflow is evenly distributed to second level', () => {
                const distributedAmount = diff / 2;
                topGlass.stackedLeft.amountHeld.should.equal(distributedAmount);
                topGlass.stackedRight.amountHeld.should.equal(distributedAmount);
                topGlass.stackedLeft.amountHeld.should.equal(topGlass.stackedRight.amountHeld);
            });
        });

        context('pouring overflows to third level', () => {

            before(() => {
                stack = new TriangleStack(4);
                topGlass = stack.getGlass(0, 0);
                inflow = 1000

                stack.pour(inflow);
            });

            it('top glass is full', () => {
                topGlass.amountHeld.should.equal(topGlass.maxCapacity);
                topGlass.availableCapacity.should.equal(0);
            });

            it('second level glasses are full', () => {
                const glass10 = stack.getGlass(1, 0);
                const glass11 = stack.getGlass(1, 1);
                glass10.amountHeld.should.equal(glass10.maxCapacity);
                glass11.amountHeld.should.equal(glass11.maxCapacity);
            });

            it('overflow reaches third level', () => {
                const glass20 = stack.getGlass(2, 0);
                const glass21 = stack.getGlass(2, 1);
                const glass22 = stack.getGlass(2, 2);

                glass20.amountHeld.should.equal(62.5);
                glass21.amountHeld.should.equal(125);
                glass22.amountHeld.should.equal(62.5);
            });
        });

        context('pouring overflows to fourth level', () => {

            before(() => {
                stack = new TriangleStack(4);
                topGlass = stack.getGlass(0, 0);
                inflow = 2000

                stack.pour(inflow);
            });

            it('top glass is full', () => {
                topGlass.amountHeld.should.equal(topGlass.maxCapacity);
                topGlass.availableCapacity.should.equal(0);
            });

            it('second level glasses are full', () => {
                const glass10 = stack.getGlass(1, 0);
                const glass11 = stack.getGlass(1, 1);
                glass10.amountHeld.should.equal(glass10.maxCapacity);
                glass11.amountHeld.should.equal(glass11.maxCapacity);
            });

            it('third level glasses are full', () => {
                const glass20 = stack.getGlass(2, 0);
                const glass21 = stack.getGlass(2, 1);
                const glass22 = stack.getGlass(2, 2);
                glass20.amountHeld.should.equal(glass20.maxCapacity);
                glass21.amountHeld.should.equal(glass21.maxCapacity);
                glass22.amountHeld.should.equal(glass22.maxCapacity);
            });

            it('overflow reaches fourth level', () => {
                const glass30 = stack.getGlass(3, 0);
                const glass31 = stack.getGlass(3, 1);
                const glass32 = stack.getGlass(3, 2);
                const glass33 = stack.getGlass(3, 3);

                glass30.amountHeld.should.equal(31.25);
                glass31.amountHeld.should.equal(218.75);
                glass32.amountHeld.should.equal(218.75);
                glass33.amountHeld.should.equal(31.25);

                //stack.displayAmounts();
            });
        });
    });

});