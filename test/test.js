var should = require('should'),
    d = require('../').dojo;


describe('dojo', function(){
    it('should load in localscope', function(){
        should.not.exist(global.dojo);
        should.exist(d.declare);
    });
});
