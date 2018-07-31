const assert = require('chai').assert;
const index = require('../index');

describe('Index', function(){
    it('it should return hello1', function(){
        assert.equal(index(), 'hello1');
    })
})
