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
  
  var child = spawn('node', params);
  
  child.stdout.on('data', function (data) {
    console.log("out");
    process.stdout.write(data.toString());
  });
  
  child.stderr.on('data', function (data) {
    console.log("error");
    process.stdout.write(data.toString());
  });
  
  child.on('exit', function () {
    console.log('node ' + params.join(' ') + ' has exited.');
    callback();
  });
}
var p = process.cwd();
process.chdir(path.normalize(__dirname + "/../lib/dojo/"));
streamChild([p + "/" + process.argv.slice(2)], cb());



