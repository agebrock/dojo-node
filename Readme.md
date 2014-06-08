# dojo-node v.3

#Dojo-Node
Running dojo on the server as simple as it should be ...

##Changelog
Api Changes !
Dojo source now installed via vanilla npm dependency (dojo v1.9.3)
Dijit/ Dojox no longer included. 

##Features
... install dojo using npm
... use dojo in a local context. (keep the global context clean) 
... make it work without hacking in the original source. 


##Installation 
    npm install dojo-node
    
    
##HowTo
    var dojo = require('dojo-node').dojo; 
    
    var myClass = dojo.declare([], {
        //....
    });
    
    
##HowToHack
Since the "index.js" is our only file, this would be a good start to extend the project.
The project uses a modified dojo bootstrap file and a slightly changed nodeConfig.js to fireup the framework.
the index.js will export the context, i used to load dojo. the context includes a typical amd loader, like
"amd like require", "define" usw.... 

You should be able to reuse the functions to load third party modules or even dojox related stuff. 






##Bugs
I only use the project for smaller tests and evaluations, if you having trouble using the project for your need
give me a ping. 

Cheers 
