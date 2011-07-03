var d = require("./index");
var repl = require("repl").start();
repl.context = d.dojo.mixin(repl.context, d);
