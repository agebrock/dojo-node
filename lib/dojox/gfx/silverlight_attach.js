define(["dojo/_base/kernel", "./silverlight"], function(dojo){
	dojo.getObject("dojox.gfx.silverlight_attach", true);
	dojo.experimental("dojox.gfx.silverlight_attach");
	var g = dojox.gfx, sl = g.silverlight;
	
	sl.attachNode = function(node){
		// summary: creates a shape from a Node
		// node: Node: an Silverlight node
		return null;	// not implemented
	};

	sl.attachSurface = function(node){
		// summary: creates a surface from a Node
		// node: Node: an Silverlight node
		return null;	// dojox.gfx.Surface
	};
	
	return sl; // return augmented silverlight api
});
