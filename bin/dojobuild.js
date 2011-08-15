#!/usr/bin/env node
// vim:ft=javascript:

/*
 * 
 * Author: Christoph Hagenbrock
 * License: MIT
 * http://agebrock.com
 */

var spawn = require("child_process").spawn,
exec = require("child_process").exec;
path  = require("path");


var cb = function(){
    var args = Array.prototype.slice.call(arguments);
    var callback = null;
    
    if(args.length == 0){
        return function(error, result){
            if(error){
                console.log(error);
            }
            console.log(result);
        }};
        
}


var streamChild = function (params, callback) {
  console.log('Spawning: dojo-node ' + params.join(' '));
  
  var child = exec('node ' + params.join(" "));
  
  child.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });
  
  child.stderr.on('data', function (data) {
    process.stdout.write(data.toString());
  });
  
  child.on('exit', function () {
    callback();
  });
}
var p = process.cwd();
var args = process.argv.slice(2);


var filename = args.shift(0,1);



streamChild([__dirname + "/../lib/dojo/dojo.js" , " load=build " , "profile="+p+"/"+filename, "action=release" , args.join(" ") ], cb());



