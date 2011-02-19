var fs = require("fs");


if(!DOJO_BASE_PATH)console.log("SET DOJO_BASE_PATH");

var path = require("path").normalize(DOJO_BASE_PATH);

/**
little helper with a little hack inside
**/
var include = function(filename){
  process.binding('evals').Script.runInThisContext(
      //the replace fixes somes a restriction in node 3.2 can be ignored on lower versions.
      fs.readFileSync(filename, "UTF-8").replace('this.console = this.console || {};','')
  );
}

include(path + "dojo/_base/_loader/bootstrap.js");
dojo.baseUrl = path + "dojo/";
include(path + "dojo/_base/_loader/loader.js");

dojo._getText = function(path){ return fs.readFileSync(path, "UTF-8")}

/**
content handler are defined in dojo xhr
we just define the namespace to use rpc stuff at dojox if required
**/
dojo._contentHandlers = dojo.contentHandlers = {};

/**
to make dojo._base.browser work
**/
dojo.addOnWindowUnload = function(){}

define("bx/define",[
"dojo/_base/lang",
"dojo/_base/array",
"dojo/_base/declare",
"dojo/_base/connect",
"dojo/_base/Deferred",
"dojo/_base/json",
"dojo/_base/Color",
"dojo/_base/lang"], function(){
    dojo.registerModulePath('dono', __dirname);
    dojo.r = require;
	return dojo;
}); 

