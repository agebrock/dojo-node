require('../index');



dojo.initDocument('<html><head></head><script src="./foo.js"></script><body id="foo2"><script type="text/javascript">i = 10 ;document.write("<h1 class=\'foo\'>" + i +"Enjoy dojo on Node.js !</h1>")</script></body></html>')

$ = require("jquery");
console.dir($("script")[0].src)
dojo.require("dijit._Widget");
dojo.addOnLoad(function(){
console.log("LOADED");

console.dir(document.innerHTML);
})

