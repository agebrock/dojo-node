/**
    Overwrite Node.js define 
**/
define = function() {

    // only care about the last argument
    var cb = arguments[ arguments.length - 1 ];
    var deps = arguments[ arguments.length - 2 ];

    // set exports immediately:
    // define({ foo: "bar" })
    if (typeof cb !== 'function') {
      module.exports = cb;
      return;
    }
    
    if(Array.isArray(deps)){
        var modules = deps.map(function(module){
            return require(module);
        });
        var ret = cb.apply(module, modules);
    }else{
        var ret = cb(require, module.exports, module);
    }
    if (ret !== undefined) {
      // set exports with return statement
      // define(function () { return { foo: "bar" } })
      module.exports = ret;
    }
  }



