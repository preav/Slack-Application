const assert = require('chai').assert;
const app = require('../app');
import {getCurrentUserData1,saveUpdateUserProfile1} from '../client/src/components/onboarding/profile/profileService'


describe('Profile', function () {
    describe('getUserInfo', function () {
        it('getUserInfo should return userInfo', function () {
            getCurrentUserData1().then((output)=>{
                assert.typeOf(output.name, 'string');
            });
        });       
    });

    it('saveUpdateUserProfile',function(){
        const userData = {
            name: 'test user',
            email: 'test@test.com'           
           };
           saveUpdateUserProfile1(userData).then((output) =>{
               
           });
    });


});


