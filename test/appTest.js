const assert = require('chai').assert;
const app = require('../app');

describe('App', function () {
    describe('sayHello', function () {
        it('app should return hello', function () {
            let result = app.sayHello();
            assert.equal(result, 'hello');
        });

        it('sayHello should return type string', function () {
            let result = app.sayHello();
            assert.typeOf(result, 'string');
        });
    });

    describe('addNumbers', function () {
        it('addNumbers result should be more than 5', function () {
            let result = app.addNumbers(5, 6);
            assert.isAbove(result, 5);
        });

        it('addNumbers should return a result of type number', function () {
            let result = app.addNumbers(5, 6);
            assert.typeOf(result, 'number');
        });
    });

    // assert.typeOf(foo, 'string'); // without optional message
    // assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
    // assert.equal(foo, 'bar', 'foo equal `bar`');
    // assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
    // assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

    // Asserts non-strict equality (==) of actual and expected
    // assert.equal(3, '3', '== coerces values to strings');

    // Asserts non-strict inequality (!=) of actual and expected
    // assert.notEqual(3, 4, 'these numbers are not equal');

    // Asserts strict equality (===) of actual and expected
    // assert.strictEqual(true, true, 'these booleans are strictly equal');

    // Asserts strict inequality (!==) of actual and expected.
    // assert.notStrictEqual(3, '3', 'no coercion for strict equality');

    // Asserts that actual is deeply equal to expected
    // assert.deepEqual({ tea: 'green' }, { tea: 'green' });

});



