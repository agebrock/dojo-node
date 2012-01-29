
/* get som dom */
var dom = require("dominode").fromString("<html><head></head><body><h1>BETTER</h1></body></html>");




/* get the conflicting "require"  */
var dojoAmdRequire  = require("dojo-node");



/* or do it the old way */
var ref = dojo.require("dojox.json.ref")



 dojoAmdRequire(["dojo/Stateful", "dojo/query"],function(Stateful, query){
 
    var obj = new Stateful();
	obj.watch("dojo", function(d){
		console.log(d, " is GOOD "," but still getting " , this.get("dojo"));
	});
	
    obj.set("dojo", query("h1")[0].innerHTML);
 
});






