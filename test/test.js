require('../index');




//dojo without DOM 
dojo.require('dojox.json.ref');
console.dir(dojox.json.ref.toJson(dojo.mixin({'foo':'baa'},{'foo2':'baa2'})));


//dojo with DOM support 
dojo.initDocument('<html><head></head><body id="foo2"> <script type="text/javascript">document.write("<h1 class=\'foo\'>Enjoy dojo on Node.js !</h1>")</script>fancy </body></html>')
dojo.require("dijit/_Widget");


define("dono/Widget",["dijit/_Widget", "dijit/_TemplatedMixin"],function(){


       dojo.declare("dono.Widget",[dijit._Widget, dijit._TemplatedMixin],{
            templateString: '<h3>${headline}</h3>'
        });
});



dojo.addOnLoad(function(){
console.log("LOADED");
})

/**
take care dojox registers every widget don't mess with your memory 
clear the registry or reuse widgets ! 
**/

w = new dono.Widget({headline:"dojo running via Node.js"});
w.set("headline", "test");
console.log(w.headline);
console.log(w.domNode.outerHTML);
console.log("Fancy ? " + dojo.byId("foo2").innerHTML);


console.log(dojo.query(".foo")[0].innerHTML);
console.dir(dojo.version);
