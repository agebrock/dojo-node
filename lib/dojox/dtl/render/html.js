define(["dojo/_base/kernel","dojo/_base/lang","../render/dom","dojo/_base/html","dojo/_base/kernel"], function(dojo,lang,ddrd){
	dojo.getObject("dtl.render.html", true, dojox);

	dojox.dtl.render.html.Render = ddrd.Render;
	return dojox.dtl.render.html;
});