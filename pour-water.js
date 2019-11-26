const TriangleStack = require("./triangle-stack");

const args = process.argv.slice(2);

(function (param) {

    if (param.length === 0) {
        console.log(`Usage: pour-water amount [stackHeight]\n`);
        console.log(`eg.\npour-water 1000\npour-water 1000 3\n\n`);

        return;
    }

    const amount = +param[0];
    const stackHeight = +(param[1] || 4);

    console.log('\n');
    console.log('************************************');
    console.log('****  Water Overflow Challenge  ****');
    console.log('************************************');
    console.log('\n');
    console.log(`Stack height: ${stackHeight}`);
    console.log(`Amount to pour: ${amount}\n\n`);

    const stack = new TriangleStack(stackHeight);

    stack.pour(amount);

    console.log('RESULTS');
    console.log('-------');
    console.log(`format: (row, position): amountHeld`);
    console.log('\n');

    stack.displayAmounts();

    console.log('\n\n');

})(args);



