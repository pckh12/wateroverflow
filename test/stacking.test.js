const { should } = require('chai').should();
const Glass = require('../glass');

createGlass = (row, position) => {
    return new Glass({ row, position });
};

describe('Stacking glasses', () => {

    let topGlass, leftGlass, rightGlass;

    beforeEach(() => {
        topGlass = createGlass(0, 0);
        leftGlass = createGlass(1, 0);
        rightGlass = createGlass(1, 1);
    });

    it('can stack on top on two glasses', () => {
        topGlass.stackOnTop(leftGlass, rightGlass);

        topGlass.stackedLeft.should.equal(leftGlass);
        topGlass.stackedRight.should.equal(rightGlass);
    });

    it('must stack on both sides', () => {
        (() => {
            topGlass.stackOnTop(null, rightGlass);
        }).should.throw(Error);

        (() => {
            topGlass.stackOnTop(leftGlass, null);
        }).should.throw(Error);
    });

    it('can stack multiple levels', () => {
        const baseLeft = createGlass(2, 0);
        const baseMiddle = createGlass(2, 1);
        const baseRight = createGlass(2, 2);

        topGlass.stackOnTop(leftGlass, rightGlass);
        leftGlass.stackOnTop(baseLeft, baseMiddle);
        rightGlass.stackOnTop(baseMiddle, baseRight);

        // check the triangle
        topGlass.stackedLeft.stackedLeft.should.equal(baseLeft);
        topGlass.stackedLeft.stackedRight.should.equal(baseMiddle);
        topGlass.stackedRight.stackedLeft.should.equal(baseMiddle);
        topGlass.stackedRight.stackedRight.should.equal(baseRight);
    });
});