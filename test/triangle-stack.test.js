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
});