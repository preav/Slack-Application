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
});



