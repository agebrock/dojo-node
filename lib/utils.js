var winston = require("winston"),
    util = require("util");

//global functions - lazy ? Yes i'am ! 

log = new (winston.Logger)({
          transports: [
            new (winston.transports.Console)({ colorize: true}),
          ]
});

inspect = function(item, depth, hidden){
    console.log(util.inspect(item, hidden || false, depth || 3, true));
    console.log("---");
}
