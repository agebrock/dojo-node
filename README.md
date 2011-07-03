# dojo-node
1.7rc2 up and running.. 

dojo-node is now running on top of dojo's new amd core. 

## REMOVED dono namespace
There has been a change in dojo-node from 1.6 to 1.7 
    require("dono.dom");
    
    //changed to 
    dojo.initDocument("<html>..>YOUR HTML CODE HERE<--</html>");
    
    /*
    have a look at the test/test.js file to see the change in use.
    Feel free to contact me if you have any problems upgrading.
    
    */
    
    
### Future
* I will have a closer look to the new features introduced in 1.7
* The focus of the project depends on the feature requests and the development 
  of dojo in general. This project may split in one - following the original implementation 
  for the browser. The other one may provide plattform specific modules.
  

    
### Compatibility
* node.js 0.4 may work with older releases (otherwise you should use prio 1.7 version)

## Installation
### NPM
* npm install dojo-node


### do it yourself
* $ npm install htmlparser
* $ git clone git@github.com:agebrock/dojo-node.git
* $ cd dojo-node
* node test/test.js




