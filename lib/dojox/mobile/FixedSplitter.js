define([
	"dojo/_base/window",
	"dojo/dom-geometry",
	"dojo/dom-class",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dijit/_WidgetBase",
	"dijit/_Container",
	"dijit/_Contained",
	"./FixedSplitterPane"
],
	function(win, domGeometry, domClass, declare, array, WidgetBase, Container, Contained, mobileFixedSplitterPane){
	// module:
	//		dojox/mobile/FixedSplitter
	// summary:
	//		A layout container that splits the window horizontally or vertically.
	// description:
	//		FixedSplitter is a very simple container widget that layouts its child
	//		dom nodes side by side either horizontally or vertically.
	//		An example usage of this widget would be to realize the split view on iPad.
	//		There is no visual splitter between the children, and there is no
	//		function to resize the child panes with drag-and-drop.
	//		If you need a visual splitter, you can specify a border of a child
	//		dom node with CSS.
	//		A child of the widget can be a plain <div> or mobileFixedSplitterPane.
	// example:
	// |	<div dojoType="dojox.mobile.FixedSplitter" orientation="H">
	// |		<div style="width:200px;border-right:1px solid black;">
	// |			pane #1 (width=200px)
	// |		</div>
	// |		<div>
	// |			pane #2
	// |		</div>
	// |	</div>

	/*=====
		WidgetBase = dijit._WidgetBase;
		Container = dijit._Container;
		Contained = dijit._Contained;
	=====*/
	return declare("dojox.mobile.FixedSplitter", [WidgetBase, Container, Contained], {
		orientation: "H", // "H" or "V"

		isContainer: true,

		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef ? this.srcNodeRef : win.doc.createElement("DIV");
			domClass.add(this.domNode, "mblFixedSpliter");
		},

		startup: function(){
			if(this._started){ return; }
			var children = array.filter(this.domNode.childNodes, function(node){ return node.nodeType == 1; });
			array.forEach(children, function(node){
				domClass.add(node, "mblFixedSplitterPane"+this.orientation);
			}, this);
			this.inherited(arguments);
	
			var _this = this;
			setTimeout(function(){
				var parent = _this.getParent && _this.getParent();
				if(!parent || !parent.resize){ // top level widget
					_this.resize();
				}
			}, 0);
		},
	
		resize: function(){
			this.layout();
		},

		layout: function(){
			var sz = this.orientation == "H" ? "w" : "h";
			var children = array.filter(this.domNode.childNodes, function(node){ return node.nodeType == 1; });
			var offset = 0;
			for(var i = 0; i < children.length; i++){
				domGeometry.marginBox(children[i], this.orientation == "H" ? {l:offset} : {t:offset});
				if(i < children.length - 1){
					offset += domGeometry.marginBox(children[i])[sz];
				}
			}
	
			var h;
			if(this.orientation == "V"){
				if(this.domNode.parentNode.tagName == "BODY"){
					if(array.filter(win.body().childNodes, function(node){ return node.nodeType == 1; }).length == 1){
						h = (win.global.innerHeight||win.doc.documentElement.clientHeight);
					}
				}
			}
			var l = (h || domGeometry.marginBox(this.domNode)[sz]) - offset;
			var props = {};
			props[sz] = l;
			domGeometry.marginBox(children[children.length - 1], props);
	
			array.forEach(this.getChildren(), function(child){
				if(child.resize){ child.resize(); }
			});
		}
	});
});
