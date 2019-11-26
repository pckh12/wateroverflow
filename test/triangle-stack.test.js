const { should } = require('chai').should();
const Glass = require('../glass');

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
            stack.rows.should.equal(4);
        });
    });

    describe('#getGlass()', () => {
        let stack;

        beforeEach(() => {
            stack = new TriangleStack(3);
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
            should.not.exist(glass);
        });

        it('retrieves the correct glass', () => {
            let glass = stack.getGlass(0, 0);
            glass.row.should.be(0);
            glass.position.should.be(0);

            glass = stack.getGlass(1, 0);
            glass.row.should.be(1);
            glass.position.should.be(0);

            glass = stack.getGlass(2, 2);
            glass.row.should.be(2);
            glass.position.should.be(2);
        });
    });
});