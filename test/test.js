var should = require('should'),
    dojo = require('../').dojo;


describe('dojo', function(){
    it('should load in localscope', function(){
        should.not.exist(global.dojo);
        should.exist(dojo.declare);
    });

    it('it should keep promise', function(){
    	 var d = new dojo.Deferred();
		 d.then(new dojo.Deferred()); // - error: .then() does not accept a deferred
		d.resolve(true)
        // d.resolve(true).then(cb); // - we don't see the error until resolving d
    });
});
