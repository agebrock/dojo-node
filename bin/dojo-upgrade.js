var nexpect = require("nexpect"),
    path = require("path");

process.chdir = __dirname+"/../lib/dojo";
nexpect.spawn("git", ["pull"]).expect("hello")
         .run(function (err) {
           if (err) {
             console.log(err);
           }
         });

