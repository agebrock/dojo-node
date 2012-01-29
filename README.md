# dojo-node

Thanks to ryan-blunden i can burry the branch in a working state :)
*FIXED broken package.json


 


## previews added

* I integrated some "may" futur components to the lib. (check the ./lib/ dir for details)

##Builder integrated

* dojodeploy
use dojobuild to build a release in your current directory

* dojobuild
use dojobuild packageConfig.js to roll your own

### Useage:

    require("dojo-node");
    //use initDocument to load DOM (HTML5 based)
    dojo.initDocument();


    // run a simple express instance (Expres required ;)
    var app = require("express").createServer();

    app.all("/*", function(req, res){
        inspect(req.headers);
        log.info("body:",req.body);
        inspect(req.query);
        log.info("params:", req.params);
        req.query.id = (new Date()).getTime();
        res.end(JSON.stringify(req.query));
    });

    app.listen(3000);


    // quick break to give the server time to come UP
    setTimeout(function(){
    
    // run your Develop your Client within the same environment ! 
    
        var ob = dojo.require("dojo.store.Observable");
        var JsonRest = dojo.require("dojo.store.JsonRest");

        var jsonRestStore = new JsonRest({target:"http://localhost:3000/test/"});

        var store = ob(jsonRestStore);
      
        var results = store.query({ prime: true });
        
        //personal helper function to speed up.
        inspect(results);
        
        var observer = results.observe(function(object, previousIndex, newIndex){
            if(previousIndex == -1){
                object.changedbeforWrite = true;
            }
        
            inspect({
                previousIndex:previousIndex, 
                newIndex:newIndex, 
                object:object
                });
        });

        store.put({somedata:"someValue"}).then(function(item){
            inspect(item);
        });

        store.get(1).then(function(item){
            inspect(item);
        });

    var context = require("repl").start().context.store = store;
    },1)




    
    
### Future
* I will have a closer look to the new features introduced in 1.7
* The focus of the project depends on the feature requests and the development 
  of dojo in general. This project may split in one - following the original implementation 
  for the browser. The other one may provide plattform specific modules.
  

    
### Compatibility
* node.js 0.4 may work with older releases may not

## Installation
### NPM
* npm install dojo-node


### do it yourself
* $ git clone git@github.com:agebrock/dojo-node.git
* $ npm install
* node test/test.js




