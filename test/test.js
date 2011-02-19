require('../index');


//dojo without DOM 
dojo.require('dojox.json.ref');
console.dir(dojox.json.ref.toJson(dojo.mixin({'foo':'baa'},{'foo2':'baa2'})));


//dojo with DOM support 
dojo.require("dono.dom");

dojo.doc.innerHTML = "<h1 class='foo'>Enjoy dojo on Node.js !</h1>";




define("dono/Widget",["dijit/_Widget", "dijit/_Templated"],function(){
       dojo.declare("dono.Widget",[dijit._Widget, dijit._Templated],{
            templateString: '<h3>${headline}</h3>'
        });
});


/**
take care dojox registers every widget don't mess with your memory 
clear the registry or reuse widgets ! 
**/

w = new dono.Widget({headline:"dojo running via Node.js"});
w.set("headline", "test");
console.log(w.headline);
console.log(w.domNode.outerHTML);


console.log(dojo.query(".foo")[0].innerHTML);
